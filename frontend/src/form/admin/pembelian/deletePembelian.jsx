import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeletePembelian = () => {
  const { no_pembelian } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const DeletePembelian = async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL_PEMBELIAN}/delete/${no_pembelian}`);
        alert("Pembelian Has Deleted")
        navigate('/admin/pembelian');
      } catch (err) {
        console.error('Error deleting Pembelian:', err);
      }
    };

    DeletePembelian();
  }, [no_pembelian, navigate]);

  return null;
};

export default DeletePembelian;
