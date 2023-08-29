const express = require("express");
const router = express.Router();
const userService = require("./userservice");
const mongoose = require("mongoose");

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);
router.post("/create-event", createEvent);
router.get("/:id", getById);
router.get("/get-events-by-id", getEventById);

console.log("here");
function authenticate(req, res, next) {
  console.log(req);
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  console.log(req);

  req.body["_id"] = mongoose.Types.ObjectId().toString();
  userService
    .create(req.body)
    .then(() => res.json({ message: "User Created!", success: true }))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function createEvent(req, res, next) {
  req.body["_id"] = mongoose.Types.ObjectId().toString();
  userService.saveEvent(req.body);

  res.json({ user: "some test user" });
}

function getEventById(req, res, next) {
  userService
    .getEventById(req.params.id)
    .then((event) => {
      event ? res.json(event) : res.sendStatus(404);
    })
    .catch((err) => next(err));
}

module.exports = router;
