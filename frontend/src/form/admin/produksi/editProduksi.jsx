import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

const EditProduksi = () => {
  const { kode_produksi } = useParams();
  const [produksi, setProduksi] = useState({
    nama_produksi: "",
    biaya_produksi: "",
    tgl_produksi: "",
    deadline_produksi: "",
    waktu_produksi: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to calculate the production time
  const calculateWaktuProduksi = () => {
    if (produksi.tgl_produksi && produksi.deadline_produksi) {
      const tglProduksiDate = new Date(produksi.tgl_produksi);
      const deadlineProduksiDate = new Date(produksi.deadline_produksi);
      const selisihHari =
        (deadlineProduksiDate - tglProduksiDate) / (1000 * 60 * 60 * 24);
      setProduksi({
        ...produksi,
        waktu_produksi: selisihHari >= 0 ? selisihHari : 0, // Ensure it's not negative
      });
    } else {
      setProduksi({ ...produksi, waktu_produksi: "" });
    }
  };

  useEffect(() => {
    const fetchProduksi = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_PRODUKSI}/${kode_produksi}`
        );
        setProduksi(response.data);
      } catch (error) {
        console.error("Error fetching produksi data:", error);
      }
    };

    fetchProduksi();
  }, [kode_produksi]);

  // Recalculate production time whenever tgl_produksi or deadline_produksi changes
  useEffect(() => {
    calculateWaktuProduksi();
  }, [produksi.tgl_produksi, produksi.deadline_produksi]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !produksi.nama_produksi ||
      !produksi.biaya_produksi ||
      !produksi.tgl_produksi ||
      !produksi.deadline_produksi ||
      !produksi.waktu_produksi
    ) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL_PRODUKSI}/edit/${kode_produksi}`,
        produksi
      );
      alert("Produksi Updated Successfully!");
      navigate("/admin/produksi");
    } catch (err) {
      console.error("Error updating produksi data:", err);
      setErrorMessage("Gagal mengupdate data produksi. Coba lagi.");
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
        <h1>Edit Produksi</h1>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="kodeProduksi" className="form-label">
              Kode Produksi
            </label>
            <input
              type="text"
              id="kodeProduksi"
              className="form-control"
              value={kode_produksi}
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="namaProduksi" className="form-label">
              Nama Produksi
            </label>
            <input
              type="text"
              id="namaProduksi"
              className="form-control"
              value={produksi.nama_produksi}
              onChange={(e) =>
                setProduksi({ ...produksi, nama_produksi: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="biayaProduksi" className="form-label">
              Biaya Produksi
            </label>
            <input
              type="number"
              id="biayaProduksi"
              className="form-control"
              value={produksi.biaya_produksi}
              onChange={(e) =>
                setProduksi({ ...produksi, biaya_produksi: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tglProduksi" className="form-label">
              Tanggal Produksi
            </label>
            <input
              type="date"
              id="tglProduksi"
              className="form-control"
              value={produksi.tgl_produksi}
              onChange={(e) =>
                setProduksi({ ...produksi, tgl_produksi: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="deadlineProduksi" className="form-label">
              Deadline Produksi
            </label>
            <input
              type="date"
              id="deadlineProduksi"
              className="form-control"
              value={produksi.deadline_produksi}
              onChange={(e) =>
                setProduksi({ ...produksi, deadline_produksi: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="waktuProduksi" className="form-label">
              Waktu Produksi (Hari)
            </label>
            <input
              type="number"
              id="waktuProduksi"
              className="form-control"
              value={produksi.waktu_produksi}
              onChange={(e) =>
                setProduksi({ ...produksi, waktu_produksi: e.target.value })
              }
              readOnly
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Produksi
          </button>
        </form>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default EditProduksi;
