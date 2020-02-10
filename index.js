// implement your API here
const express = require("express");

const Hubs = require("./data/db.js"); // need this line to get the list of hubs

const server = express();

server.use(express.json()); // needed for POST, PUT/PATCH

server.get("/api/hubs", (req, res) => {
  // needed to get hubs from database (db.js)
  Hubs.find()
    .then()
    .catch(error => {
      console.log(err);
    });
});

const port = 5000;
server.listen(port, () => {
  console.log(`\n** API on port ${port} \n`);
});
