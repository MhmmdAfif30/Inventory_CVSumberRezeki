let mysql2 = require("mysql2/promise");
require("dotenv").config();

module.exports = {
  indexJIT: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query("SELECT * FROM just_in_time");
      res.status(200).json({
        status: true,
        message: "OK!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  createJIT: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let { nama_bahan_baku, total_kebutuhan, total_biaya, eoq, rata_rata } =
        req.body;

      let jumlah_pengiriman = Math.pow(eoq / (2 * rata_rata), 2);
      let kuantitas_pesan = Math.sqrt(jumlah_pengiriman * eoq);
      let pesanan_optimal = kuantitas_pesan / jumlah_pengiriman;
      let frekuensi_pembelian = total_kebutuhan / kuantitas_pesan;
      let jit = (1 / Math.sqrt(frekuensi_pembelian)) * total_biaya;

      let [result] = await pool.query(
        "INSERT INTO just_in_time (nama_bahan_baku, total_kebutuhan, total_biaya, eoq, rata_rata, jumlah_pengiriman, kuantitas_pesan, pesanan_optimal, frekuensi_pembelian, jit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          nama_bahan_baku,
          total_kebutuhan,
          total_biaya,
          eoq,
          rata_rata,
          jumlah_pengiriman,
          kuantitas_pesan,
          pesanan_optimal,
          frekuensi_pembelian,
          jit,
        ]
      );

      res.status(200).json({
        status: true,
        message: "Data successfully created!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  editJIT: async (req, res, next) => {
    try {
      const { id } = req.params;
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let { nama_bahan_baku, total_kebutuhan, total_biaya, eoq, rata_rata } =
        req.body;

      // Validasi input
      if (
        !nama_bahan_baku ||
        !total_kebutuhan ||
        !total_biaya ||
        !eoq ||
        !rata_rata
      ) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }

      let jumlah_pengiriman = Math.pow(eoq / (2 * rata_rata), 2);
      let kuantitas_pesan = Math.sqrt(jumlah_pengiriman * eoq);
      let pesanan_optimal = kuantitas_pesan / jumlah_pengiriman;
      let frekuensi_pembelian = total_kebutuhan / kuantitas_pesan;
      let jit = (1 / Math.sqrt(frekuensi_pembelian)) * total_biaya;

      let [result] = await pool.query(
        `UPDATE just_in_time
           SET nama_bahan_baku = ?, total_kebutuhan = ?, total_biaya = ?, eoq = ?, rata_rata = ?, jumlah_pengiriman = ?, kuantitas_pesan = ?, pesanan_optimal = ?, frekuensi_pembelian = ?, jit = ?
           WHERE id = ?`,
        [
          nama_bahan_baku,
          total_kebutuhan,
          total_biaya,
          eoq,
          rata_rata,
          jumlah_pengiriman,
          kuantitas_pesan,
          pesanan_optimal,
          frekuensi_pembelian,
          jit,
          id,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "JIT calculation not found!",
        });
      }

      res.status(200).json({
        status: true,
        message: "JIT calculation updated successfully!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteJIT: async (req, res, next) => {
    try {
      const { id } = req.params;

      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [result] = await pool.query("DELETE FROM just_in_time WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: "JIT calculation not found!",
        });
      }

      res.status(200).json({
        status: true,
        message: "JIT calculation JIT has been deleted!",
      });
    } catch (err) {
      next(err);
    }
  },
};
