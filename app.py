from flask import Flask, request, render_template, redirect, url_for, jsonify
import requests
from werkzeug.utils import secure_filename
import mysql.connector
import os
import bcrypt
import logging
import cloudinary.uploader
import cloudinary

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'uploads')
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

logging.basicConfig(level=logging.INFO)

db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')

cloudinary.config(
    cloud_name = os.getenv('CLOUD_NAME'),
    api_key = os.getenv('API_KEY'),
    api_secret = os.getenv('API_SECRET')
)

if not all([db_host, db_port, db_name, db_user, db_password]):
    raise ValueError("Not all database environment variables are set!")

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=db_host,
            port=db_port,
            database=db_name,
            user=db_user,
            password=db_password
        )
        return connection
    except mysql.connector.Error as err:
        logging.error(f"Failed to connect to database: {err}")
        return None

def verify_user(username, password):
    try:
        connection = get_db_connection()
        if connection is None:
            return False

        with connection.cursor() as cursor:
            cursor.execute("SELECT password FROM users WHERE name = %s", (username,))
            user = cursor.fetchone()

            if user:
                stored_password_hash = user[0]
                if stored_password_hash.startswith(("$2b$", "$2a$")):
                    if bcrypt.checkpw(password.encode('utf-8'), stored_password_hash.encode('utf-8')):
                        return True
                else:
                    logging.warning(f"Username: {username} has an incorrect hash format.")
            else:
                logging.warning(f"Username: {username} not found!.")
    except mysql.connector.Error as err:
        logging.error(f"Error dbo: {err}")
    finally:
        if connection:
            connection.close()

    return False

def register_user(username, password):
    connection = get_db_connection()
    if connection is None:
        return False, "Database connection failed."

    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT id FROM users WHERE name = %s", (username,))
            user = cursor.fetchone()

            if user:
                return False, "Username already exists."


            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

            cursor.execute(
                "INSERT INTO users (name, password) VALUES (%s, %s)",
                (username, hashed_password.decode('utf-8'))
            )
            connection.commit()
            logging.info(f"User {username} successfully registered.")
            return True, "User registered successfully."

    except mysql.connector.Error as err:
        logging.error(f"Error during user registration: {err}")
        return False, "Database error occurred."

    finally:
        if connection:
            connection.close()


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        confirm_password = request.form["confirm_password"]

        if password != confirm_password:
            return render_template("register.html", message="Passwords do not match.")

        success, message = register_user(username, password)
        return render_template("register.html", message=message)

    return render_template("register.html")


@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        if verify_user(username, password):
            return redirect(url_for("menu"))
        else:
            return render_template("index.html", message="Invalid username or password.")

    return render_template("index.html")


@app.route("/menu", methods=['GET', 'POST'])
def menu():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM products ORDER BY category")
    products = cursor.fetchall()


    cursor.execute("select * from filters_theme")
    filters_theme = cursor.fetchall()

    cursor.execute("select * from filters JOIN filters_theme ON filters_theme_id = filters_theme.id")
    filters_name = cursor.fetchall()

    cursor.close()
    connection.close()

    return render_template('menu.html', products=products, filters_theme=filters_theme, filters_name=filters_name)

@app.route("/search")
def search():
    query = request.args.get("query", "").strip().lower()
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM products WHERE LOWER(name) LIKE ?", (f"%{query}%",))
    products = cursor.fetchall()
    
    conn.close()
    
    return jsonify([dict(product) for product in products])

# @app.route('/add-product', methods=['GET', 'POST'])
# def add_product():
#     if request.method == 'POST':
#         name = request.form['name']
#         description = request.form['description']
#         price = request.form['price']
#         image = request.files['image']
#
#         if image:
#             response = cloudinary.uploader.upload(image)
#             imgur_link = response['secure_url']
#
#             connection = get_db_connection()
#             cursor = connection.cursor()
#             cursor.execute(
#                 "INSERT INTO products (name, description, image_url, price) VALUES (%s, %s, %s, %s)",
#                 (name, description, imgur_link, price),
#             )
#             connection.commit()
#             cursor.close()
#             connection.close()
#
#         return redirect(url_for('menu'))
#     return render_template('add-product.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
