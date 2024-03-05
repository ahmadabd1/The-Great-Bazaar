// Import required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api = require("./routes/api");
const app = express();
// Serving Static Files by Server
app.use(express.static(path.join(__dirname, "dist")));
// Serving Static Files
// If we have frontend libraries or dependencies installed in 'node_modules' that we wanna make available
// to the client-side we can use this middleware to serve them.
app.use(express.static(path.join(__dirname, "node_modules")));
// Parse JSON && URL
// We use these middleware when processing POST requests (to extract data from the request body)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Using the custom API route
app.use("/", api);
const port = 8181;
// Server is listening - the Server ready to accept requests
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
