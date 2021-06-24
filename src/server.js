const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
app.use(express.json());

//create connection to database

const db = mysql.createPool({
  host: process.env.DB_HOST, //localhost
  user: process.env.DB_USER, //root
  password: process.env.DB_PASSWORD, //password
  database: process.env.DB //ravenbooks
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener.address().port);
});
