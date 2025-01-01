const bcrypt = require("bcrypt");
const mysql2 = require("mysql2/promise");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  indexPembelian: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let [pembelianResult] = await pool.query("SELECT * FROM pembelian");
      res.status(200).json({
        status: true,
        message: "OK!",
        data: pembelianResult,
      });
    } catch (err) {
      next(err);
    }
  },

  detailPembelian: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      let { no_pembelian } = req.params;

      let [pembelianResult] = await pool.query(
        "SELECT * FROM pembelian WHERE no_pembelian = ?",
        [no_pembelian]
      );

      if (pembelianResult.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Pembelian not found",
        });
      }

      let [detailResult] = await pool.query(
        "SELECT * FROM detail_pembelian WHERE no_pembelian = ? AND (status = 'dikirim' OR status = 'tiba')",
        [no_pembelian]
      );

      if (detailResult.length === 0) {
        return res.status(404).json({
          status: false,
          message:
            "Detail pembelian dengan status 'dikirim' atau 'tiba' tidak ditemukan",
        });
      }

      let [originResult] = await pool.query(
        "SELECT * FROM origin WHERE no_pembelian = ?",
        [no_pembelian]
      );

      let [destinationResult] = await pool.query(
        "SELECT * FROM destination WHERE no_pembelian = ?",
        [no_pembelian]
      );

      if (originResult.length === 0 || destinationResult.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Origin atau Destination tidak ditemukan",
        });
      }

      res.status(200).json({
        status: true,
        message: "OK!",
        data: {
          pembelian: pembelianResult[0],
          detail: detailResult,
          origin: originResult[0],
          destination: destinationResult[0],
        },
      });
    } catch (err) {
      next(err);
    }
  },

  createPembelian: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const {
        no_pembelian,
        tgl_pembelian,
        nama_supplier,
        nama_petugas,
        detailPembelian,
        origin,
        destination,
      } = req.body;

      if (
        !no_pembelian ||
        !tgl_pembelian ||
        !nama_supplier ||
        !nama_petugas ||
        !detailPembelian ||
        !origin ||
        !destination
      ) {
        return res.status(400).json({
          status: false,
          message: "Semua field harus diisi!",
        });
      }

      let [pembelianData] = await pool.query(
        "INSERT INTO pembelian (no_pembelian, tgl_pembelian, nama_supplier, nama_petugas) VALUES (?, ?, ?, ?)",
        [no_pembelian, tgl_pembelian, nama_supplier, nama_petugas]
      );

      // Insert detail pembelian and update bahan_baku table
      for (let item of detailPembelian) {
        // Insert into detail_pembelian
        await pool.query(
          "INSERT INTO detail_pembelian (no_pembelian, nama_bahan_baku, jumlah, satuan, harga, total, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            no_pembelian,
            item.nama_bahan_baku,
            item.jumlah,
            item.satuan,
            item.harga,
            item.total,
            item.status,
          ]
        );

        // Update bahan_baku table: add the purchased quantity to the existing stock
        await pool.query(
          "UPDATE bahan_baku SET stok = stok + ? WHERE nama_bahan_baku = ?",
          [item.jumlah, item.nama_bahan_baku]
        );
      }

      // Insert origin
      let { latitude: originLatitude, longitude: originLongitude } = origin;
      await pool.query(
        "INSERT INTO origin (no_pembelian, latitude, longitude) VALUES (?, ?, ?)",
        [no_pembelian, originLatitude, originLongitude]
      );

      // Insert destination
      let { latitude: destinationLatitude, longitude: destinationLongitude } =
        destination;
      await pool.query(
        "INSERT INTO destination (no_pembelian, latitude, longitude) VALUES (?, ?, ?)",
        [no_pembelian, destinationLatitude, destinationLongitude]
      );

      res.status(201).json({
        status: true,
        message: "Pembelian Telah Dibuat!",
        data: {
          pembelianData,
          detailPembelian,
          origin,
          destination,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  deletePembelian: async (req, res, next) => {
    try {
      let pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const { no_pembelian } = req.params;

      // Check if the pembelian exists
      let [pembelianResult] = await pool.query(
        "SELECT * FROM pembelian WHERE no_pembelian = ?",
        [no_pembelian]
      );

      if (pembelianResult.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Pembelian not found",
        });
      }

      // Delete related detail_pembelian entries
      await pool.query("DELETE FROM detail_pembelian WHERE no_pembelian = ?", [
        no_pembelian,
      ]);

      // Delete origin and destination entries
      await pool.query("DELETE FROM origin WHERE no_pembelian = ?", [
        no_pembelian,
      ]);

      await pool.query("DELETE FROM destination WHERE no_pembelian = ?", [
        no_pembelian,
      ]);

      // Delete the pembelian entry itself
      await pool.query("DELETE FROM pembelian WHERE no_pembelian = ?", [
        no_pembelian,
      ]);

      res.status(200).json({
        status: true,
        message: "Pembelian telah dihapus!",
      });
    } catch (err) {
      next(err);
    }
  },
};
