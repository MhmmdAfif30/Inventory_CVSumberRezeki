const mysql2 = require("mysql2/promise");
require("dotenv").config();

module.exports = {
  indexBahanBaku: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      let [result] = await pool.query("SELECT * FROM bahan_baku");
      res.status(200).json({
        status: true,
        message: "OK!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  createBahanBaku: async (req, res, next) => {
    try {
      const { kode_bahan_baku, nama_bahan_baku, stok, harga, satuan } =
        req.body;

      // Validasi input
      if (
        !kode_bahan_baku ||
        !nama_bahan_baku ||
        stok == null ||
        harga == null ||
        !satuan
      ) {
        return res.status(400).json({
          status: false,
          message: "Semua field wajib diisi!",
        });
      }

      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query(
        "INSERT INTO bahan_baku (kode_bahan_baku, nama_bahan_baku, stok, harga, satuan) VALUES (?, ?, ?, ?, ?)",
        [kode_bahan_baku, nama_bahan_baku, stok, harga, satuan]
      );

      res.status(201).json({
        status: true,
        message: "Bahan Baku Telah Dibuat!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  editBahanBaku: async (req, res, next) => {
    try {
      const { kode_bahan_baku } = req.params;
      const { nama_bahan_baku, stok, harga, satuan } = req.body;

      if (!nama_bahan_baku || stok == null || harga == null || !satuan) {
        return res.status(400).json({
          status: false,
          message: "Semua field wajib diisi!",
        });
      }

      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query(
        "UPDATE bahan_baku SET nama_bahan_baku = ?, stok = ?, harga = ?, satuan = ? WHERE kode_bahan_baku = ?",
        [nama_bahan_baku, stok, harga, satuan, kode_bahan_baku]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "Bahan Baku Tidak Ditemukan!",
        });
      }

      res.status(200).json({
        status: true,
        message: "Bahan Baku Telah Diperbarui!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBahanBaku: async (req, res, next) => {
    try {
      const { kode_bahan_baku } = req.params;

      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query(
        "DELETE FROM bahan_baku WHERE kode_bahan_baku = ?",
        [kode_bahan_baku]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "Bahan Baku Tidak Ditemukan!",
        });
      }

      res.status(200).json({
        status: true,
        message: "Bahan Baku Telah Dihapus!",
      });
    } catch (err) {
      next(err);
    }
  },
};
