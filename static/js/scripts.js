const d = new Date();
vers = 'version 0.3.9';
console.log(vers);
let totalAmount = 0;
document.getElementById("VERSION").textContent=vers;

const slides = document.querySelector('.slides');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const totalSlides = document.querySelectorAll('.slide').length;
let currentIndex = 0;

function updateButtons() {
    // Buttons are always enabled in a looped slider
}

function showSlide(index) {
    const slideWidth = document.querySelector('.slider-container').clientWidth;
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;
}

prevButton.addEventListener('click', () => {
    if (currentIndex === 0) {
        showSlide(totalSlides - 1);
    } else {
        showSlide(currentIndex - 1);
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex === totalSlides - 1) {
        showSlide(0);
    } else {
        showSlide(currentIndex + 1);
    }
});

updateButtons();

function toggleCart(event) {
  event.preventDefault();
  const cart = document.getElementById('cart');
  cart.classList.toggle('open');
}

function closeCart() {
  const cart = document.getElementById('cart');
  const overlay = document.getElementById('cart-overlay');
  cart.classList.remove('open');
  overlay.classList.remove('open');
}

function addToCart(event, productName, productPrice) {
  event.stopPropagation();

  const cartItems = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartTotal = document.getElementById('cart-total');

  const listItem = document.createElement('li');
  listItem.textContent = `${productName} - $${productPrice}`;
  cartItems.appendChild(listItem);

  totalAmount += productPrice;
  cartTotal.textContent = totalAmount.toFixed(2);

  cartEmpty.style.display = 'none';
  document.getElementById('total-amount-input').value = totalAmount.toFixed(2);
}

function toggle_popup(popup, closedby){
    document.getElementById(popup).classList.toggle("active");
    console.log(popup, " closed by: ", closedby);
}

function copy_on_clipboard(a){
    var CopyText = document.getElementById(a)
    navigator.clipboard.writeText(CopyText.textContent);
}

var ele = reg_form;
if(ele.addEventListener){
    console.log("js dolbeb");
    ele.addEventListener("submit", callback, false);
}

function goToRegister(event) {
                event.preventDefault();
                window.location.href = "/register";
            }

function goToLogin(event) {
                event.preventDefault();
                window.location.href = "/";
            }

function scrollToCategory(categoryId) {
        const element = document.getElementById(categoryId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }



function searchProducts() {
    document.getElementById("product_container").remove()

    let product_container = document.createElement("div");
    product_container.className = "products_menu";
    product_container.setAttribute("id", "product_container");
    document.getElementById("main_menu").appendChild(product_container);

    let query = document.getElementById("searchQuery").value;

    fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            let resultsList = document.getElementById("results");
            let product_container = document.getElementById("product_container");

            resultsList.innerHTML = "";
            
            data.forEach(function(product) {
                //let li = document.createElement("li");
                //li.textContent = product.name + " - " + product.price + " грн";

                let product_button = document.createElement("button");
                product_button.setAttribute("id", "product_{{ product.name }}");
                product_button.className = "test_product";
                product_button.onclick="toggle_popup('popup_{{product.name}}'), 'EL PROBLEMO'";
                product_container.appendChild(product_button);

                let product_img = document.createElement("img");
                product_img.src = product.image_url;
                product_img.setAttribute("style", "width:100%;height:65%;");
                product_button.appendChild(product_img)

                let product_name = document.createElement("h2");
                product_name.textContent = product.name;
                product_button.appendChild(product_name)

                let product_desc = document.createElement("p");
                product_desc.textContent = product.description;
                product_button.appendChild(product_desc)

                let product_price = document.createElement("p");
                product_price.textContent = product.price + 'грн';
                product_button.appendChild(product_price);

                // Popup

                let popup_main = document.createElement("div");
                product_button.setAttribute("id", "popup_{{ product.name }}");
                product_button.className = "popup";
                product_container.appendChild(popup_main);


                let popup_overlay = document.createElement("div");
                popup_overlay.setAttribute("id", "popup_{{ product.name }}");
                popup_overlay.className = "overlay";
                popup_overlay.onclick="toggle_popup('popup_{{product.name}}', 'overlay')";
                product_container.appendChild(popup_overlay);

                let popup_content = document.createElement("div");
                popup_content.setAttribute("id", "popup_{{ product.name }}");
                popup_content.className = "overlay";
                popup_content.onclick="toggle_popup('popup_{{product.name}}', 'overlay')";
                product_container.appendChild(popup_content);
                
                let close_btn = document.createElement("div");
                popup_content.setAttribute("id", "popup_{{ product.name }}");
                popup_content.className = "overlay";
                popup_content.onclick="toggle_popup('popup_{{product.name}}', 'overlay')";
                popup_content.appendChild(close_btn);

            });
        })
        .catch(function(error) {
            console.error("Помилка:", error);
        });
}

/*
<div class="popup" id="popup_{{ product.name }}">
    <div class="overlay" onclick="toggle_popup('popup_{{ product.name }}', 'overlay')"></div>
    <div class="content">
     <div class="close_btn" onclick="toggle_popup('popup_{{ product.name }}', 'close_btn')">&times;</div>
     <img src="{{ product.image_url }}" alt="{{ product.name }}" style="max-width: 300px;max-height: 300px;min-width: 200px; margin-top: 30px;">
     <p>{{ product.name }}</p>
        <p>Price: ₴{{ product.price }}</p>
        <button class="add-to-cart-btn" onclick="addToCart(event, '{{ product.name }}', {{ product.price }})">Додати в кошик</button>
    </div>

</div>
*/


/*<button id="product.name" class="test_product" onclick="toggle_popup('popup_{{product.name}}'), 'EL PROBLEMO'">
<img src="{{ product.image_url }}" alt="{{ product.name }}" style="width:100%;height:65%;">
<h2>{{ product.name }}</h2>
<p>{{ product.description }}</p>
<p>Price: ${{ product.price }}</p>
</button> */


/*const search = document.getElementById("search_bar");

const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    //window.location.href = 'https://www.example.com/results.aspx?q=${encodeURIComponent(search.value)}';
    var element = document.getElementById("product_container");
    var numberOfChildren = element.children.length
    const search_value = document.getElementById("search_bar").value;
    for (let i = 0; i < numberOfChildren; i++){
        console.log(i);
        document.gete = "none";
        if (element.children.item(i).id != search_value) {
            console.log(element.children.item(i));
        }; 
    };
   
};*/





/*$("#popup_reg").submit(function(event) {
    event.preventDefault();

    var formData = {
        username: $("#reg_username").val(),
        password: $("#reg_password").val(),
        confirm_password: $("#reg_confirm_password").val()
    };

    console.log("js dolbeb");

    $.ajax({
        type: "POST",
        url: "/",
        contentType: "application/json", // Встановлюємо заголовок
        data: JSON.stringify(formData), // Перетворюємо дані у формат JSON
        success: function(response) {
            alert(response.message);
        },
        error: function(xhr) {
            alert("Error: " + xhr.responseText);
        }
    });
});

$("#popup_login").submit(function(event) {
    event.preventDefault();

    var formData = {
        username: $("#login_username").val(),
        password: $("#login_password").val()
    };

    $.ajax({
        type: "POST",
        url: "/login",
        contentType: "application/json", // Встановлюємо заголовок
        data: JSON.stringify(formData), // Перетворюємо дані у формат JSON
        success: function(response) {
            alert(response.message);
        },
        error: function(xhr) {
            alert("Error: " + xhr.responseText);
        }
    });
});*/


//function openPopup() {
//    $("#popup").show();
//}

//function closePopup() {
//    $("#popup").hide();
//}


