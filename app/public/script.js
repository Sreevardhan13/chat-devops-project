const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const usernameInput = document.getElementById("username");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = usernameInput.value || "Anonymous";
    const message = input.value;

    if (message) {
        socket.emit("chat message", `${username}: ${message}`);
        input.value = "";
    }
});

socket.on("chat message", function(msg) {
    const item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});