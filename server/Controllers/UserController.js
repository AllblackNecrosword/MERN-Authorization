const Signupdata = require("../Models/RegisterModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "koshishkhadka2003", {
    expiresIn: maxAge,
  });
};

const registerhandler = async (req, res) => {
  try {
    const { email, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);

    const Data = await Signupdata.create({
      email,
      password: hashpassword,
    });
    const token = createToken(Data._id);

    // res.cookie("jwt", token, {
    //   httpOnly: false,
    //   secure: false, // change to true if using HTTPS
    //   maxAge: maxAge * 1000,
    
    // });
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    if (Data) {
      res.status(201).json({ Data: Data._id, created: true });
    } else {
      res.status(400).json({ message: "Error creating user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const loginhandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Signupdata.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const checkpassword = bcrypt.compareSync(password, user.password);
    if (!checkpassword) {
      res.status(400).json({ message: "Invalid password" });
    }
    const token = createToken(user._id);
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: false, // change to true if using HTTPS
    //   maxAge: maxAge * 1000,
    // });
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ Data: user._id, created: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerhandler,
  loginhandler,
};
