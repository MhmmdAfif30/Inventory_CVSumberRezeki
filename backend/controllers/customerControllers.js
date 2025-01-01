const mysql2 = require("mysql2/promise");
require("dotenv").config();

module.exports = {
  indexCustomer: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      let [result] = await pool.query("SELECT * FROM customer");
      res.status(200).json({
        status: true,
        message: "OK!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  createCustomer: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let { kode, nama, email, telepon, alamat } = req.body;

      if (!kode || !nama || !email || !telepon || !alamat) {
        return res.status(400).json({
          status: false,
          message: "Semua field wajib diisi!",
        });
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({
          status: false,
          message: "Email tidak valid!",
        });
      }
      if (!/^\d{10,15}$/.test(telepon)) {
        return res.status(400).json({
          status: false,
          message:
            "Nomor telepon harus berupa angka dengan panjang 10-15 digit!",
        });
      }

      let [result] = await pool.query(
        "INSERT INTO customer (kode, nama, email, telepon, alamat) VALUES (?, ?, ?, ?, ?)",
        [kode, nama, email, telepon, alamat]
      );

      res.status(201).json({
        status: true,
        message: "Customer Telah Dibuat!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  editCustomer: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let { kode } = req.params;
      let { nama, email, telepon, alamat } = req.body;

      // Validasi input
      if (!nama || !email || !telepon || !alamat) {
        return res.status(400).json({
          status: false,
          message: "Semua field wajib diisi!",
        });
      }
      
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({
          status: false,
          message: "Email tidak valid!",
        });
      }
      if (!/^\d{10,15}$/.test(telepon)) {
        return res.status(400).json({
          status: false,
          message:
            "Nomor telepon harus berupa angka dengan panjang 10-15 digit!",
        });
      }

      let [result] = await pool.query(
        "UPDATE customer SET nama = ?, email = ?, telepon = ?, alamat = ? WHERE kode = ?",
        [nama, email, telepon, alamat, kode]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "Customer Tidak Ditemukan!",
        });
      }

      res.status(201).json({
        status: true,
        message: "Customer updated successfully!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteCustomer: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let { kode } = req.params;

      if (!kode) {
        return res.status(400).json({
          status: false,
          message: "Kode wajib diisi!",
        });
      }

      let [result] = await pool.query("DELETE FROM customer WHERE kode = ?", [
        kode,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "Customer Tidak Ditemukan!",
        });
      }

      res.status(200).json({
        status: true,
        message: "Customer Telah Dihapus!",
      });
    } catch (err) {
      next(err);
    }
  },
};
