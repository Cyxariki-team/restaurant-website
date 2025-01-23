const d = new Date();
vers = 'version 0.2.0';
console.log(vers);
document.getElementById("VERSION").textContent=vers;

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

            
function test() {
    const search_value = document.getElementById('search_bar').value
    window.location.href = "search.html";



   console.log(search_value);

};

function searchProducts() {
    let query = document.getElementById("searchQuery").value;

    fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            let resultsList = document.getElementById("results");
            resultsList.innerHTML = "";
            
            data.forEach(function(product) {
                let li = document.createElement("li");
                li.textContent = product.name + " - " + product.price + " грн";

                let product_button = document.createElement("button");
                product.id = product.name;
                product_button.className = "test_product";
                product_button.onclick="toggle_popup('popup_{{product.name}}'), 'EL PROBLEMO'";

                document.getElementById("product_container").appendChild(product_button);




                resultsList.appendChild(li);
            });
        })
        .catch(function(error) {
            console.error("Помилка:", error);
        });
}


<button id="product.name" class="test_product" onclick="toggle_popup('popup_{{product.name}}'), 'EL PROBLEMO'">
<img src="{{ product.image_url }}" alt="{{ product.name }}" style="width:100%;height:65%;">
<h2>{{ product.name }}</h2>
<p>{{ product.description }}</p>
<p>Price: ${{ product.price }}</p>
</button> 


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


