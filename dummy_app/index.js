const express = require("express");
const app = express();
const port = 3000;

const { balrog, authenticate } = require("../balrog.js");
const config = require("./balrog_config.js");

const session = require("express-session");
app.use(
  session({ resave: false, saveUninitialized: false, secret: "supersecret" })
);

if (app.get("env") == "production") {
  session.cookie.secure = true;
}

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(balrog(config));

app.get("/", (req, res) =>
  res.sendFile("index.html", { root: __dirname + "/public" })
);

app.get("/admin", authenticate, (req, res) =>
  res.sendFile("admin.html", { root: __dirname + "/public" })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
