require("dotenv").config();
require("./db/mongoose");

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

(async () => {
  try {
    app.use(bodyParser.json());
    const userRoutes = require("./routes/user");
    const advertisementRoutes = require("./routes/advertisement");

    app.use("/users", userRoutes);
    app.use("/advertisements", advertisementRoutes);

    app.use("/", (req, res) => {
      res.send("Advertising board :)");
    });

    app.use((req, res, next) => {
      const error = new Error("Not found");
      error.status = 404;
      next(error);
    });

    app.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
        error: error.message,
      });
    });

    app.listen(4400, () => console.log("server working!"));
  } catch (error) {
    console.log(error);
  }
})();
