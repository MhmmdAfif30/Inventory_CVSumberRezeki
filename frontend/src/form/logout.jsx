import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL_AUTH + "/logout"
        );
        if (response.status === 200) {
          console.log("Logout successful");
          navigate("/login");
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    logoutUser();
  }, [navigate]);

  return null;
};

export default Logout;
