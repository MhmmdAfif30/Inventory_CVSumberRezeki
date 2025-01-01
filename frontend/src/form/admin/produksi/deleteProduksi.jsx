import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteProduksi = () => {
  const { kode_produksi } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteProduksi = async () => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL_PRODUKSI}/delete/${kode_produksi}`
        );
        alert("Produksi Has Deleted")
        navigate("/admin/produksi");
      } catch (err) {
        console.error("Error deleting produksi:", err);
      }
    };

    deleteProduksi();
  }, [kode_produksi, navigate]);

  return null;
};

export default DeleteProduksi;
