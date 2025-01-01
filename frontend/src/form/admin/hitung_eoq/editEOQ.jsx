import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

let EditEOQ = () => {
  let { id } = useParams();
  let [eoq, setEOQ] = useState({
    nama_bahan_baku: "",
    total_kebutuhan: "",
    biaya_pemesanan: "",
    biaya_penyimpanan: "",
  });
  let [bahanBakuList, setBahanBakuList] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let fetchEOQ = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL_EOQ}/economic-order-quantity/${id}`
        );
        setEOQ(response.data);
      } catch (err) {
        console.error("Error fetching EOQ data:", err);
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

    fetchEOQ();
    fetchBahanBaku();
  }, [id]);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setEOQ((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !eoq.nama_bahan_baku ||
      !eoq.total_kebutuhan ||
      !eoq.biaya_pemesanan ||
      !eoq.biaya_penyimpanan
    ) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL_EOQ}/edit/${id}`, eoq);
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
        <h1>Edit EOQ</h1>

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
              value={eoq.nama_bahan_baku}
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
            <input
              type="number"
              id="total_kebutuhan"
              className="form-control"
              name="total_kebutuhan"
              value={eoq.total_kebutuhan}
              onChange={handleChange}
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
              name="biaya_pemesanan"
              value={eoq.biaya_pemesanan}
              onChange={handleChange}
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
              name="biaya_penyimpanan"
              value={eoq.biaya_penyimpanan}
              onChange={handleChange}
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

export default EditEOQ;
