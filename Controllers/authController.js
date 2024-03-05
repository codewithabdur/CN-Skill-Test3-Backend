const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Generate a salt to hash the password
    const salt = await bcrypt.genSalt(10); //10 rounds encryption
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user instance with the hashed password
    const user = new User({ email, password: hashedPassword });
    // Save the user to the database
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ message: "Error registering user" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "Invalid email or password" });
  }

  // Compare the provided password with the hashed password from the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).send({ message: "Invalid email or password" });
  }

  // Passwords match, so the user is successfully logged in
  // Send the user's email back to the client
  res.send({ message: "User logged in successfully", email: user.email });
};



exports.signout = (req, res) => {
  res.send({ message: "User signed out successfully" });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email" });
    }
    let hashedPassword;
    if (newPassword) {
      const salt = await bcrypt.genSalt(10); // Generate a salt
      hashedPassword = await bcrypt.hash(newPassword, salt); // Hash the new password
    } else {
      // Use the default password "123456789" if newPassword is not provided
      hashedPassword = await bcrypt.hash("123456789", 10);
    }
    user.password = hashedPassword;
    await user.save();
    res.send({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send({ message: "Error resetting password" });
  }
};
