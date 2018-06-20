// 'io' variable is being called from the script tag in index.html rather than being called from back end
var socket = io.connect('http://localhost:8000');


// query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

// emit events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

// listen for events
socket.on('chat', (data) => {
    output.innerHTML += `<p><strong>${data.handle}</strong>: ${data.message}</p>`
});