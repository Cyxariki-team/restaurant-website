const d = new Date();
vers = 'version 0.4.1';
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
                // === КНОПКА ТОВАРУ ===
                const productButton = document.createElement("button");
                productButton.id = `product_${product.name}`;
                productButton.className = "test_product";
                productButton.onclick = () => toggle_popup(`popup_${product.name}`);

                // Зображення товару
                const productImg = document.createElement("img");
                productImg.src = product.image_url;
                productImg.style.cssText = "width:100%; height:65%;";

                // Назва товару
                const productName = document.createElement("h2");
                productName.textContent = product.name;

                // Опис товару
                const productDesc = document.createElement("p");
                productDesc.textContent = product.description;

                // Ціна товару
                const productPrice = document.createElement("p");
                productPrice.textContent = `₴${product.price}`;

                // Додаємо всі елементи до кнопки
                productButton.append(productImg, productName, productDesc, productPrice);
                product_container.appendChild(productButton);

                // === POPUP ===
                const popup = document.createElement("div");
                popup.className = "popup";
                popup.id = `popup_${product.name}`;

                // Напівпрозорий фон (overlay)
                const overlay = document.createElement("div");
                overlay.className = "overlay";
                overlay.onclick = () => toggle_popup(`popup_${product.name}`);

                // Вміст попапу
                const content = document.createElement("div");
                content.className = "content";

                // Кнопка закриття
                const closeBtn = document.createElement("div");
                closeBtn.className = "close_btn";
                closeBtn.innerHTML = "&times;";
                closeBtn.onclick = () => toggle_popup(`popup_${product.name}`);

                // Зображення товару
                const popupImg = document.createElement("img");
                popupImg.src = product.image_url;
                popupImg.alt = product.name;
                popupImg.style.cssText = "max-width: 300px; max-height: 300px; min-width: 200px; margin-top: 30px;";

                // Назва товару
                const popupName = document.createElement("p");
                popupName.textContent = product.name;

                // Ціна товару
                const popupPrice = document.createElement("p");
                popupPrice.textContent = `Price: ₴${product.price}`;

                // Кнопка "Додати в кошик"
                const addToCartBtn = document.createElement("button");
                addToCartBtn.className = "add-to-cart-btn";
                addToCartBtn.textContent = "Додати в кошик";
                addToCartBtn.onclick = (event) => addToCart(event, product.name, product.price);

                // Додаємо всі елементи у відповідні контейнери
                content.append(closeBtn, popupImg, popupName, popupPrice, addToCartBtn);
                popup.append(overlay, content);

                // Додаємо popup у body
                product_container.append(popup);
            });
        })
        .catch(function(error) {
            console.error("Помилка:", error);
        });
}


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


