require("dotenv").config();
const env = process.env.NODE_ENV || "development";

require("./config/database")()
  .then(() => {
    const config = require("./config/config")[env];
    const app = require("express")();

    require("./config/express")(app);
    //require("./config/routes")(app);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(console.error);
