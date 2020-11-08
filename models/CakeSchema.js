const mongoose = require("mongoose");
const CakeSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  price: Number,
  flavors: [String],
});

module.exports = mongoose.model("cake", CakeSchema);
