import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import Footer from "../../../../components/footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "leaflet/dist/leaflet.css";

// Icon custom untuk marker
const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [30, 45], // slightly larger for better visibility
  iconAnchor: [15, 45],
});

const StatusPembelian = () => {
  let { no_pembelian } = useParams();
  let navigate = useNavigate(); // Hook for navigation
  let [pembelian, setPembelian] = useState(null);
  let [detail, setDetail] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);
  let [distance, setDistance] = useState(0);
  let [travelTime, setTravelTime] = useState("");
  let [mapVisible, setMapVisible] = useState(false); // State for controlling map visibility

  const [origin, setOrigin] = useState({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ lat: 0, lng: 0 });

  const calculateDistance = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLng = toRad(coord2.lng - coord1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coord1.lat)) *
        Math.cos(toRad(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const calculateTravelTime = (distance) => {
    const avgSpeed = 40; // Speed in km/h, can be adjusted based on terrain or road type
    const timeInHours = distance / avgSpeed;

    // Breaking the time into hours and minutes
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours % 1) * 60);

    return `${hours} jam ${minutes} menit`;
  };

  useEffect(() => {
    const fetchDetailPembelian = async () => {
      try {
        let response = await axios.get(
          `${
            import.meta.env.VITE_API_URL_PEMBELIAN
          }/status-pembelian/${no_pembelian}`
        );
        let { pembelian, detail, origin, destination } = response.data.data;
        setPembelian(pembelian);
        setDetail(detail);
        setOrigin({ lat: origin.latitude, lng: origin.longitude });
        setDestination({
          lat: destination.latitude,
          lng: destination.longitude,
        });

        const dist = calculateDistance(
          { lat: origin.latitude, lng: origin.longitude },
          { lat: destination.latitude, lng: destination.longitude }
        );
        setDistance(dist.toFixed(2));
        const travelTime = calculateTravelTime(dist);
        setTravelTime(travelTime);
      } catch (err) {
        console.error("Error fetching detail pembelian:", err);
        setError("Failed to fetch detail pembelian data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailPembelian();
  }, [no_pembelian]);

  const toggleMap = () => {
    setMapVisible(!mapVisible);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
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
        <h2 className="mb-4 text-primary" style={{ textAlign: "left" }}>
          Status Pembelian
        </h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-sm border-primary">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  <i className="bi bi-receipt"></i> Nomor Pembelian
                </h5>
                <p className="card-text text-muted">{no_pembelian}</p>
                <hr />
                <h6 className="text-info">
                  <i className="bi bi-geo-alt"></i> Jarak Lokasi Pengiriman
                </h6>
                <p className="text-dark">{distance} km</p>
                <h6 className="text-info">
                  <i className="bi bi-clock"></i> Estimasi Waktu Perjalanan
                </h6>
                <p className="text-dark">{travelTime}</p>
                <button className="btn btn-primary mt-3" onClick={toggleMap}>
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Add your purchase details table here */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-basket"></i> Detail Pembelian
                </h5>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Nama Bahan Baku</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Satuan</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.nama_bahan_baku}</td>
                          <td>{item.jumlah}</td>
                          <td>{item.harga}</td>
                          <td>{item.satuan}</td>
                          <td>{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            {mapVisible && (
              <MapContainer
                center={[origin.lat, origin.lng]}
                zoom={6}
                style={{
                  height: "400px",
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[origin.lat, origin.lng]} icon={defaultIcon}>
                  <Popup>Origin Location</Popup>
                </Marker>
                <Marker
                  position={[destination.lat, destination.lng]}
                  icon={defaultIcon}
                >
                  <Popup>Destination Location</Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatusPembelian;
