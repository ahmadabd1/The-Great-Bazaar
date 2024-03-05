//Import required module
const express = require("express");
const router = express.Router();
// Sample data

// Serving Data
// Example of handling required parameters - request.params
router.get("/landing/:username", function (request, response) {
  response.send(`Hi there, ${request.params.username}`);
});
// Serving Data
// Example of handling optional parameters - request.query.name (in this case, 'name' is an optional parameter obtained from the URL)
router.get("/routeWithOptionalParameters", (request, response) => {
  let params = request.query;
  response.send(params);
});
// cRud operation - Retrieve data
router.get("/wonders", function (req, res) {
  res.send(wonders);
});
// Crud operation - Create new data
router.post("/wonder", function (req, res) {
  console.log("Someone's trying to make a post request");
  let wonder = req.body;
  wonder.visited === "false";
  wonders.push(wonder);
  res.end();
});
// crUd Operation - Update existing data
router.put("/wonder/:name", function (req, res) {
  console.log("Updating request");
  console.log(req.params.name);
  let wonderName = req.params.name;
  console.log((wonders.find((won) => won.name === wonderName).visited = true));
  res.end();
});
// cruD Operation - Delete existing data
router.delete("/wonder/:name", function (req, res) {
  console.log("Deleting request");
  let wonderName = req.params.name;
  let wonderIndex = wonders.findIndex((won) => won.name === wonderName);
  wonders.splice(wonderIndex, 1);
  res.end();
});
module.exports = router;
