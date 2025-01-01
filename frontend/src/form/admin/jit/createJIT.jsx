import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

let CreateJIT = () => {
  let [nama_bahan_baku, setNamaBahanBaku] = useState("");
  let [total_kebutuhan, setTotalKebutuhan] = useState("");
  let [total_biaya, setTotalBiaya] = useState("");
  let [eoq, setEOQ] = useState("");
  let [rata_rata, setRataRata] = useState("");
  let [bahanBakuList, setBahanBakuList] = useState([]);
  let [eoqList, setEOQList] = useState([]);
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
    let fetchHitungEOQ = async () => {
      try {
        let response = await axios.get(
          import.meta.env.VITE_API_URL_EOQ + "/economic-order-quantity"
        );
        setEOQList(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchBahanBaku();
    fetchHitungEOQ();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !nama_bahan_baku ||
      !total_kebutuhan ||
      !total_biaya ||
      !eoq ||
      !rata_rata
    ) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    let newJIT = {
      nama_bahan_baku: nama_bahan_baku,
      total_kebutuhan: total_kebutuhan,
      total_biaya: total_biaya,
      eoq: eoq,
      rata_rata: rata_rata,
    };

    try {
      await axios.post(import.meta.env.VITE_API_URL_JIT + "/tambah", newJIT);
      alert("Perhitungan JIT Created Successfully!");
      navigate("/admin/just-in-time");
    } catch (err) {
      console.error("Error adding JIT:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Gagal menambahkan JIT. Coba lagi.");
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
            <select
              id="total_kebutuhan"
              className="form-control"
              value={total_kebutuhan}
              onChange={(e) => setTotalKebutuhan(e.target.value)}
            >
              <option value="">Pilih Total Kebutuhan</option>
              {eoqList.length === 0 ? (
                <option value="">Tidak tersedia</option>
              ) : (
                eoqList.map((eoq) => (
                  <option key={eoq.id} value={eoq.total_kebutuhan}>
                    {eoq.total_kebutuhan}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="total_biaya" className="form-label">
              Total Biaya
            </label>
            <select
              id="total_biaya"
              className="form-control"
              value={total_biaya}
              onChange={(e) => setTotalBiaya(e.target.value)}
            >
              <option value="">Pilih Total Kebutuhan</option>
              {eoqList.length === 0 ? (
                <option value="">Tidak tersedia</option>
              ) : (
                eoqList.map((eoq) => (
                  <option key={eoq.id} value={eoq.total_biaya}>
                    {eoq.total_biaya}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="eoq" className="form-label">
              EOQ
            </label>
            <select
              id="eoq"
              className="form-control"
              value={eoq}
              onChange={(e) => setEOQ(e.target.value)}
            >
              <option value="">Pilih EOQ</option>
              {eoqList.length === 0 ? (
                <option value="">Tidak tersedia</option>
              ) : (
                eoqList.map((eoq) => (
                  <option key={eoq.id} value={eoq.eoq}>
                    {eoq.eoq}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="rata_rata" className="form-label">
              Rata-Rata
            </label>
            <select
              id="rata_rata"
              className="form-control"
              value={rata_rata}
              onChange={(e) => setRataRata(e.target.value)}
            >
              <option value="">Pilih EOQ</option>
              {eoqList.length === 0 ? (
                <option value="">Tidak tersedia</option>
              ) : (
                eoqList.map((eoq) => (
                  <option key={eoq.id} value={eoq.rata_rata}>
                    {eoq.rata_rata}
                  </option>
                ))
              )}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Hitung JIT
          </button>
        </form>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default CreateJIT;
