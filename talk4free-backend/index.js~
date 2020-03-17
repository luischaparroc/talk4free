const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const checkAuth = require("./api/middleware/check-auth");

/* calling routes */
const routeRooms = require("./api/rooms/rooms").route;
const routeUsers = require("./api/users/users").route;
const routeReports = require("./api/reports/reports").route;

/* configuration */
app.use(express.json());
app.use(cors());

/* endpoints prefix */
app.use("/api/rooms", checkAuth, routeRooms);
app.use("/api/users", checkAuth, routeUsers);
app.use("/api/reports", checkAuth, routeReports);

/* socket.io*/

const server = http.createServer(app);

const getApiAndEmit = "TODO";

let io = socketIo.listen(server);

io.on("connection", client => {
  // escuchar mensaje
  client.on("closeUserSignal", resp => {
    if (resp) {
      client.broadcast.emit("closeUserresp", true);
    }
  });

  client.on("closeRoom", resp => {
    if (resp) {
      client.broadcast.emit("closeRoomResp", true);
    }
  });

  client.on("createRoom", resp => {
    if (resp) {
      client.broadcast.emit("renderRoom", true);
    }
  });

  client.on("closeVideo", resp => {
    console.log(resp);
    if (resp) {
      client.broadcast.emit("closeRoomResp", true);
      client.broadcast.emit("closeUserresp", true);
      client.broadcast.emit("closeRoomResp", true);
    }
  });
});

//checkAuth,
server.listen(5000, () => {
  console.log("Listening on 5000");
});
