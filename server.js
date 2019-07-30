require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");
const { check, validationResult } = require("express-validator");
const { privateSign, refreshSign, newPrivate } = require("./configs/jwt");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const User = require("./models/user");

/***************Mongodb configuratrion********************/
const mongoose = require("mongoose");
const configDB = require("./configs/database.js");
//configuration ==================================================================
mongoose.connect(configDB.url, { useNewUrlParser: true }, err => {
  if (err) return console.error(err);
  console.log("Database connected");
}); // connect to our database

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.post(
    "/api/login",
    [
      // Check if valid email address and not empty
      check("email")
        .isEmail()
        .withMessage("Must be valid email address.")
        .not()
        .isEmpty()
        .withMessage("Email must not be empty."),
      // password must be at least 5 chars long
      check("password")
        .not()
        .isEmpty()
        .withMessage("Password must not be empty.")
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).jsonp({ error: errors.array() });
      }

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ email: req.body.email }, (err, doc) => {
        // if there are any errors, return the error before anything else
        if (err) return res.status(422).jsonp({ error: err.message });

        // if no user is found, return the message
        if (!doc)
          return res.status(422).jsonp({
            error: "Sorry Your Account Not Exits ,Please Create Account."
          });
        // if the user is found but the password is wrong
        if (!doc.validPassword(req.body.password, doc.password))
          return res.status(422).jsonp({ error: "Email or password is wrong" });

        return res.jsonp({
          name: doc.name,
          email: doc.email,
          token: privateSign(doc.name, doc.email)
        });
      });
    }
  );

  server.post(
    "/api/register",
    [
      // Check if name is not empty
      check("name")
        .not()
        .isEmpty()
        .withMessage("Name must not be empty")
        .isLength({ min: 3 }),
      // Check if valid email address and not empty
      check("email")
        .isEmail()
        .withMessage("Must be valid email address.")
        .not()
        .isEmpty()
        .withMessage("Email must not be empty."),
      // password must be at least 5 chars long
      check("password")
        .not()
        .isEmpty()
        .withMessage("Password must not be empty.")
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).jsonp(errors.array());
      // find a user whose email is the same as the forms email
      User.findOne({ email: req.body.email }, (err, doc) => {
        // if there are any errors, return the error
        if (err) return res.status(422).jsonp({ error: err.message });

        // check to see if theres already a user with that email
        if (doc)
          return res
            .status(422)
            .jsonp({ error: "That email is already taken." });

        // if there is no user with that email
        // create the use
        const newUser = new User();

        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = newUser.generateHash(req.body.password);

        newUser.save(err => {
          if (err) throw err;
          delete newUser.password;
          return res.jsonp({ msg: newUser });
        });
      });
    }
  );

  server.get("/api/users", async (req, res) => {
    User.find({ admin: false }, ["name", "email", "disable"], (err, doc) => {
      return res.json(doc);
    });
  });
  server.delete("/api/users", async (req, res) => {
    User.findOneAndRemove({ email: req.body.email }, (err, del) => {
      User.find({}, ["name", "email", "disable"], (err, doc) => {
        return res.json(doc);
      });
    });
  });

  server.post("/api/:type", async (req, res) => {
    const pyshell = await new PythonShell("main.py", {
      args: [req.params.type, ...((req.body.payload && req.body.payload) || [])]
    });
    await pyshell.on("message", message => {
      return res.json(JSON.parse(message));
    });
  });

  server.get("/forecast/:feature", (req, res) => {
    return app.render(req, res, "/forecast", { feature: req.params.feature });
  });

  server.get("/simulation/:feature", (req, res) => {
    return app.render(req, res, "/simulation", { feature: req.params.feature });
  });

  server.get("/timeline", (req, res) => {
    return app.render(req, res, "/timeline", req.query);
  });

  server.get("/rivers", (req, res) => {
    return app.render(req, res, "/rivers", req.query);
  });

  server.get("/about", (req, res) => {
    return app.render(req, res, "/about", req.query);
  });

  server.get("/contact", (req, res) => {
    return app.render(req, res, "/contact", req.query);
  });

  server.get("/register", (req, res) => {
    return app.render(req, res, "/register", req.query);
  });

  server.get("/login", (req, res) => {
    return app.render(req, res, "/login", req.query);
  });

  server.get("/users", (req, res) => {
    return app.render(req, res, "/user_management", req.query);
  });

  server.get("/data", (req, res) => {
    return app.render(req, res, "/data_management", req.query);
  });

  server.get(["/home", "/"], (req, res) => {
    return app.render(req, res, "/index", req.query);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Server started on port ${port}`);
  });
});
