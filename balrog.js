const bcrypt = require("bcryptjs");

function balrog(config) {
  return function(req, res, next) {
    if (req.url == "/balrog/signin" && req.method == "POST") {
      handleLogin(req, res, config);
    } else if (req.url == "/balrog/logout" && req.method == "POST") {
      handleLogout(req, res);
    } else {
      next();
    }
  };
}

function authenticate(req, res, next) {
  if (req.session.balrog != "Authenticated") {
    res.sendFile("./views/gate.html", { root: __dirname });
  } else {
    next();
  }
}

async function handleLogin(req, res, config) {
  if (!isConfiguredCorrectly(config)) {
    return res.redirect(req.get("Referrer"));
  }

  const submittedPassword = req.body.password;
  bcrypt.compare(submittedPassword, config.passwordHash, function(err, match) {
    if (err) {
      console.error(err);
    } else if (match) {
      req.session.balrog = "Authenticated";
    }
    res.redirect(req.get("Referrer"));
  });
}

function isConfiguredCorrectly(config) {
  if (typeof config === "undefined") {
    console.error(
      "Error: Balrog has not been configured properly. Do you have a balrog_config.js file in this repo?"
    );
    return false;
  }
  if (typeof config.passwordHash === "undefined") {
    console.error(
      "Error: Balrog has not been configured properly. Does balrog_config.js contain an object with a 'passwordHash' property?"
    );
    return false;
  }
  return true;
}

function handleLogout(req, res) {
  delete req.session.balrog;
  res.redirect("/");
}

module.exports = { balrog, authenticate };
