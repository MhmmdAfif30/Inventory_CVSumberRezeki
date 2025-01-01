const bcrypt = require("bcrypt");
const mysql2 = require("mysql2/promise");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  register: async (req, res, next) => {
    try {
      let { kode, nama, username, password, role, password_confirmation } =
        req.body;

      if (!password || !password_confirmation) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "Password and password confirmation are required.",
          data: null,
        });
      }

      if (password !== password_confirmation) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "Password and password confirmation do not match!",
          data: null,
        });
      }

      let hashedPassword = await bcrypt.hash(password, 10);

      let pool = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      // Check if the username already exists
      let [existingUser] = await pool.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (existingUser.length > 0) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "Username already exists!",
          data: null,
        });
      }

      // Validate role
      let validRoles = ["admin", "supervisor"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "Invalid role!",
          data: null,
        });
      }

      let [result] = await connection.execute(
        "INSERT INTO users (kode, nama, username, password, role) VALUES (?, ?, ?, ?, ?)",
        [kode, nama, username, hashedPassword, role]
      );

      await connection.end();

      return res.status(201).json({
        status: true,
        message: "User registered successfully",
        data: {
          id: result.insertId,
          kode,
          nama,
          username,
          role,
        },
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      let { username, password, role } = req.body;
      let connection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [rows] = await connection.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      let users = rows[0];

      if (!users) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "Invalid username or password!",
          data: null,
        });
      }

      let isPasswordValid = await bcrypt.compare(password, users.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "Invalid username or password!",
          data: null,
        });
      }

      // Role mismatch
      if (role && users.role !== role) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "Unregistered role!",
          data: null,
        });
      }

      let redirectUrl;
      if (users.role === "admin") {
        redirectUrl = "admin/dashboard";
      } else if (users.role === "supervisor") {
        redirectUrl = "supervisor/admin";
      } else {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "Unknown role!",
          data: null,
        });
      }

      // Generate JWT token
      let token = jwt.sign(
        { username: users.username, role: users.role, id: users.id },
        process.env.JWT_SECRET_KEY
      );

      // Successful login
      return res.status(200).json({
        status: true,
        message: "Login successful",
        user: {
          username: users.username,
          password: users.password,
          role: users.role,
          token: token, // Include the token in the response
        },
        redirectUrl: redirectUrl,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  whoami: (req, res, next) => {
    return res.status(200).json({
      status: true,
      message: "OK",
      err: null,
      data: { users: req.user },
    });
  },

  logout: (req, res, next) => {
    try {
      res.clearCookie("token");

      return res.status(200).json({
        status: true,
        message: "Logout successful",
        redirectUrl: "/login",
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
