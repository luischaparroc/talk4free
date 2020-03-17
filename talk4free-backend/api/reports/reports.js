const route = require("express").Router();
const CreateReport = require("./reports.create");
const Reading = require("./reports.read");

route.get("/", Reading.ReadAllReports);
route.get("/:id", Reading.ReadOneReport);

route.post("/", CreateReport.CreateReport);

module.exports = {
  route
};
