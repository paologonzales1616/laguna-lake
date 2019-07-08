require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
// const { PythonShell } = require("python-shell");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.get("/api/login", (req, res) => {
    res.json({ message: "Login API Route" });
  });

  server.get("/api/register", (req, res) => {
    res.json({ message: "Register API Route" });
  });

  server.get("/forecast", (req, res) => {
    return app.render(req, res, "/forecast", req.query);
  });

  server.get("/simulation", (req, res) => {
    return app.render(req, res, "/simulation", req.query);
  });

  server.get("/timeline", (req, res) => {
    return app.render(req, res, "/timeline", req.query);
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

  server.get(["/home", "/"], (req, res) => {
    // await PythonShell.run("main.py", {}, (err, results) => {
    //   if (err) throw err;
    //   // results is an array consisting of messages collected during execution
    //   console.log("results: %j", results);
    return app.render(req, res, "/index", req.query);
    // });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Server started on port ${port}`);
  });
});
