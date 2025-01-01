import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";
import { FaEdit, FaTrashAlt, FaSearchPlus } from "react-icons/fa";

const IndexPembelian = () => {
  const [pembelian, setPembelian] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPembelian = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL_PEMBELIAN + "/pembelian"
        );
        setPembelian(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchPembelian();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPembelian = pembelian.filter((item) =>
    item.no_pembelian.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1>Daftar Pembelian</h1>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Link
            to="/admin/pembelian/tambah"
            className="btn btn-primary d-flex align-items-center btn-tambah"
          >
            <i className="bi bi-plus-circle"></i> Tambah Pembelian
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
              <th>No Pembelian</th>
              <th>Nama Supplier</th>
              <th>Tanggal Pembelian</th>
              <th>Nama Petugas</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPembelian.map((item) => (
              <tr key={item.id}>
                <td>{item.no_pembelian}</td>
                <td>{item.nama_supplier}</td>
                <td>{item.tgl_pembelian}</td>
                <td>{item.nama_petugas}</td>
                <td>
                  {/* Edit and Delete Buttons */}
                  <div className="d-flex">
                  <Link
                      to={`/admin/pembelian/detail-pembelian/${item.no_pembelian}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      <FaSearchPlus /> Detail
                    </Link>
                    <Link
                      to={`/admin/pembelian/edit/${item.no_pembelian}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <Link
                      to={`/admin/pembelian/delete/${item.no_pembelian}`}
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

export default IndexPembelian;
