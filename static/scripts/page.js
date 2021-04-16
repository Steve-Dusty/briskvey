let msg = document.getElementById("user_message");
msg.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("send_message").click();
    }
});