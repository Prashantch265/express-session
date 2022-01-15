const sequelize = require("../database/models");
const config = require("../config/config.json");
const app = require("./app");

let port = config.port;

app.listen(port, () => {
  console.log(`=================================`);
  console.log(`======= ENV: ${config.env} =======`);
  console.log(`🚀 App listening on the port ${port}`);
  console.log(`=================================`);
});

sequelize
  .sync({ force: true })
  .then(() => console.log("database connected"))
  .catch((err) => console.error(err));
