const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tipSchema = new Schema(
  {
    method: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tip = mongoose.model("Tip", tipSchema);
module.exports = Tip;
