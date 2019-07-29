//load the things we need
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");

// // PRIVATE, PUBLIC and REFRESH key
const privateKey = fs.readFileSync(
  path.join(__dirname, "../keys/") + "private.key",
  "utf8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "../keys/") + "public.key",
  "utf8"
);
const privateRefreshKey = fs.readFileSync(
  path.join(__dirname, "../keys/") + "refresh_private.key",
  "utf8"
);
module.exports = {
  refreshSign: (name, email) => {
    return jwt.sign(
      {
        name: name,
        email: email,
        date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss")
      },
      privateRefreshKey,
      { expiresIn: 43800 * 60 }
    );
  },

  privateSign: (name, email) => {
    return jwt.sign(
      {
        name: name,
        email: email,
        date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss")
      },
      privateKey,
      { expiresIn: 60 }
    );
  },
  newPrivate: (token, email) => {
    return jwt.verify(token, privateRefreshKey, (err, payload_decoded) => {
      if (err) throw err;
      return jwt.sign(
        {
          name: payload_decoded.name,
          email: payload_decoded.email,
          date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss")
        },
        privateKey,
        { expiresIn: 60 }
      );
    });
  }
};
