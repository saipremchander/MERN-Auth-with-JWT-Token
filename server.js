const express = require("express");
const mongoose = require("mongoose");
const Authuser = require("./user.model");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const cors = require("cors");
const app = express();

mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
  console.log("Database Connected");
});

app.use(express.json());
app.use(cors());
//Register
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    //verification
    if (!email || !username || !password || !confirmpassword) {
      return res.status(400).send({ message: "Please Fill All Details" });
    }
    const existinguser = await Authuser.findOne({ email: email });
    if (existinguser) {
      console.log("User Already Exists");
      return res.status(400).send({ message: "User Already Exists" });
    }
    if (password !== confirmpassword) {
      console.log("Passwords are Mismatched");
      return res.status(400).send({ message: "Passwords are Mismatched" });
    }
    const newUser = new Authuser({
      username,
      email,
      password,
      confirmpassword,
    });

    await newUser.save();
    res.status(200).send({ message: "User Registered Successfully" });
  } catch (err) {
    console.log({ message: err });
    res.status(500).send({ message: "Internal Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existinguser = await Authuser.findOne({ email });
    if (!existinguser) {
      return res.status(400).send({ message: "User Not Found" });
    }
    if (password !== existinguser.password) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    const payload = {
      user: {
        id: existinguser.id,
      },
    };
    jwt.sign(payload, "jwtsecret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.json(token);
    });
  } catch (err) {
    console.log({ message: err });
    res.status(500).send({ message: "Internal Server error" });
  }
});
app.get("/myprofile", middleware, async (req, res) => {
  try {
    const existinguser = await Authuser.findById(req.user.id);
    if (!existinguser) {
      return res.status(400).send("User not Found");
    }
    res.json(existinguser);
  } catch (err) {
    console.log({ message: err });
    res.status(500).send({ message: "Internal Server error" });
  }
});
app.listen(5000, () => {
  console.log("Server Running");
});
