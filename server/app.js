const express = require("express");
const app = express();
const session = require("express-session")
const port = 3000; 
const routes = require("./routes");
const { default: knex } = require("knex");
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: secret, // Change this to a random string
  resave: false,
  saveUninitialized: true
}));
app.use("/", routes);
app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
