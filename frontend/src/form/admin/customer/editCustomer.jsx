import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

const EditCustomer = () => {
  const { kode } = useParams();
  const [customer, setCustomer] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_CUSTOMER}/${kode}`
        );
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomer();
  }, [kode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !customer.nama ||
      !customer.email ||
      !customer.telepon ||
      !customer.alamat
    ) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL_CUSTOMER}/edit/${kode}`,
        customer
      );
      alert("Customer Updated Successfully!");
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
        <h1>Edit Customer</h1>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="kode" className="form-label">
              Kode Customer
            </label>
            <input
              type="text"
              id="kode"
              className="form-control"
              value={kode}
              disabled
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
              value={customer.nama}
              onChange={(e) =>
                setCustomer({ ...customer, nama: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Customer
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telepon" className="form-label">
              Telepon Customer
            </label>
            <input
              type="number"
              id="telepon"
              className="form-control"
              value={customer.telepon}
              onChange={(e) =>
                setCustomer({ ...customer, telepon: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">
              Alamat Customer
            </label>
            <input
              type="alamat"
              id="alamat"
              className="form-control"
              value={customer.alamat}
              onChange={(e) =>
                setCustomer({ ...customer, alamat: e.target.value })
              }
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            Update Customer
          </button>
        </form>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default EditCustomer;
