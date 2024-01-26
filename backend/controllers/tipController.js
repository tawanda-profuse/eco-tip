const Tip = require("../models/Tip");

const tips_index = (req, res) => {
  Tip.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  tips_index,
};
