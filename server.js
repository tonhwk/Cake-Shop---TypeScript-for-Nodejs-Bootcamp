const express = require("express");
const connectDB = require("./config/db");
const app = express();

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Defining Routes
app.use("/cakes", require("./routes/cakes.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
