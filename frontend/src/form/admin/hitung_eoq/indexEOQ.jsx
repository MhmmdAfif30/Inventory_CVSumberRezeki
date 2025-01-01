import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const IndexEOQ = () => {
  const [hitungEOQ, setHitungEOQ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHitungEOQ = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL_EOQ + "/economic-order-quantity"
        );
        setHitungEOQ(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchHitungEOQ();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHitungEOQ = hitungEOQ.filter((item) =>
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
        <h1>Daftar Perhitungan EOQ</h1>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Link
            to="/admin/economic-order-quantity/tambah"
            className="btn btn-primary d-flex align-items-center btn-tambah"
          >
            <i className="bi bi-plus-circle"></i> Tambah Perhitungan EOQ
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
              <th>Biaya Pemesanan</th>
              <th>Biaya Penyimpanan</th>
              <th>Economic Order Quantity</th>
              <th>Total Biaya</th>
              <th>Rata-Rata</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredHitungEOQ.map((item) => (
              <tr key={item.id}>
                <td>{item.nama_bahan_baku}</td>
                <td>{item.total_kebutuhan}</td>
                <td>{item.biaya_pemesanan}</td>
                <td>{item.biaya_penyimpanan}</td>
                <td>{item.eoq}</td>
                <td>{item.total_biaya}</td>
                <td>{item.rata_rata}</td>
                <td>
                  {/* Edit and Delete Buttons */}
                  <div className="d-flex">
                    <Link
                      to={`/admin/economic-order-quantity/edit/${item.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <Link
                      to={`/admin/economic-order-quantity/delete/${item.id}`}
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

export default IndexEOQ;
