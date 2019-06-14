const bcrypt = require("bcryptjs");
const readline = require("readline");

// Setting up Readable and Writable streams for readline instance.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get user passwords from user and check they are identical.
function getPassword(callback) {
  console.warn("The password will be shown in the terminal.");
  rl.question("Enter Password: ", password1 => {
    rl.question("Confirm Password: ", password2 => {
      if (password1 == password2) {
        const hash = hashPassword(password1);
        console.log("");
        callback(hash);
      } else {
        console.error("Passwords did not match :(");
      }
      rl.close();
    });
  });
}

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

module.exports = getPassword;
