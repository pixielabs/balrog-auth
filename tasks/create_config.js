#!/usr/bin/env node

// This is a shell script used to encrypt a password and
// create a Balrog Config file.
// USAGE: `npx balrog initialize`

const fs = require("fs");
const getPassword = require('./get_password.js');


getPassword(writeConfigFile);

function writeConfigFile(hash) {
  let config = `module.exports = {
  passwordHash: "${hash}"
};
`;

  fs.writeFile("./balrog_config.js", config, err => {
    if (err) throw err;
    console.log("Balrog configured!");
  });
}
