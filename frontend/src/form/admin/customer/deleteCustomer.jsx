import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteCustomer = () => {
  const { kode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteBahanBaku = async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL_CUSTOMER}/delete/${kode}`);
        alert("Customer Has Deleted")
        navigate('/admin/customer');
      } catch (err) {
        console.error('Error deleting customer:', err);
      }
    };

    deleteBahanBaku();
  }, [kode, navigate]);

  return null;
};

export default DeleteCustomer;
