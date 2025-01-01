import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BsGeoAlt } from "react-icons/bs";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";

let DetailPembelian = () => {
  let { no_pembelian } = useParams();
  let [pembelian, setPembelian] = useState(null);
  let [detail, setDetail] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchPembelian = async () => {
      try {
        let response = await axios.get(
          import.meta.env.VITE_API_URL_PEMBELIAN + "/pembelian"
        );
        setPembelian(response.data.data);
      } catch (err) {
        console.error("Error fetching pembelian:", err);
        setError("Failed to fetch pembelian data.");
      }
    };

    let fetchDetailPembelian = async () => {
      try {
        let response = await axios.get(
          `${
            import.meta.env.VITE_API_URL_PEMBELIAN
          }/detail-pembelian/${no_pembelian}`
        );
        let { pembelian, detail } = response.data.data;
        setPembelian(pembelian);
        setDetail(detail);
      } catch (err) {
        console.error("Error fetching detail pembelian:", err);
        setError("Failed to fetch detail pembelian data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPembelian();
    fetchDetailPembelian();
  }, [no_pembelian]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pembelian) {
    return <div>No Pembelian Found</div>;
  }

  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <h1 className="mb-4">Detail Pembelian</h1>
        <div className="card p-4 mb-4 shadow">
          <h4>No Pembelian: {pembelian.no_pembelian}</h4>
          <p>Nama Supplier: {pembelian.nama_supplier}</p>
          <p>Tanggal Pembelian: {pembelian.tgl_pembelian}</p>
          <p>Nama Petugas: {pembelian.nama_petugas}</p>
        </div>

        <h5 className="mb-3">Detail Barang</h5>
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Nama Bahan Baku</th>
                <th>Jumlah</th>
                <th>Satuan</th>
                <th>Harga</th>
                <th>Total</th>
                <th>Status</th>
                <th>Lacak Pesanan</th>
              </tr>
            </thead>
            <tbody>
              {detail.map((item) => (
                <tr key={item.id || item.nama_bahan_baku}>
                  <td>{item.nama_bahan_baku}</td>
                  <td>{item.jumlah}</td>
                  <td>{item.satuan}</td>
                  <td>{item.harga}</td>
                  <td>{item.total}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Available" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {/* Disable button if the status is "Tiba" or equivalent */}
                    <Link
                      to={`/admin/pembelian/status-pembelian/${item.no_pembelian}`}
                      className="btn btn-info btn-sm"
                      disabled={item.status === "TIBA"} // Disable if TIBA
                      style={{
                        pointerEvents: item.status === "TIBA" ? "none" : "auto",
                        opacity: item.status === "TIBA" ? 0.5 : 1,
                      }}
                    >
                      <BsGeoAlt /> Lacak
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default DetailPembelian;
