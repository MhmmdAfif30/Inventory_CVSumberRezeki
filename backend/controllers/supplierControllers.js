const mysql2 = require("mysql2/promise");
require("dotenv").config();

module.exports = {
  indexSupplier: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      let [result] = await pool.query("SELECT * FROM supplier");
      res.status(200).json({
        status: true,
        message: "OK!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  createSupplier: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let {
        kode,
        nama,
        email,
        telepon,
        alamat,
        stok_supplier,
        nama_bahan_baku,
      } = req.body;

      if (
        !kode ||
        !nama ||
        !email ||
        !telepon ||
        !alamat ||
        !stok_supplier ||
        !nama_bahan_baku
      ) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
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
        `INSERT INTO supplier (kode, nama, email, telepon, alamat, stok_supplier, nama_bahan_baku) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [kode, nama, email, telepon, alamat, stok_supplier, nama_bahan_baku]
      );

      res.status(201).json({
        status: true,
        message: "Supplier created successfully.",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  editSupplier: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let { kode } = req.params;
      let { nama, email, telepon, alamat, stok_supplier, nama_bahan_baku } = req.body;

      if (
        !kode ||
        !nama ||
        !email ||
        !telepon ||
        !alamat ||
        !stok_supplier ||
        !nama_bahan_baku
      ) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
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
        "UPDATE supplier SET nama = ?, email = ?, telepon = ?, alamat = ?, stok_supplier =?, nama_bahan_baku =? WHERE kode = ?",
        [nama, email, telepon, alamat, stok_supplier, nama_bahan_baku, kode]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "Supplier Tidak Ditemukan!",
        });
      }

      res.status(200).json({
        status: true,
        message: "Supplier Telah Diperbarui!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteSupplier: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let { kode } = req.params;

      let [result] = await pool.query("DELETE FROM supplier WHERE kode = ?", [
        kode,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "Supplier Tidak Ditemukan!",
        });
      }

      res.status(200).json({
        status: true,
        message: "Supplie Telah Dihapus!",
      });
    } catch (err) {
      next(err);
    }
  },
};
