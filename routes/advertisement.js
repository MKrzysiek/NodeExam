const express = require("express");
const router = express.Router();

const Advertisement = require("../models/advertisement");
const User = require("../models/user");

// const authMiddleware = async (req, res, next) => {
//   const [login, password] = req.headers.authorization.split(":");
//   const users = new User(req.body);
//   const user = await users.find(
//     (u) => u.login === login && u.password === password
//   );

//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// };

(async () => {
  const users = await User.find(); /* trzeba pobrac userow z kolekcji */
  // console.log(users);
})();

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.sendStatus(401);
      return;
    }

    const [login, password] = authorization.split(":");
    const user = await users.findOne({ login });

    if (!user) {
      res.sendStatus(401);
      return;
    }

    if (user.login === login && user.password === password) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
};
router.get("/", async (req, res, next) => {
  try {
    const advertisements = await Advertisement.find(req.query);
    /* np. {
      body: /kupie/i,
    } */
    res.status(200).send(advertisements);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const advertisment = await Advertisement.findById(id);
    /*.populate("user");*/
    res.send(advertisment);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const advertisment = new Advertisement(req.body);
    advertisment.autor = req.user;
    await advertisment.populate("user").save();
    res.status(201).send(advertisment);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Advertisement.findByIdAndDelete(id).populate("user");
    res.status(200).send("Deleted");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const advertisement = await Advertisement.findByIdAndUpdate(id, req.body);
    res.status(202).send(advertisement);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
