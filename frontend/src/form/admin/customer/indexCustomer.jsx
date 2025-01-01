import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../components/styles/App.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const IndexCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL_CUSTOMER + "/customer"
        );
        setCustomer(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchCustomer();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomer = customer.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1>Daftar Customer</h1>

        {/* Button Tambah */}
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Link
            to="/admin/customer/tambah"
            className="btn btn-primary d-flex align-items-center btn-tambah"
          >
            <i className="bi bi-plus-circle"></i> Tambah Customer
          </Link>

          {/* Search Bar */}
          <input
            type="text"
            className="form-control btn-search"
            placeholder="Cari Customer"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Table */}
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Kode Customer</th>
              <th>Nama Customer</th>
              <th>Email Customer</th>
              <th>Telepon Customer</th>
              <th>Alamat Customer</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomer.map((item) => (
              <tr key={item.kode}>
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.telepon}</td>
                <td>{item.alamat}</td>
                <td>
                  {/* Edit and Delete Buttons */}
                  <div className="d-flex">
                    <Link
                      to={`/admin/customer/edit/${item.kode}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <Link
                      to={`/admin/customer/delete/${item.kode}`}
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

export default IndexCustomer;
