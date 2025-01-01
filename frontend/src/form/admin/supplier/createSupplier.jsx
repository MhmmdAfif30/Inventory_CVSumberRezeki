import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";

let CreateSupplier = () => {
  let generateKodeSupplier = () => {
    let characters = "0123456789";
    let result = "";
    let max_length = 8;
    for (let i = 0; i < max_length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  let [kodeSupplier, setKodeSupplier] = useState(generateKodeSupplier());
  let [namaSupplier, setNamaSupplier] = useState("");
  let [email, setEmail] = useState("");
  let [telepon, setTelepon] = useState("");
  let [alamat, setAlamat] = useState("");
  let [nama_bahan_baku, setNamaBahanBaku] = useState("");
  let [bahanBakuList, setBahanBakuList] = useState([]);
  let [stok_supplier, setStokSupplier] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let fetchBahanBaku = async () => {
      try {
        let response = await axios.get(
          import.meta.env.VITE_API_URL_BAHAN_BAKU + "/bahan-baku"
        );
        console.log(response.data); // Inspect the response
        setBahanBakuList(response.data.data || []); // Ensure an array
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchBahanBaku();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !kodeSupplier ||
      !namaSupplier ||
      !email ||
      !telepon ||
      !alamat ||
      !nama_bahan_baku ||
      !stok_supplier
    ) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    let newSupplier = {
      kode: kodeSupplier,
      nama: namaSupplier,
      email: email,
      telepon: telepon,
      alamat: alamat,
      nama_bahan_baku: nama_bahan_baku,
      stok_supplier: stok_supplier,
    };

    try {
      await axios.post(
        import.meta.env.VITE_API_URL_SUPPLIER + "/tambah",
        newSupplier
      );
      alert("Supplier Created Successfully!");
      navigate("/admin/supplier");
    } catch (err) {
      console.error(
        "Error adding supplier:",
        err.response || err.message || err
      );
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
        <h1>Tambah Supplier</h1>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="kodeSupplier" className="form-label">
              Kode Supplier
            </label>
            <input
              type="text"
              id="kodeSupplier"
              className="form-control"
              value={kodeSupplier}
              onChange={(e) => setKodeSupplier(e.target.value)}
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
              value={namaSupplier}
              onChange={(e) => setNamaSupplier(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="stok" className="form-label">
              Email Supplier
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
            <label htmlFor="harga" className="form-label">
              Telepon Supplier
            </label>
            <input
              type="number"
              id="harga"
              className="form-control"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="satuan" className="form-label">
              Alamat Supplier
            </label>
            <input
              type="alamat"
              id="alamat"
              className="form-control"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="nama_bahan_baku" className="form-label">
              Nama Bahan Baku
            </label>
            <select
              type="nama_bahan_baku"
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
            <label htmlFor="satuan" className="form-label">
              Stok Supplier
            </label>
            <input
              type="stok_supplier"
              id="stok_supplier"
              className="form-control"
              value={stok_supplier}
              onChange={(e) => setStokSupplier(e.target.value)}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            Tambah Supplier
          </button>
        </form>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default CreateSupplier;
