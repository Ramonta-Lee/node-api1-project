// implement your API here

// req.body is the shape of the data object
// STEP 1:
const express = require("express");

const Hubs = require("./data/db.js"); // need this line to get the list of hubs

// STEP 2
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
  const { id } = req.params;
  Hubs.findById(id)
    .then(user => {
      // EXAMPLE USING TERNARY STATEMENT
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            errorMessage: "The user with the specified ID does not exist."
          });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});

// POST Requests:

server.post("/api/users", (req, res) => {
  const Userinfo = req.body;

  Hubs.insert(Userinfo)
    .then(users =>
      Userinfo.name && Userinfo.bio
        ? res.status(201).json(users)
        : res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
          })
    )
    .catch(err =>
      !Userinfo.name || !Userinfo.bio
        ? res
            .status(400)
            .json({ errorMessage: "Please provide name and bio for the user." })
        : res.status(500).json({
            errorMessage:
              "There was an error while saving the user to the database"
          })
    );
});

// PUT Requests:
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide a username and bio" });
  } else {
    Hubs.update(id, req.body)
      .then(user => {
        if (!user) {
          res.status(404).json({ message: "No user by that ID located" });
        } else {
          res.status(200).json(user);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: "User info could not be modified." });
      });
  }
});

// DELETE Requests:
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  // to get dynamic id for deletion
  Hubs.remove(id)
    .then(user => {
      // EXAMPLE USING TERNARY STATEMENT
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            errorMessage: "The user with the specified ID does not exist."
          });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user could not be removed"
      });
    });
});

// STEP 3 up port and have the server listen; add message
const port = 5000;
server.listen(port, () => {
  console.log(`\n** API on port ${port} \n`);
});
