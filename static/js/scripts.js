     //window.location.href = 'https://restaurant-website-f8vs.onrender.com/login';

    //window.location.href = 'https://restaurant-website-f8vs.onrender.com/register';

const d = new Date();
let a = ('version 0.1.2 ', d.getTime()/10000);
document.getElementById("VERSION").textContent=a;

function toggle_popup(popup, closedby){
    document.getElementById(popup).classList.toggle("active");
    console.log(popup, " closed by: ", closedby);
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

//function openPopup() {
//    $("#popup").show();
//}

//function closePopup() {
//    $("#popup").hide();
//}


const d = new Date();
let a = `version 0.1.2, ${Math.floor(d.getTime() / 10000)}`;
document.getElementById("VERSION").textContent = a;

function toggle_popup(popup, closedBy) {
    const popupElement = document.getElementById(popup);
    popupElement.classList.toggle("active");
    console.log(`${popup} closed by: ${closedBy}`);
}

function copy_on_clipboard(elementId) {
    const copyText = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(copyText)
        .then(() => console.log("Copied to clipboard:", copyText))
        .catch(err => console.error("Failed to copy text:", err));
}

document.getElementById("popup_reg").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.message === "Registration successful.") {
            document.getElementById("popup").style.display = "block";
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error during registration:", error);
    }
});

// Обробка форми авторизації
document.getElementById("popup_login").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.message === "Login successful.") {
            document.getElementById("popup").style.display = "block";
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
});
