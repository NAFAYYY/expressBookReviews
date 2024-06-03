const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const public_users = require("./router/public_users");
const auth_users = require("./router/auth_users");
const general = require("./router/general");

const app = express();
app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", (req, res, next) => {
  const token = req.session.accessToken;
  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, "your_jwt_secret_key");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
});

app.use("/public", public_users);
app.use("/customer", auth_users);
app.use("/general", general);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
