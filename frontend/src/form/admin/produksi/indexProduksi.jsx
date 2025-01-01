import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Format the production cost to currency
const formatBiayaProduksi = (biaya) => {
  return biaya.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
};

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const IndexProduksi = () => {
  const [produksi, setProduksi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProduksi = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL_PRODUKSI + "/produksi"
        );
        setProduksi(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchProduksi();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProduksi = produksi.filter((item) =>
    item.nama_produksi.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1>Daftar Produksi</h1>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Link
            to="/admin/produksi/tambah"
            className="btn btn-primary d-flex align-items-center btn-tambah"
          >
            <i className="bi bi-plus-circle"></i> Tambah Produksi
          </Link>

          {/* Search Bar */}
          <input
            type="text"
            className="form-control btn-search"
            placeholder="Cari Produksi"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Table */}
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Kode Produksi</th>
              <th>Nama Produksi</th>
              <th>Biaya Produksi</th>
              <th>Tanggal Produksi</th>
              <th>Deadline Produksi</th>
              <th>Waktu Produksi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProduksi.map((item) => (
              <tr key={item.kode_produksi}>
                <td>{item.kode_produksi}</td>
                <td>{item.nama_produksi}</td>
                <td>{formatBiayaProduksi(item.biaya_produksi)}</td>
                <td>{formattedDate(item.tgl_produksi)}</td>
                <td>{formattedDate(item.deadline_produksi)}</td>
                <td>{item.waktu_produksi}</td>
                <td>
                  {/* Edit and Delete Buttons */}
                  <div className="d-flex">
                    <Link
                      to={`/admin/produksi/edit/${item.kode_produksi}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <Link
                      to={`/admin/produksi/delete/${item.kode_produksi}`}
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

export default IndexProduksi;
