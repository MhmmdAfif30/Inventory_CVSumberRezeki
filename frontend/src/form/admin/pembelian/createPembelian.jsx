import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";

const generateNoPembelian = () => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `PO-${datePart}-${randomPart}`;
};

const CreatePembelian = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    no_pembelian: generateNoPembelian(),
    nama_supplier: "",
    tgl_pembelian: "",
    nama_petugas: "",
    details: [],
    origin_latitude: "",
    origin_longitude: "",
    destination_latitude: "",
    destination_longitude: "",
    status: "",
  });
  const [detailItem, setDetailItem] = useState({
    nama_bahan_baku: "",
    jumlah: "",
    satuan: "",
    harga: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bahanBakuList, setBahanBakuList] = useState([]);

  useEffect(() => {
    const fetchBahanBaku = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BAHAN_BAKU}/bahan-baku`
        );
        setBahanBakuList(response.data.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchBahanBaku();

    // Get current location for origin coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setForm((prev) => ({
          ...prev,
          origin_latitude: position.coords.latitude,
          origin_longitude: position.coords.longitude,
        }));
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetailItem((prev) => ({ ...prev, [name]: value }));
  };

  const addDetail = () => {
    if (
      !detailItem.nama_bahan_baku ||
      !detailItem.jumlah ||
      !detailItem.harga
    ) {
      setError("Semua field detail pembelian harus diisi.");
      return;
    }
    setForm((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        { ...detailItem, total: detailItem.jumlah * detailItem.harga },
      ],
    }));
    setDetailItem({ nama_bahan_baku: "", jumlah: "", satuan: "", harga: "" });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Prepare the payload with correct structure
      const formData = {
        no_pembelian: form.no_pembelian,
        tgl_pembelian: form.tgl_pembelian,
        nama_supplier: form.nama_supplier,
        nama_petugas: form.nama_petugas,
        detailPembelian: form.details.map(item => ({
          nama_bahan_baku: item.nama_bahan_baku,
          jumlah: item.jumlah,
          satuan: item.satuan,
          harga: item.harga,
          total: item.total,
          status: form.status // Assuming you need to send this too
        })),
        origin: {
          latitude: form.origin_latitude,
          longitude: form.origin_longitude
        },
        destination: {
          latitude: form.destination_latitude,
          longitude: form.destination_longitude
        }
      };
  
      await axios.post(import.meta.env.VITE_API_URL_PEMBELIAN + "/tambah", formData);
      navigate("/admin/pembelian");
    } catch (err) {
      console.error("Error creating pembelian:", err);
      setError("Failed to create pembelian.");
    } finally {
      setLoading(false);
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
        <h1 className="mb-4">Create Pembelian</h1>
        <form onSubmit={handleSubmit} className="card p-4 shadow">
          <div className="mb-3">
            <label htmlFor="no_pembelian" className="form-label">
              No Pembelian
            </label>
            <input
              type="text"
              className="form-control"
              id="no_pembelian"
              name="no_pembelian"
              value={form.no_pembelian}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nama_supplier" className="form-label">
              Nama Supplier
            </label>
            <input
              type="text"
              className="form-control"
              id="nama_supplier"
              name="nama_supplier"
              value={form.nama_supplier}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tgl_pembelian" className="form-label">
              Tanggal Pembelian
            </label>
            <input
              type="date"
              className="form-control"
              id="tgl_pembelian"
              name="tgl_pembelian"
              value={form.tgl_pembelian}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nama_petugas" className="form-label">
              Nama Petugas
            </label>
            <input
              type="text"
              className="form-control"
              id="nama_petugas"
              name="nama_petugas"
              value={form.nama_petugas}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Status Pengiriman */}
          <div className="mb-3">
            <label htmlFor="status_pengiriman" className="form-label">
              Status Pengiriman
            </label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={form.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Status Pengiriman</option>
              <option value="dikirim">Dikirim</option>
              <option value="tiba">Tiba</option>
            </select>
          </div>
          {/* Origin Coordinates */}
          <div className="mb-3">
            <label htmlFor="origin_latitude" className="form-label">
              Origin Latitude
            </label>
            <input
              type="text"
              className="form-control"
              id="origin_latitude"
              name="origin_latitude"
              value={form.origin_latitude}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="origin_longitude" className="form-label">
              Origin Longitude
            </label>
            <input
              type="text"
              className="form-control"
              id="origin_longitude"
              name="origin_longitude"
              value={form.origin_longitude}
              readOnly
            />
          </div>
          {/* Destination Coordinates */}
          <div className="mb-3">
            <label htmlFor="destination_latitude" className="form-label">
              Destination Latitude
            </label>
            <input
              type="text"
              className="form-control"
              id="destination_latitude"
              name="destination_latitude"
              value={form.destination_latitude}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="destination_longitude" className="form-label">
              Destination Longitude
            </label>
            <input
              type="text"
              className="form-control"
              id="destination_longitude"
              name="destination_longitude"
              value={form.destination_longitude}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Continue the rest of the form */}
          <div className="mb-3">
            <label className="form-label">Detail Pembelian</label>
            <div className="input-group mb-2">
              <select
                name="nama_bahan_baku"
                className="form-control"
                value={detailItem.nama_bahan_baku}
                onChange={handleDetailChange}
              >
                <option value="">Pilih Bahan Baku</option>
                {bahanBakuList.map((bahanBaku) => (
                  <option
                    key={bahanBaku.kode_bahan_baku}
                    value={bahanBaku.nama_bahan_baku}
                  >
                    {bahanBaku.nama_bahan_baku}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="form-control"
                placeholder="Jumlah"
                name="jumlah"
                value={detailItem.jumlah}
                onChange={handleDetailChange}
              />
              <select
                name="satuan"
                className="form-control"
                value={detailItem.satuan}
                onChange={handleDetailChange}
              >
                <option value="">Satuan</option>
                {bahanBakuList.map((bahanBaku) => (
                  <option
                    key={bahanBaku.kode_bahan_baku}
                    value={bahanBaku.satuan}
                  >
                    {bahanBaku.satuan}
                  </option>
                ))}
              </select>
              <select
                name="harga"
                className="form-control"
                value={detailItem.satuan}
                onChange={handleDetailChange}
              >
                <option value="">Harga</option>
                {bahanBakuList.map((bahanBaku) => (
                  <option
                    key={bahanBaku.kode_bahan_baku}
                    value={bahanBaku.harga}
                  >
                    {bahanBaku.harga}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-success"
                onClick={addDetail}
              >
                <BsPlusCircle /> Add
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>Nama Bahan Baku</th>
                  <th>Jumlah</th>
                  <th>Satuan</th>
                  <th>Harga</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {form.details.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nama_bahan_baku}</td>
                    <td>{item.jumlah}</td>
                    <td>{item.satuan}</td>
                    <td>{item.harga}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default CreatePembelian;
