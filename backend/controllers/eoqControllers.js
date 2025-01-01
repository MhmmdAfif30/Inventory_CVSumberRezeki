const mysql2 = require("mysql2/promise");
require("dotenv").config();

module.exports = {
  indexEOQ: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query("SELECT * FROM hitung_eoq");
      res.status(200).json({
        status: true,
        message: "OK!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  createEOQ: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let {
        nama_bahan_baku,
        total_kebutuhan,
        biaya_pemesanan,
        biaya_penyimpanan,
      } = req.body;

      // Validasi input
      if (
        !nama_bahan_baku ||
        !total_kebutuhan ||
        !biaya_pemesanan ||
        !biaya_penyimpanan
      ) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }

      let eoq = Math.sqrt(
        (2 * total_kebutuhan * biaya_pemesanan) / biaya_penyimpanan
      );

      let total_biaya =
        (total_kebutuhan / eoq) * biaya_pemesanan +
        (eoq / 2) * biaya_penyimpanan;

      let rata_rata = eoq / 2;

      let [result] = await pool.query(
        `INSERT INTO hitung_eoq (nama_bahan_baku, total_kebutuhan, biaya_pemesanan, biaya_penyimpanan, eoq, total_biaya, rata_rata) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          nama_bahan_baku,
          total_kebutuhan,
          biaya_pemesanan,
          biaya_penyimpanan,
          eoq,
          total_biaya,
          rata_rata,
        ]
      );

      res.status(201).json({
        status: true,
        message: "EOQ calculation has been created!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  editEOQ: async (req, res, next) => {
    try {
      const { id } = req.params;
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let {
        nama_bahan_baku,
        total_kebutuhan,
        biaya_pemesanan,
        biaya_penyimpanan,
      } = req.body;

      // Validasi input
      if (
        !nama_bahan_baku ||
        !total_kebutuhan ||
        !biaya_pemesanan ||
        !biaya_penyimpanan
      ) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }

      // Hitung ulang EOQ dan total biaya
      let eoq = Math.sqrt(
        (2 * total_kebutuhan * biaya_pemesanan) / biaya_penyimpanan
      );

      let total_biaya =
        (total_kebutuhan / eoq) * biaya_pemesanan +
        (eoq / 2) * biaya_penyimpanan;

      let rata_rata = eoq / 2;

      // Update data EOQ
      let [result] = await pool.query(
        `UPDATE hitung_eoq
         SET nama_bahan_baku = ?, total_kebutuhan = ?, biaya_pemesanan = ?, biaya_penyimpanan = ?, eoq = ?, total_biaya = ?, rata_rata = ?
         WHERE id = ?`,
        [
          nama_bahan_baku,
          total_kebutuhan,
          biaya_pemesanan,
          biaya_penyimpanan,
          eoq,
          total_biaya,
          rata_rata,
          id,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "EOQ calculation not found!",
        });
      }

      res.status(200).json({
        status: true,
        message: "EOQ calculation updated successfully!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteEOQ: async (req, res, next) => {
    try {
      const { id } = req.params;

      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query("DELETE FROM hitung_eoq WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "EOQ calculation not found!",
        });
      }

      res.status(200).json({
        status: true,
        message: "EOQ calculation EOQ has been deleted!",
      });
    } catch (err) {
      next(err);
    }
  },
};
