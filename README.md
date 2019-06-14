# Balrog-Auth

![Balrog Green](https://user-images.githubusercontent.com/32128719/59428078-34cdda80-8dd4-11e9-8a5d-50712c075d24.png)

[![CircleCI](https://circleci.com/gh/pixielabs/balrog-auth.svg?style=svg)](https://circleci.com/gh/pixielabs/balrog-auth)
[![npm version](https://badge.fury.io/js/balrog-auth.svg)](https://badge.fury.io/js/balrog-auth)

Balrog-auth is a lightweight authorization library for Express >= 4 written by
[Pixie Labs](https://pixielabs.io) that can protect your routes with password.

Balrog is an alternative to basic authentication that provides some
advantages:

* Uses a password hash instead of a plaintext password.
* Provides a lightweight HTML form instead of inconsistent basic
  authentication.
* Better support for password managers (which often don't support basic
  authentication dialog boxes).

## Installation

Add the package to your package.json:

```bash
$ npm i -S balrog-auth
```

Run the installer to generate an initializer:

```shell
$ npx balrog initialize
Enter New Password: secret-passord
Confirm New Password: secret-password
"Balrog configured!"
$
```

## Regenerating a password hash

If you need to create a new password, modify the object in balrog_config.js.
You can generate a new hash with the provided npx command:

```
$ npx balrog generateHash
New password: secret-password
Confirm New Password: secret-password

$2a$04$8U/Yun3MZ5..FuT9yUJNK.F2uUuHagtvsD.CNc5lSZegzq9eJjwqu
```
Copy this hash into balrog_config.js

## Restricting access in index.js

```js
// Import balrog-auth.
const { balrog, authenticate } = require("balrog-auth");
const config = require("./balrog_config.js");

// Add and configure express-session and body-parser.
// These are balrog-auth dependencies.
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
 
// Configure Balrog to use hashed password.
app.use(balrog(config));

// Any GET requests made to /admin are protected by Balrog.
app.get("/admin", authenticate, (req, res) =>
  res.sendFile("admin.html", { root: __dirname + "/public" })
);
```

## Logout button

To add a logout button, you can add a button making a `POST` request to `/balrog/logout`. After logout, the user will be redirected to the root of the app.

For example, in your view:

```html
<form method="post" action="/balrog/logout">
  <input type="submit" value="Logout" />
</form>
```


## Contributing

### Running the tests

Tests are part of the dummy Express app within the dummy-app folder:

```
$ cd dummy-app
$ npm i
$ npm start
```
In a new terminal: 
```
$ npm test
```

Before contributing, please read the [code of conduct](CODE_OF_CONDUCT.md).
- Check out the latest master to make sure the feature hasn't been implemented
  or the bug hasn't been fixed yet.
- Check out the issue tracker to make sure someone already hasn't requested it
  and/or contributed it.
- Fork the project.
- Start a feature/bugfix branch.
- Commit and push until you are happy with your contribution.
- Please try not to mess with the package.json, version, or history. If you
  want to have your own version, or is otherwise necessary, that is fine, but
  please isolate to its own commit so we can cherry-pick around it.


## TODO

 * Test coverage
 * Expire sessions
 * Hide user input during `npx balrog initialize`
