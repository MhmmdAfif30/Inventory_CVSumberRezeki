import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

const EditBahanBaku = () => {
  const { kode_bahan_baku } = useParams();
  const [item, setItem] = useState({
    nama_bahan_baku: "",
    stok: "",
    harga: "",
    satuan: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const satuanEnum = ["PCS", "PACK", "KILOGRAM"];

  useEffect(() => {
    const fetchBahanBaku = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BAHAN_BAKU}/${kode_bahan_baku}`
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching bahan baku:", error);
      }
    };

    fetchBahanBaku();
  }, [kode_bahan_baku]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item.nama_bahan_baku || !item.stok || !item.harga || !item.satuan) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    // Convert stok and harga to numbers
    const stokNumber = Number(item.stok);
    const hargaNumber = Number(item.harga);

    if (isNaN(stokNumber) || isNaN(hargaNumber)) {
      setErrorMessage("Stok dan Harga harus berupa angka!");
      return;
    }

    if (stokNumber < 0 || hargaNumber < 0) {
      setErrorMessage("Stok dan Harga tidak bisa negatif!");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL_BAHAN_BAKU}/edit/${kode_bahan_baku}`,
        item
      );
      alert("Bahan Baku Updated Successfully!");
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
        <h1>Edit Bahan Baku</h1>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="kode_bahan_baku" className="form-label">
              Kode Bahan Baku
            </label>
            <input
              type="text"
              id="kode_bahan_baku"
              className="form-control"
              value={kode_bahan_baku}
              disabled
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
              value={item.nama_bahan_baku}
              onChange={(e) =>
                setItem({ ...item, nama_bahan_baku: e.target.value })
              }
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
              value={item.stok}
              onChange={(e) => setItem({ ...item, stok: e.target.value })}
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
              value={item.harga}
              onChange={(e) => setItem({ ...item, harga: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="satuan" className="form-label">
              Satuan
            </label>
            <select
              id="satuan"
              className="form-control"
              value={item.satuan}
              onChange={(e) => setItem({ ...item, satuan: e.target.value })}
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
            Update Bahan Baku
          </button>
        </form>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default EditBahanBaku;
