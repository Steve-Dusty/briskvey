document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);



    socket.on('message', data => {

        // Displlay current message  
        if (data.msg){
        const p = document.createElement('p');
        const span_username = document.createElement('span');
        const span_timestamp = document.createElement('span');
        const br = document.createElement('br');
        // Set attributes for my CSS    
        if (data.username == username) {
            p.setAttribute("class", "my-msg");
            span_username.setAttribute("class", "my-username");
            span_username.innerHTML = data.username;
            span_timestamp.setAttribute("class", "timestamp"); 
            span_timestamp.innerHTML = data.time_stamp;
            p.innerHTML = span_username.outerHTML + br.outerHTML +  data.msg 
            + br.outerHTML + span_timestamp.outerHTML;  
            document.querySelector('#display-message-section').append(p);
        }
        // Other's messages
        else if (typeof data.username !== 'undefined'){
            p.setAttribute("class", "others-msg");   
            span_username.setAttribute("class", "other-username");
            span_username.innerText = data.username;

            // Timestamp
            span_timestamp.setAttribute("class", "timestamp");
            span_timestamp.innerText = data.time_stamp;

            // HTML to append
            p.innerHTML += span_username.outerHTML + br.outerHTML + data.msg + br.outerHTML + span_timestamp.outerHTML;

            //Append
            document.querySelector('#display-message-section').append(p);
        }
    }
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