const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./db");
const User = db.User;
const EventsModel = db.Events;

module.exports = {
  authenticate,
  create,
  getById,
  saveEvent,
  getEventById,
};

async function authenticate({ email, password }) {
  const user = await User.findOne({ email: email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id }, "secret", {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function create(userParam) {
  // validate
  console.log(userParam);
  if (await User.findOne({ username: userParam.email })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
  return 1;
}

async function getById(id) {
  return await User.findById(id);
}

async function saveEvent(eventDetails) {
  const events = new EventsModel(eventDetails);

  await events.save();
}

async function getEventById(id) {
  return await EventsModel.find({}).where("userid").equals(id);
}
