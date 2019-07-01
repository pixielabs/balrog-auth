#!/usr/bin/env node

// This is a shell script used to encrypt a password.
// USAGE: `npx balrog-generateHash`

const getPassword = require('./get_password.js');

getPassword(console.log);

