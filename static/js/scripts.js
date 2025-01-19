function toggle_login_popup(){
    window.open('https://restaurant-website-f8vs.onrender.com/login', '_blank')
    document.getElementById("popup_login").classList.toggle("active");
}

function toggle_registration_popup(){
    window.open('https://restaurant-website-f8vs.onrender.com/register', '_blank')
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
