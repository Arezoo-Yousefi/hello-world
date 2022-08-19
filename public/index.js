const Reload = function() {
const lists = fetch('/getMessages')
.then(function(response) {
    return response.json();
})
.then(
    function(data) { 
        const pArray = data.messages;
        const p = document.getElementById("messages");;
        p.innerHTML = pArray.join('<BR/>');
    });
}

const sendMessage = function () {
    const message = document.getElementById("message").value;
    fetch('/postMessage', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"message": message})
    });
}

setInterval(Reload, 100);
