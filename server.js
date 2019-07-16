require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");

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

  server.post("/api/:type", async (req, res) => {
    const pyshell = await new PythonShell("main.py", {
      args: [req.params.type, ...(req.body.payload && req.body.payload || [])]
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
