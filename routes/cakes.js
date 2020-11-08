const express = require("express");
const router = express.Router();
const CakeSchema = require("../models/CakeSchema");

// @route POST /cakes
// @desc Register a new Cake
// @access Public
router.post("/", async (req, res) => {
  const { name, price, flavors } = req.body;
  try {
    let cake = await CakeSchema.findOne({ name: name });
    if (cake) {
      return res.status(400).json({ msg: "Cake already exists!" });
    }
    cake = new CakeSchema({
      name,
      price,
      flavors,
    });

    await cake.save();
    res.send("Cake Saved!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// @route GET /cakes
// @desc Get all cakes
// @access Public
router.get("/", async (req, res) => {
  try {
    let cakes = await CakeSchema.find({});
    // res.json(cakes);
    res.send(
      cakes.map((v) => {
        const { price, name, flavors, _id } = v;
        return {
          id: _id,
          name,
          price,
        };
      })
    );
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// @route PUT /cakes/:id
// @desc Update a cake
// @access Public
router.put("/:id", async (req, res) => {
  const { name, price } = req.body;
  const cakeFields = {};
  if (name) cakeFields.name = name;

  try {
    let cake = await CakeSchema.findById(req.params.id);

    if (!cake) return res.status(404).json({ msg: "Cake not found!" });
    // cake = {
    //   ...cake,
    //   cakeFields,
    // };
    // await cake.save();
    let cakeFields = {};
    const { name, price } = req.body;
    if (name) cakeFields.name = name;
    if (price) cakeFields.price = price;
    cake = await CakeSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: cakeFields,
      },
      { new: true }
    );

    res.json(cake);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// @route DELETE /cakes/:id
// @desc Delete a cake
// @access Public
router.delete("/:id", async (req, res) => {
  try {
    let cake = await CakeSchema.findById(req.params.id);

    if (!cake) return res.status(404).json({ msg: "Cake not found!" });

    await CakeSchema.findByIdAndRemove(req.params.id);

    res.json({ msg: "Cake Deleted!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
