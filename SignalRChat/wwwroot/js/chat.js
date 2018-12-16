"use strict";

var connection = new signalR.HubConnectionBuilder()
                    .withUrl("/chatHub")
                    .withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
                    .build();

connection.on("ReceiveMessage", function (message) {
    var msg = message.message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var time = message.sendTime;
    var encodedMsg = message.sender + " says " + msg + " at " + time;
   
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", { sender: user, message: message, sendTime: new Date() }).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


var streamConnection = new signalR.HubConnectionBuilder()
                    .withUrl("/streamHub")
                    .withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
                    .build();

streamConnection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("countdownButton").addEventListener("click", function (event) {
    var from = document.getElementById("countdownInput").value;
    streamConnection.stream("Counter", Number(from), 500)
        .subscribe({
            next: (item) => {
                var li = document.createElement("li");
                li.textContent = item;
                document.getElementById("messagesList").appendChild(li);
            },
            complete: () => {
                var li = document.createElement("li");
                li.textContent = "Stream completed";
                document.getElementById("messagesList").appendChild(li);
            },
            error: (err) => {
                var li = document.createElement("li");
                li.textContent = err;
                document.getElementById("messagesList").appendChild(li);
            }
        });
    event.preventDefault();
});