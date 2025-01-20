     //window.location.href = 'https://restaurant-website-f8vs.onrender.com/login';

    //window.location.href = 'https://restaurant-website-f8vs.onrender.com/register';

const d = new Date();
console.log('version 0.1.3');
vers = 'version 0.1.3';
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

$("#popup_reg").submit(function(event) {
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
});


//function openPopup() {
//    $("#popup").show();
//}

//function closePopup() {
//    $("#popup").hide();
//}


