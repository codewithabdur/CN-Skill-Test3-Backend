const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

// POST routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/resetPassword", authController.resetPassword);



// GET routes

router.get("/", (req, res) =>{
  res.render("homepage");
})
// POST route for user signup
router.post("/signup", authController.signup);

// GET route to render the signup page
router.get("/signup", (req, res) => {
  // Render the signup page here
  res.render("signup"); // Assuming you have a signup.ejs file in your views directory
});

router.get("/signin", (req, res) => {
  // Render the signin page here
  res.render("signin"); // Assuming you have a signin.ejs file in your views directory
});
router.get("/resetPassword", (req, res) => {
  // Render the signin page here
  res.render("resetPassword"); // Assuming you have a signin.ejs file in your views directory
});

router.get("/signout", (req, res) =>{
  res.render("signout")
});

module.exports = router;
