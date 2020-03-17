const Roomcreate = require("./rooms.create");
const Update = require("./rooms.update");
const Reading = require("./rooms.read");
const Adm = require("../admin/admin");

const route = require("express").Router();

route.get("/", Reading.ReadAllRooms);
route.get("/:id", Reading.ReadOneRoom);

route.post("/", Roomcreate.Roomcreate);

route.put("/deactive/:id", Update.DeactiveRoom);
route.put("/add/:id/:userid", Update.UserinRoom);
route.put("/increase/:id", Update.AddUserInRoom);
route.put("/decrease/:id", Update.RemoveUserInRoom);

module.exports = {
  route
};
