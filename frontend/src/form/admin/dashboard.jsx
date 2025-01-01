import "../../../components/styles/Sidebar.css";
import "../../../components/styles/App.css";

import Sidebar from "../../../components/sidebar";;
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        </div>
        <Footer />
      </div>
  );
};

export default AdminDashboard;
