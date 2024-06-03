const express = require("express");
const axios = require("axios");
const general = express.Router();

// Task 10
general.get("/books", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/public");
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching books");
  }
});

// Task 11
general.get("/books/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/public/isbn/${req.params.isbn}`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching book by ISBN");
  }
});

// Task 12
general.get("/books/author/:author", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/public/author/${req.params.author}`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching books by author");
  }
});

// Task 13
general.get("/books/title/:title", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/public/title/${req.params.title}`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching books by title");
  }
});

module.exports = general;
