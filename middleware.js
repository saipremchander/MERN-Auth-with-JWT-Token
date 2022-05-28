const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.header("x-token");
    if (!token) {
      res.status(400).send({ message: "Token Not FOund" });
    }
    const decode = jwt.verify(token, "jwtsecret");

    req.user = decode.user;
    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
