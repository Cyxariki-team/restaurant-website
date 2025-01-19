function toggle_login_popup(){
    window.location.href = 'https://restaurant-website-f8vs.onrender.com/login';
    document.getElementById("popup_login").classList.toggle("active");
}

function toggle_registration_popup(){
    window.location.href = 'https://restaurant-website-f8vs.onrender.com/register';
    document.getElementById("popup_reg").classList.toggle("active");
}

function toggle_aboutus_popup(){
    document.getElementById("popup_about").classList.toggle("active");
}

function toggle_popup(popup){
    document.getElementById(popup).classList.toggle("active");
}

function copy_on_clipboard(a){
    var CopyText = document.getElementById(a)
    navigator.clipboard.writeText(CopyText.textContent);
}

$("#popup_reg").submit(function(event) {
        event.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: "POST",
            url: "/register",
            data: formData,
            success: function(response) {
                if (response.message === "Registration successful.") {
                    $("#popup").show();
                } else {
                    alert(response.message);
                }
            }
        });
    });

$("#popup_login").submit(function(event) {
        event.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: "POST",
            url: "/login",
            data: formData,
            success: function(response) {
                if (response.message === "Login successful.") {
                    $("#popup").show();
                } else {
                    alert(response.message);
                }
            }
        });
    });

function openPopup() {
    $("#popup").show();
}

function closePopup() {
    $("#popup").hide();
}