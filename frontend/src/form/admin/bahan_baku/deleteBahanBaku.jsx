import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteBahanBaku = () => {
  const { kode_bahan_baku } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteBahanBaku = async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL_BAHAN_BAKU}/delete/${kode_bahan_baku}`);
        alert("Bahan Baku Has Deleted")
        navigate('/admin/bahan-baku');
      } catch (err) {
        console.error('Error deleting bahan baku:', err);
      }
    };

    deleteBahanBaku();
  }, [kode_bahan_baku, navigate]);

  return null;
};

export default DeleteBahanBaku;
