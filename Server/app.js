const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.io configuration
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  }
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("joinChat", (roomId) => {
    socket.join(roomId);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stopTyping", (room) => socket.in(room).emit("stopTyping"));

  socket.on("newMessage", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("messageRecieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
