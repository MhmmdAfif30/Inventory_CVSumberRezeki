import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteEOQ = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const DeleteEOQ = async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL_EOQ}/delete/${id}`);
        alert("EOQ Has Deleted")
        navigate('/admin/economic-order-quantity');
      } catch (err) {
        console.error('Error deleting EOQ:', err);
      }
    };

    DeleteEOQ();
  }, [id, navigate]);

  return null;
};

export default DeleteEOQ;
