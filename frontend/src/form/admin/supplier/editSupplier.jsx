import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

const EditSupplier = () => {
  const { kode } = useParams();
  const [supplier, setSupplier] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    nama_bahan_baku: "",
    stok_supplier: "",
  });
  const [bahanBakuList, setBahanBakuList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_SUPPLIER}/supplier/${kode}`
        );
        setSupplier(response.data);
      } catch (err) {
        console.error("Error fetching supplier data:", err);
      }
    };

    const fetchBahanBaku = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL_BAHAN_BAKU + "/bahan-baku"
        );
        setBahanBakuList(response.data.data || []);
      } catch (err) {
        console.error("Error fetching bahan baku data:", err);
      }
    };

    fetchSupplier();
    fetchBahanBaku();
  }, [kode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !supplier.nama ||
      !supplier.email ||
      !supplier.telepon ||
      !supplier.alamat ||
      !supplier.nama_bahan_baku ||
      !supplier.stok_supplier
    ) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(supplier.email)) {
      setErrorMessage("Email tidak valid!");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL_SUPPLIER}/edit/${kode}`,
        supplier
      );
      alert("Supplier Updated Successfully!");
      navigate("/admin/supplier");
    } catch (err) {
      console.error("Error adding Supplier:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Gagal menambahkan Supplier. Coba lagi.");
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
        <h1>Edit Supplier</h1>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="kode" className="form-label">
              Kode Supplier
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
            <label htmlFor="namaSupplier" className="form-label">
              Nama Supplier
            </label>
            <input
              type="text"
              id="namaSupplier"
              className="form-control"
              value={supplier.nama}
              onChange={handleChange}
              name="nama"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Supplier
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={supplier.email}
              onChange={handleChange}
              name="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telepon" className="form-label">
              Telepon Supplier
            </label>
            <input
              type="number"
              id="telepon"
              className="form-control"
              value={supplier.telepon}
              onChange={handleChange}
              name="telepon"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">
              Alamat Supplier
            </label>
            <input
              type="text"
              id="alamat"
              className="form-control"
              value={supplier.alamat}
              onChange={handleChange}
              name="alamat"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nama_bahan_baku" className="form-label">
              Nama Bahan Baku
            </label>
            <select
              id="nama_bahan_baku"
              className="form-control"
              name="nama_bahan_baku"
              value={supplier.nama_bahan_baku}
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
            <label htmlFor="stok_supplier" className="form-label">
              Stok Supplier
            </label>
            <input
              type="number"
              id="stok_supplier"
              className="form-control"
              name="stok_supplier"
              value={supplier.stok_supplier}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Supplier
          </button>
        </form>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default EditSupplier;
