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
io.on("connection",(socket)=>{
    console.log("new user connected :",socket.id);
    socket.on("disconnect",()=>{
        console.log(`user ${socket.id} is disconnected `)
    })
})
// Listen for connections on port 5000: start the HTTP server using server.listen(), it begins listening for regular HTTP requests. Since Socket.IO is initialized with the same HTTP server instance (server), it automatically starts listening for WebSocket connections on the same server. 
server.listen(5000, () => {
    console.log("Server listening on port 5000");
});
