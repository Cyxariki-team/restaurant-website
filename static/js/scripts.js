const d = new Date();
vers = 'version 0.1.5';
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

}   

const search = document.getElementById("search_bar");

const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    window.location.href = 'https://www.example.com/results.aspx?q=${encodeURIComponent(search.value)}';
};

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


