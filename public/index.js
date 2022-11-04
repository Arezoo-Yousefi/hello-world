let userName;
let myName;
let myMessage;
const submitName = function() {
    const user = document.getElementById("userName").value;
    userName = user;
    const attribute = document.getElementById("hidden1");
    attribute.hidden = true;
    const changeAttribute = document.getElementById("hidden2");
    changeAttribute.hidden = false;
    
}
const Reload = function() {
const lists = fetch('/getMessages')
.then(function(response) {
    return response.json();
})
.then(
    function(data) { 
        const pArray = data.messages.map((value)=>{
                return`<span id="myName" style="color: rgb(69, 134, 69);">${value.name}: </span><span id="myMessage" style="font-weight: bold ;">${value.message}</span>`
            })
        
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
    body: JSON.stringify({"name": userName,"message": message})
    });
    document.getElementById("message").value = "";
}

setInterval(Reload, 100);
