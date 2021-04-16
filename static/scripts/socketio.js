document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);



    socket.on('message', data => {
        const p = document.createElement('p');
        const span_username = document.createElement('span');
        const span_timestamp = document.createElement('span');
        const br = document.createElement('br');
        span_username.innerHTML = data.username;
        span_timestamp.innerHTML = data.time_stamp;
        p.innerHTML = span_username.outerHTML + br.outerHTML +  data.msg 
        + br.outerHTML + span_timestamp.outerHTML;  
        document.querySelector('#display-message-section').append(p);
        scrollDownChatWindow();

    });
    // Send message
    document.querySelector("#user_message").addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
            event.preventDefault();
            socket.send({'msg':document.querySelector('#user_message').value, 
            'username': username});
    
            document.querySelector('#user_message').value = '';
        }
    })

    function scrollDownChatWindow() {
        const chatWindow = document.querySelector("#display-message-section");
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }



});