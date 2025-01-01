import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const IndexBahanBaku = () => {
  const [bahanBaku, setBahanBaku] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBahanBaku = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL_BAHAN_BAKU + "/bahan-baku"
        );
        setBahanBaku(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchBahanBaku();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBahanBaku = bahanBaku.filter((item) =>
    item.nama_bahan_baku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <h1>Daftar Bahan Baku</h1>

        {/* Button Tambah Bahan Baku */}
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Link
            to="/admin/bahan-baku/tambah"
            className="btn btn-primary d-flex align-items-center btn-tambah"
          >
            <i className="bi bi-plus-circle"></i> Tambah Bahan Baku
          </Link>

          {/* Search Bar */}
          <input
            type="text"
            className="form-control btn-search"
            placeholder="Cari Bahan Baku"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Table */}
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Kode Bahan Baku</th>
              <th>Nama Bahan Baku</th>
              <th>Stok</th>
              <th>Harga</th>
              <th>Satuan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredBahanBaku.map((item) => (
              <tr key={item.kode_bahan_baku}>
                <td>{item.kode_bahan_baku}</td>
                <td>{item.nama_bahan_baku}</td>
                <td>{item.stok}</td>
                <td>{item.harga}</td>
                <td>{item.satuan}</td>
                <td>
                  {/* Edit and Delete Buttons */}
                  <div className="d-flex">
                    <Link
                      to={`/admin/bahan-baku/edit/${item.kode_bahan_baku}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <Link
                      to={`/admin/bahan-baku/delete/${item.kode_bahan_baku}`}
                      className="btn btn-danger btn-sm"
                    >
                      <FaTrashAlt /> Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default IndexBahanBaku;
