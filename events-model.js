const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String },
  date: { type: Number },
  month: { type: Number },
  year: { type: Number },
  event: {
    type: { type: String },
    RN: { type: Number },
    RNLPN: { type: Number },
    CRMAPSS: { type: Number },
    CNA: { type: Number },
    CNAM: { type: Number },
    From: { type: String },
    To: { type: String },
    needsList: { type: Array },
  },
});

module.exports = mongoose.model("Events", eventSchema);
