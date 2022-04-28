const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

//const routes = require("./routes/index");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// catch 400
app.use((req, res, next) => {
  res.status(400).send(`Error: ${req.originalUrl} not found`);
  next();
});

// catch 500
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(`Error: ${err}`);
  next();
});

//routes(app);

mongoose.connect("mongodb://localhost:27017/database",(error)=>{
  if(error) console.log(error);
  console.log("Mongo conectado");
})

module.exports = app;
