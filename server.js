const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Welcome New User !" + socket.id);
  socket.on("send_message", (msg) => {
    socket.emit("receive_message", msg);
    console.log("message: " + msg);
  });
  // socket.on("disconnect", () => {
  //   console.log("GoodBye our beloved user !" + socket.id);
  // });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
