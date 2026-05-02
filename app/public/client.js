const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/";
}

const socket = io({
    auth: { token }
});

const messages = document.getElementById("messages");

socket.on("chat message", (data) => {
    const li = document.createElement("li");
    li.textContent = data.user + ": " + data.message;
    messages.appendChild(li);
});

function sendMessage() {
    const input = document.getElementById("messageInput");
    socket.emit("chat message", input.value);
    input.value = "";
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
}
