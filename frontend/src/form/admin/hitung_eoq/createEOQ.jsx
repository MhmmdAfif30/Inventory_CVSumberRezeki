import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

let CreateEOQ = () => {
  let [nama_bahan_baku, setNamaBahanBaku] = useState("");
  let [total_kebutuhan, setTotalKebutuhan] = useState("");
  let [biaya_pemesanan, setBiayaPemesanan] = useState("");
  let [biaya_penyimpanan, setBiayaPenyimpanan] = useState("");
  let [bahanBakuList, setBahanBakuList] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let fetchBahanBaku = async () => {
      try {
        let response = await axios.get(
          import.meta.env.VITE_API_URL_BAHAN_BAKU + "/bahan-baku"
        );
        console.log(response.data);
        setBahanBakuList(response.data.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchBahanBaku();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !nama_bahan_baku ||
      !total_kebutuhan ||
      !biaya_pemesanan ||
      !biaya_penyimpanan
    ) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    let newEOQ = {
      nama_bahan_baku: nama_bahan_baku,
      total_kebutuhan: total_kebutuhan,
      biaya_pemesanan: biaya_pemesanan,
      biaya_penyimpanan: biaya_penyimpanan,
    };

    try {
      await axios.post(import.meta.env.VITE_API_URL_EOQ + "/tambah", newEOQ);
      alert("Perhitungan EOQ Created Successfully!");
      navigate("/admin/economic-order-quantity");
    } catch (err) {
      console.error("Error adding EOQ:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Gagal menambahkan EOQ. Coba lagi.");
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
        <h1>Tambah EOQ</h1>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nama_bahan_baku" className="form-label">
              Nama Bahan Baku
            </label>
            <select
              id="nama_bahan_baku"
              className="form-control"
              value={nama_bahan_baku}
              onChange={(e) => setNamaBahanBaku(e.target.value)}
            >
              <option value="">Pilih Bahan Baku</option>
              {bahanBakuList.length === 0 ? (
                <option value="">Tidak ada bahan baku tersedia</option>
              ) : (
                bahanBakuList.map((bahanBaku) => (
                  <option
                    key={bahanBaku.kode_bahan_baku}
                    value={bahanBaku.nama_bahan_baku}
                  >
                    {bahanBaku.nama_bahan_baku}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="total_kebutuhan" className="form-label">
              Total Kebutuhan
            </label>
            <input
              type="number"
              id="total_kebutuhan"
              className="form-control"
              value={total_kebutuhan}
              onChange={(e) => setTotalKebutuhan(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="biaya_pemesanan" className="form-label">
              Biaya Pemesanan
            </label>
            <input
              type="number"
              id="biaya_pemesanan"
              className="form-control"
              value={biaya_pemesanan}
              onChange={(e) => setBiayaPemesanan(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="biaya_penyimpanan" className="form-label">
              Biaya Penyimpanan
            </label>
            <input
              type="number"
              id="biaya_penyimpanan"
              className="form-control"
              value={biaya_penyimpanan}
              onChange={(e) => setBiayaPenyimpanan(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Hitung EOQ
          </button>
        </form>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default CreateEOQ;
