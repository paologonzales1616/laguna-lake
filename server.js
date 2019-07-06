require("dotenv").config();
const express = require("express");
const next = require("next");
const { PythonShell } = require("python-shell");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get(["/", "/home"], async (req, res) => {
    await PythonShell.run("main.py", {}, (err, results) => {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log("results: %j", results);
      return app.render(req, res, "/index", { id: results });
    });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
