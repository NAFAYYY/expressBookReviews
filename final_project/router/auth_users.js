const express = require("express");
const auth_users = express.Router();
const users = {}; // Store user data here

auth_users.delete("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  if (!req.session.accessToken) {
    return res.status(401).send("You need to login first");
  }

  const decoded = jwt.verify(req.session.accessToken, "your_jwt_secret_key");
  const username = decoded.username;
  const book = books[isbn];

  if (book && book.reviews[username]) {
    delete book.reviews[username];
    res.send("Review deleted successfully");
  } else {
    res.status(404).send("Review not found");
  }
});

module.exports = auth_users;
