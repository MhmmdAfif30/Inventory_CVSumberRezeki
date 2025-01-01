const mysql2 = require("mysql2/promise");
require("dotenv").config();

module.exports = {
  indexProduksi: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      let [result] = await pool.query("SELECT * FROM produksi");
      res.status(200).json({
        status: true,
        message: "OK!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  createProduksi: async (req, res, next) => {
    try {
      const {
        kode_produksi,
        nama_produksi,
        biaya_produksi,
        tgl_produksi,
        deadline_produksi,
        waktu_produksi,
      } = req.body;

      if (
        !kode_produksi ||
        !nama_produksi ||
        !biaya_produksi ||
        !tgl_produksi ||
        !deadline_produksi ||
        !waktu_produksi
      ) {
        return res.status(400).json({
          status: false,
          message: "Semua field harus diisi!",
        });
      }

      if (isNaN(biaya_produksi)) {
        return res.status(400).json({
          status: false,
          message: "Biaya produksi harus berupa angka!",
        });
      }

      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query(
        "INSERT INTO produksi (kode_produksi, nama_produksi, biaya_produksi, tgl_produksi, deadline_produksi, waktu_produksi) VALUES (?, ?, ?, ?, ?, ?)",
        [
          kode_produksi,
          nama_produksi,
          biaya_produksi,
          tgl_produksi,
          deadline_produksi,
          waktu_produksi,
        ]
      );

      res.status(201).json({
        status: true,
        message: "Produksi Telah Dibuat!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  editProduksi: async (req, res, next) => {
    try {
      const { kode_produksi } = req.params;
      const {
        nama_produksi,
        biaya_produksi,
        tgl_produksi,
        deadline_produksi,
        waktu_produksi,
      } = req.body;

      if (
        !nama_produksi ||
        !biaya_produksi ||
        !tgl_produksi ||
        !deadline_produksi ||
        !waktu_produksi
      ) {
        return res.status(400).json({
          status: false,
          message: "Semua field harus diisi!",
        });
      }

      if (isNaN(biaya_produksi)) {
        return res.status(400).json({
          status: false,
          message: "Biaya produksi harus berupa angka!",
        });
      }

      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query(
        "UPDATE produksi SET nama_produksi = ?, biaya_produksi = ?, tgl_produksi = ?, deadline_produksi = ?, waktu_produksi = ? WHERE kode_produksi = ?",
        [
          nama_produksi,
          biaya_produksi,
          tgl_produksi,
          deadline_produksi,
          waktu_produksi,
          kode_produksi,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "Produksi Tidak Ditemukan!",
        });
      }

      res.status(200).json({
        status: true,
        message: "Produksi Telah Diperbarui!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteProduksi: async (req, res, next) => {
    try {
      const { kode_produksi } = req.params;

      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query(
        "DELETE FROM produksi WHERE kode_produksi = ?",
        [kode_produksi]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "Produksi Tidak Ditemukan!",
        });
      }

      res.status(200).json({
        status: true,
        message: "Produksi Telah Dihapus!",
      });
    } catch (err) {
      next(err);
    }
  },
};
