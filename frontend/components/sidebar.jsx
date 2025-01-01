import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const toggleDropdown = (section) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="sidebar bg-light p-3 border">
      <Link to="/admin/dashboard" className="nav-link d-flex align-items-center border-bottom py-2">
        <i className="bi bi-house-door me-2"></i> Dashboard
      </Link>

      {/* Master section */}
      <div className="nav-item border-bottom py-2">
        <a
          href="#"
          className="nav-link d-flex align-items-center"
          onClick={() => toggleDropdown('master')}
        >
          <i className="bi bi-box me-2"></i> Master
        </a>
        {isDropdownOpen.master && (
          <div className="dropdown ps-4">
            <Link to="/admin/bahan-baku" className="dropdown-item">
              <i className="bi bi-palette me-2"></i> Bahan Baku
            </Link>
            <Link to="/admin/produksi" className="dropdown-item">
              <i className="bi bi-tools me-2"></i> Produksi
            </Link>
            <Link to="/admin/customer" className="dropdown-item">
              <i className="bi bi-people me-2"></i> Customer
            </Link>
            <Link to="/admin/supplier" className="dropdown-item">
              <i className="bi bi-truck me-2"></i> Supplier
            </Link>
          </div>
        )}
      </div>

      {/* Perhitungan section */}
      <div className="nav-item border-bottom py-2">
        <a
          href="#"
          className="nav-link d-flex align-items-center"
          onClick={() => toggleDropdown('perhitungan')}
        >
          <i className="bi bi-calculator me-2"></i> Perhitungan
        </a>
        {isDropdownOpen.perhitungan && (
          <div className="dropdown ps-4">
            <Link to="/admin/economic-order-quantity" className="dropdown-item">
              <i className="bi bi-graph-up me-2"></i> Economic Order Quantity
            </Link>
            <Link to="/admin/just-in-time" className="dropdown-item">
              <i className="bi bi-clock me-2"></i> Just In Time
            </Link>
          </div>
        )}
      </div>

      {/* Transaksi section */}
      <div className="nav-item border-bottom py-2">
        <a
          href="#"
          className="nav-link d-flex align-items-center"
          onClick={() => toggleDropdown('transaksi')}
        >
          <i className="bi bi-receipt me-2"></i> Transaksi
        </a>
        {isDropdownOpen.transaksi && (
          <div className="dropdown ps-4">
            <Link to="/admin/pembelian" className="dropdown-item">
              <i className="bi bi-basket me-2"></i> Pembelian
            </Link>
            <Link to="/admin/pengeluaran" className="dropdown-item">
              <i className="bi bi-wallet2 me-2"></i> Pengeluaran
            </Link>
          </div>
        )}
      </div>

      {/* Settings section */}
      <div className="nav-item py-2">
        <a
          href="#"
          className="nav-link d-flex align-items-center"
          onClick={() => toggleDropdown('settings')}
        >
          <i className="bi bi-gear me-2"></i> Settings
        </a>
        {isDropdownOpen.settings && (
          <div className="dropdown ps-4">
            <Link to="/admin/profile" className="dropdown-item">
              <i className="bi bi-person me-2"></i> Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;