const Signupdata = require("../Models/RegisterModel");
const jwt = require("jsonwebtoken");

const checkUser = async (req, res, next) => {
  console.log("Cookies: ", req.cookies);
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "koshishkhadka2003", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await Signupdata.findById(decodedToken.id);
        if (user) {
          res.json({ status: true, user: user.email });
        } else {
          res.json({ status: false });
          next();
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
// res.status(200).json({message:"AuthMiddleware"})
};

module.exports = {
  checkUser,
};
