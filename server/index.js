const sequelize = require("../database/models");
const app = require("./app");

app.listen(3000, () => console.log("server started on 3000"));

sequelize
  .sync({ force: true })
  .then(() => "DB connected")
  .catch((err) => {
    console.log(err);
  });
