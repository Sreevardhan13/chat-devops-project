const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 🔥 IMPORTANT: Parse JSON body
app.use(express.json());

// Serve frontend
const publicPath = path.join(__dirname, "public");
console.log("Serving static files from:", publicPath);

app.use(express.static(publicPath));

app.get("/login.css", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.css"));
});

// Temporary user store
const users = [];

// ================= AUTH ROUTES =================

// Register
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).send("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, password: hashed });

    res.send("User registered");
});

// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ username }, "secretkey");
    res.json({ token });
});

// ================= SOCKET AUTH =================

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    try {
        const user = jwt.verify(token, "secretkey");
        socket.user = user;
        next();
    } catch {
        next(new Error("Unauthorized"));
    }
});

// ================= SOCKET LOGIC =================

io.on("connection", (socket) => {
    console.log("User connected:", socket.user.username);

    socket.on("chat message", (msg) => {
        io.emit("chat message", {
            user: socket.user.username,
            message: msg
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// ================= SERVER =================

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});