import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

let EditJIT = () => {
  let { id } = useParams();
  let [jit, setJIT] = useState({
    nama_bahan_baku: "",
    total_kebutuhan: "",
    total_biaya: "",
    eoq: "",
    rata_rata: "",
  });
  let [bahanBakuList, setBahanBakuList] = useState([]);
  let [eoqList, setEOQList] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let fetchJIT = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL_JIT}/just-in-time/${id}`
        );
        setJIT(response.data);
      } catch (err) {
        console.error("Error fetching JIT data:", err);
      }
    };

    let fetchBahanBaku = async () => {
      try {
        let response = await axios.get(
          import.meta.env.VITE_API_URL_BAHAN_BAKU + "/bahan-baku"
        );
        setBahanBakuList(response.data.data || []);
      } catch (err) {
        console.error("Error fetching bahan baku data:", err);
      }
    };
    const fetchHitungEOQ = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL_EOQ + "/economic-order-quantity"
        );
        setEOQList(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchJIT();
    fetchBahanBaku();
    fetchHitungEOQ();
  }, [id]);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setJIT((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !jit.nama_bahan_baku ||
      !jit.total_kebutuhan ||
      !jit.total_biaya ||
      !jit.eoq ||
      !jit.rata_rata
    ) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL_JIT}/edit/${id}`, jit);
      navigate("/admin/just-in-time");
      alert("Edit JIT Sucessfull!");
    } catch (err) {
      console.error("Error adding JIT:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Gagal Update JIT. Coba lagi.");
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
        <h1>Edit JIT</h1>

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
              name="nama_bahan_baku"
              value={jit.nama_bahan_baku}
              onChange={handleChange}
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
              name="total_kebutuhan"
              value={jit.total_kebutuhan}
              onChange={handleChange}
            >
              <option value="">Pilih Total Kebutuhan</option>
              {eoqList.length === 0 ? (
                <option value="">Tidak ada Total Kebutuhan tersedia</option>
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
              name="total_biaya"
              value={jit.total_biaya}
              onChange={handleChange}
            >
              <option value="">Pilih Total Biaya</option>
              {eoqList.length === 0 ? (
                <option value="">Tidak ada Total Biaya tersedia</option>
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
              name="eoq"
              value={jit.eoq}
              onChange={handleChange}
            >
              <option value="">Pilih EOQ</option>
              {eoqList.length === 0 ? (
                <option value="">Tidak ada EOQ tersedia</option>
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
              name="rata_rata"
              value={jit.rata_rata}
              onChange={handleChange}
            >
              <option value="">Pilih Rata-Rata</option>
              {eoqList.length === 0 ? (
                <option value="">Tidak ada Rata-Rata tersedia</option>
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

export default EditJIT;
