const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./routes/index");

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/elochat", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("Échec de connexion à la base de données"));
db.once("open", () => console.log("Connexion à la base de données établie"));

const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressLayouts);
app.use(router);

app.set("view engine", "ejs");

const connections = [];
const connectedUsers = [];

io.on("connection", (socket) => {
  socket.on("userConnected", ({ user, genre }) => {
    if (genre === "male") {
      socket.broadcast.emit("userConnected", `${user} s'est connecté`);
    } else {
      socket.broadcast.emit("userConnected", `${user} s'est connectée`);
    }

    connections.push(socket);
    connectedUsers.push(user);

    io.emit("usersConnected", connections.length);
    io.emit("connectedUsers", connectedUsers);

    socket.on("disconnect", () => {
      if (genre === "male") {
        socket.broadcast.emit("userDisconnected", `${user} s'est déconnecté`);
      } else {
        socket.broadcast.emit("userDisconnected", `${user} s'est déconnectée`);
      }

      connections.splice(connections.indexOf(socket), 1);
      connectedUsers.splice(connectedUsers.indexOf(user), 1);

      io.emit("usersConnected", connections.length);
      io.emit("connectedUsers", connectedUsers);
    });
  });

  socket.on("typing", ({ user, inputVal }) => {
    socket.broadcast.emit("typing", {
      message: `${user} écrit`,
      inputVal,
    });
  });

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", {
      user: msg.user,
      body: msg.body,
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
