import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteSupplier = () => {
  const { kode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteSupplier = async () => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL_SUPPLIER}/delete/${kode}`
        );
        alert("Supplier Has Deleted");
        navigate("/admin/supplier");
      } catch (err) {
        console.error("Error deleting supplier:", err);
      }
    };

    deleteSupplier();
  }, [kode, navigate]);

  return null;
};

export default DeleteSupplier;
