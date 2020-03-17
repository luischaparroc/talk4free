const route = require("express").Router();
const createUser = require("./users.create").createUser;
const Users = require("./users.read");
const Update = require("./user.update");

route.get("/", Users.AllUsers);
route.get("/:id", Users.OneUsers);

route.post("/", createUser);

route.put("/join/:room/:user", Update.UserInRooms);
route.put("/out/:room/:user", Update.UserOutRooms);

module.exports = {
  route
};
