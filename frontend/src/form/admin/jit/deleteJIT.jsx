import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteJIT = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const DeleteJIT = async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL_JIT}/delete/${id}`);
        alert("JIT Has Deleted")
        navigate('/admin/just-in-time');
      } catch (err) {
        console.error('Error deleting JIT:', err);
      }
    };

    DeleteJIT();
  }, [id, navigate]);

  return null;
};

export default DeleteJIT;
