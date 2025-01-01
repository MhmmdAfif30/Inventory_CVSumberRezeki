import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const IndexJIT = () => {
  const [hitungJIT, setHitungJIT] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHitungJIT = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL_JIT + "/just-in-time"
        );
        setHitungJIT(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchHitungJIT();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHitungJIT = hitungJIT.filter((item) =>
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
        <h1>Daftar Perhitungan JIT</h1>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Link
            to="/admin/just-in-time/tambah"
            className="btn btn-primary d-flex align-items-center btn-tambah"
          >
            <i className="bi bi-plus-circle"></i> Tambah Perhitungan JIT
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
              <th>Nama Bahan Baku</th>
              <th>Total Kebutuhan</th>
              <th>Total Biaya</th>
              <th>EOQ</th>
              <th>Rata-Rata</th>
              <th>Jumlah Pengiriman</th>
              <th>Kuantitas Pesan</th>
              <th>Pesanan Optimal</th>
              <th>Frekuensi Pembelian</th>
              <th>JIT</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredHitungJIT.map((item) => (
              <tr key={item.id}>
                <td>{item.nama_bahan_baku}</td>
                <td>{item.total_kebutuhan}</td>
                <td>{item.total_biaya}</td>
                <td>{item.eoq}</td>
                <td>{item.rata_rata}</td>
                <td>{item.jumlah_pengiriman}</td>
                <td>{item.kuantitas_pesan}</td>
                <td>{item.pesanan_optimal}</td>
                <td>{item.frekuensi_pembelian}</td>
                <td>{item.jit}</td>
                <td>
                  {/* Edit and Delete Buttons */}
                  <div className="d-flex">
                    <Link
                      to={`/admin/just-in-time/edit/${item.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <Link
                      to={`/admin/just-in-time/delete/${item.id}`}
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

export default IndexJIT;
