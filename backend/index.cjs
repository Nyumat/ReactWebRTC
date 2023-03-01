const express = require("express");
const socket = require("socket.io");

const PORT = 8080;
const app = express();

app.get("/user", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

const io = socket(server, {
  cors: { origin: "*" },
});

io.on("connection", function (socket) {
  socket.on("sdp", (data) => {
    socket.broadcast.emit("sdp", data);
  });

  socket.on("candidate", (data) => {
    socket.broadcast.emit("candidate", data);
  });
});
