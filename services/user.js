const User = require("../models/user");

function getUsers(req, res) {
  const docquery = User.find({});
  docquery
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}
// function getUser(req, res) {
//   const { id } = req.params;
//   const user = User.findById(id);
//   res.send(user);
// }

function postUser(req, res) {
  const user = new User(req.body).populate("advertisements");
  user.save((error) => {
    if (checkServerError(res, error)) return;
    res.status(201).json(user);
    console.log(" User created !");
  });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getUsers,
  //   getUser,
  postUser,
};
