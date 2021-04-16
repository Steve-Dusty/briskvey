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
    });
    scrollDown();
    // Send message
    document.querySelector("#send_message").onclick = () => {
        socket.send({'msg':document.querySelector('#user_message').value, 
        'username': username});

        document.querySelector('#user_message').value = '';
    };

    // To scroll down the chat window 
    function scrollDown(){
        const window = document.querySelector("#display-message-section");
        window.scrollTop = window.scrollHeight;
        
    }

});