// Import required modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Create an Express application
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Create an HTTP server to handling http requests
const server = http.createServer(app);

// Initialize Socket.you're essentially telling Socket.IO to use the existing HTTP server (server) to also handle WebSocket connections. This means that both regular HTTP requests and WebSocket connections can be handled by the same server,
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allowed origin for CORS
        methods: ["GET", "POST"] // Allowed HTTP methods
    }
});
//"socket" parameter is an object that represents the connection to an individual client
io.on("connection", (socket) => {
    // Event listener for new socket connections
    console.log("New user connected:", socket.id);

    // Event listener for socket disconnection
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
    });

    // Event listener for joining a room
    socket.on("join_room", (room) => {
        socket.join(room); // Allows the socket to join a specific room
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    // Event listener for sending a message
    socket.on("send_message", (messageData) => {
        // Sends the received message data to all sockets in the specified room except the sender
        socket.to(messageData.room).emit("receive-message", messageData);
    });
});

// Listen for connections on port 5000: start the HTTP server using server.listen(), it begins listening for regular HTTP requests. Since Socket.IO is initialized with the same HTTP server instance (server), it automatically starts listening for WebSocket connections on the same server. 
server.listen(5000, () => {
    console.log("Server listening on port 5000");
});
