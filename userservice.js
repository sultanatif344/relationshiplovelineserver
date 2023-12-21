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
  UploadImageToCloudinary,
  getAllUsers
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
  if (await User.findOne({ email: userParam.email })) {
    throw 'Id with email "' + userParam.email + '" is already registered';
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

async function UploadImageToCloudinary(base64Image) {
  try {
    const cloudinary = require('cloudinary');
    console.log("base64Image: ", base64Image)
    cloudinary.v2.config({
      cloud_name: 'doeu0erh2',
      api_key: '574164989263918',
      api_secret: 'sHVuIkze2OlMnhJa9bzH0vDO5zA',
      secure: true,
    });

    const uploadResult = cloudinary.v2.uploader.upload("data:image/jpeg;base64," + base64Image, {
      resource_type: "image",
      width: 300,
      height: 300,
      crop: "fill"
    }).catch(err => {
      console.log(err)
    })
    return uploadResult
  }

  catch (err) {
    return err
  }

}

async function getById(id) {
  return await User.findById(id);
}

async function getAllUsers() {
  return await User.find({});
}

async function saveEvent(eventDetails) {
  const events = new EventsModel(eventDetails);

  await events.save();
}

async function getEventById(id) {
  return await EventsModel.find({}).where("userid").equals(id);
}
