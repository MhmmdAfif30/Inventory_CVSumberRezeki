const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = {
  restrict: (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
        err: "Missing token in header",
        data: null,
      });
    }

    jwt.verify(authorization, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
          err: err.message,
          data: null,
        });
      }

      // Query the user based on the decoded id
      db.execute("SELECT * FROM users WHERE id = ?", [decoded.id], (err, results) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Database error",
            err: err.message,
            data: null,
          });
        }

        if (results.length > 0) {
          req.user = results[0];
          next();
        } else {
          return res.status(404).json({
            status: false,
            message: "User not found",
            err: "No user found with the given ID",
            data: null,
          });
        }
      });
    });
  },
};
