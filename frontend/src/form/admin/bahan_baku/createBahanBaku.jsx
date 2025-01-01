import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

const CreateBahanBaku = () => {
  const generateKodeBahanBaku = () => {
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

  const [kodeBahanBaku, setKodeBahanBaku] = useState(generateKodeBahanBaku());
  const [namaBahanBaku, setNamaBahanBaku] = useState("");
  const [stok, setStok] = useState("");
  const [harga, setHarga] = useState("");
  const [satuan, setSatuan] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Enum for satuan
  const satuanEnum = ["PCS", "PACK", "KILOGRAM"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kodeBahanBaku || !namaBahanBaku || !stok || !harga || !satuan) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    const newBahanBaku = {
      kode_bahan_baku: kodeBahanBaku,
      nama_bahan_baku: namaBahanBaku,
      stok: stok,
      harga: harga,
      satuan: satuan,
    };

    try {
      await axios.post(
        import.meta.env.VITE_API_URL_BAHAN_BAKU + "/tambah",
        newBahanBaku
      );
      alert("Bahan Baku Created Successfully!");
      navigate("/admin/bahan-baku");
    } catch (err) {
      console.error("Error adding Bahan Baku:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Gagal menambahkan Bahan Baku. Coba lagi.");
      }
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
        <h1>Tambah Bahan Baku</h1>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="kodeBahanBaku" className="form-label">
              Kode Bahan Baku
            </label>
            <input
              type="text"
              id="kodeBahanBaku"
              className="form-control"
              value={kodeBahanBaku}
              onChange={(e) => setKodeBahanBaku(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="namaBahanBaku" className="form-label">
              Nama Bahan Baku
            </label>
            <input
              type="text"
              id="namaBahanBaku"
              className="form-control"
              value={namaBahanBaku}
              onChange={(e) => setNamaBahanBaku(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="stok" className="form-label">
              Stok
            </label>
            <input
              type="number"
              id="stok"
              className="form-control"
              value={stok}
              onChange={(e) => setStok(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="harga" className="form-label">
              Harga
            </label>
            <input
              type="number"
              id="harga"
              className="form-control"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="satuan" className="form-label">
              Satuan
            </label>
            <select
              id="satuan"
              className="form-control"
              value={satuan}
              onChange={(e) => setSatuan(e.target.value)}
            >
              <option value="">Pilih Satuan</option>
              {satuanEnum.map((satuanValue) => (
                <option key={satuanValue} value={satuanValue}>
                  {satuanValue}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Tambah Bahan Baku
          </button>
        </form>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default CreateBahanBaku;
