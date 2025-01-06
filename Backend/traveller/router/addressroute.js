const express = require("express");
const router = express.Router();
const { addAddress, getAddressesByUser } = require("../../traveller/controller/addresscon");

// Define the routes
router.post("/address", addAddress); // POST request to add a new address
router.get("/address/:userId", getAddressesByUser); // GET request to fetch addresses for a user

module.exports = router;
