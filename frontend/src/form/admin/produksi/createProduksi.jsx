import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

const CreateProduksi = () => {
  const generateKodeProduksi = () => {
    const characters = "0123456789";
    let result = "";
    const max_length = 8;
    for (let i = 0; i < max_length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const [kodeProduksi, setKodeProduksi] = useState(generateKodeProduksi());
  const [namaProduksi, setNamaProduksi] = useState("");
  const [biayaProduksi, setBiayaProduksi] = useState("");
  const [tglProduksi, setTglProduksi] = useState("");
  const [deadlineProduksi, setDeadlineProduksi] = useState("");
  const [waktuProduksi, setWaktuProduksi] = useState("");

  const navigate = useNavigate();

  const calculateWaktuProduksi = () => {
    if (tglProduksi && deadlineProduksi) {
      const tglProduksiDate = new Date(tglProduksi);
      const deadlineProduksiDate = new Date(deadlineProduksi);
      const selisihHari =
        (deadlineProduksiDate - tglProduksiDate) / (1000 * 60 * 60 * 24);
      setWaktuProduksi(selisihHari >= 0 ? selisihHari : 0); // Pastikan hasilnya tidak negatif
    } else {
      setWaktuProduksi("");
    }
  };

  useEffect(() => {
    calculateWaktuProduksi();
  }, [tglProduksi, deadlineProduksi]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(tglProduksi) > new Date(deadlineProduksi)) {
      alert(
        "Tanggal Produksi harus lebih kecil atau sama dengan Deadline Produksi."
      );
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL_PRODUKSI + "/tambah", {
        kode_produksi: kodeProduksi,
        nama_produksi: namaProduksi,
        biaya_produksi: parseFloat(biayaProduksi),
        tgl_produksi: tglProduksi,
        deadline_produksi: deadlineProduksi,
        waktu_produksi: waktuProduksi,
      });
      alert("Produksi Created Successfully!");
      navigate("/admin/produksi");
    } catch (err) {
      console.error(
        "Error creating produksi:",
        err.response?.data || err.message
      );
      alert(
        "Gagal menambahkan produksi baru. Mohon cek kembali data yang diinput."
      );
    }
  };

  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <h1>Tambah Produksi Baru</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="mb-3">
            <label htmlFor="kodeProduksi" className="form-label">
              Kode Produksi
            </label>
            <input
              type="text"
              className="form-control"
              id="kodeProduksi"
              value={kodeProduksi}
              onChange={(e) => setKodeProduksi(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="namaProduksi" className="form-label">
              Nama Produksi
            </label>
            <input
              type="text"
              className="form-control"
              id="namaProduksi"
              value={namaProduksi}
              onChange={(e) => setNamaProduksi(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="biayaProduksi" className="form-label">
              Biaya Produksi (IDR)
            </label>
            <input
              type="number"
              className="form-control"
              id="biayaProduksi"
              value={biayaProduksi}
              onChange={(e) => setBiayaProduksi(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tglProduksi" className="form-label">
              Tanggal Produksi
            </label>
            <input
              type="date"
              className="form-control"
              id="tglProduksi"
              value={tglProduksi}
              onChange={(e) => setTglProduksi(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deadlineProduksi" className="form-label">
              Deadline Produksi
            </label>
            <input
              type="date"
              className="form-control"
              id="deadlineProduksi"
              value={deadlineProduksi}
              onChange={(e) => setDeadlineProduksi(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="waktuProduksi" className="form-label">
              Waktu Produksi (Hari)
            </label>
            <input
              type="text"
              className="form-control"
              id="waktuProduksi"
              value={waktuProduksi}
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default CreateProduksi;
