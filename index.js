// implement your API here
const express = require("express");

const Hubs = require("./data/db.js"); // need this line to get the list of hubs

const server = express();

server.use(express.json()); // needed for POST, PUT/PATCH

// GET REQUESTS:

server.get("/api/users", (req, res) => {
  // needed to get hubs from database (db.js)
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
 const {id} = req.params;
  Hubs.findById(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        errorMessage: "The user with the specified ID does not exist."
      })
      .catch(err => {
       console.log(err);
       res.status(500).json({
        errorMessage: "The user information could not be retrieved."
       })
      })
    });
});

const port = 5000;
server.listen(port, () => {
  console.log(`\n** API on port ${port} \n`);
});
