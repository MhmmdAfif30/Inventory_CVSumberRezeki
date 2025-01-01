import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

const CreateCustomer = () => {
  const generateKodeCustomer = () => {
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

  const [kodeCustomer, setKodeCustomer] = useState(generateKodeCustomer());
  const [namaCustomer, setNamaCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setHarga] = useState("");
  const [alamat, setAlamat] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kodeCustomer || !namaCustomer || !email || !telepon || !alamat) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    const newCustomer = {
      kode: kodeCustomer,
      nama: namaCustomer,
      email: email,
      telepon: telepon,
      alamat: alamat,
    };

    try {
      await axios.post(
        import.meta.env.VITE_API_URL_CUSTOMER + "/tambah",
        newCustomer
      );
      alert("Customer Created Successfully!");
      navigate("/admin/customer");
    } catch (err) {
      console.error("Error adding Customer:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Gagal menambahkan Customer. Coba lagi.");
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
        <h1>Tambah Customer</h1>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="kodeCustomer" className="form-label">
              Kode Customer
            </label>
            <input
              type="text"
              id="kodeCustomer"
              className="form-control"
              value={kodeCustomer}
              onChange={(e) => setKodeCustomer(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="namaCustomer" className="form-label">
              Nama Customer
            </label>
            <input
              type="text"
              id="namaCustomer"
              className="form-control"
              value={namaCustomer}
              onChange={(e) => setNamaCustomer(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telepon" className="form-label">
              Telepon
            </label>
            <input
              type="number"
              id="telepon"
              className="form-control"
              value={telepon}
              onChange={(e) => setHarga(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">
              Alamat
            </label>
            <input
              type="alamat"
              id="alamat"
              className="form-control"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            Tambah Customer
          </button>
        </form>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default CreateCustomer;
