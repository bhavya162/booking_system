const User = require("../models/UserSchema.model.js");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.send("Email already registered");

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hash
    });
    const savedUser = await User.create({ username, email, password: hash });
console.log("DATA SAVED TO ATLAS:", savedUser); 
    res.send("Registered successfully");
  } catch (err) {
    res.send(err.message);
  }
};

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // TOKEN 
    const SECRET = "mysecretkey";
    const token = jwt.sign(
  { 
    id: user._id,
    role: user.role  
  }, 
  SECRET,
  { expiresIn: "1h" }
);

    // Send the token back to React
    res.status(200).json({
      message: "Login successful",
      token: token, // React is looking for this!
      username: user.username,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};