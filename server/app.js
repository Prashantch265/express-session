const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "YOUR_SECRET",
    ssl: true,
    cookie: {
      maxAge: 1000 * 60, //1 min
    },
  })
);

app.get("/", (req, res) => {
  // console.log(req.session);

  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }

  res.send(`Page is visited for ${req.session.viewCount} time`);
});

module.exports = app;
