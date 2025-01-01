import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../components/styles/Login.css";

function AuthForm() {
  const [formType, setFormType] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL_AUTH + "/login",
        { username, password, role }
      );
      console.log("Login successful:", response.data);
      setErrorMessage("");

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "supervisor") {
        navigate("/supervisor/dashboard");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.err || "An error occurred");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL_AUTH + "/register",
        {
          kode,
          nama,
          username,
          password,
          password_confirmation: passwordConfirmation,
          role,
        }
      );
      console.log("Registration successful:", response.data);
      setErrorMessage(""); 
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.response?.data?.err || "An error occurred");
    }
  };

  const toggleForm = () => {
    setFormType(formType === "login" ? "register" : "login");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{formType === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={formType === "login" ? handleLogin : handleRegister}>
          {formType === "register" && (
            <>
              <input
                type="text"
                placeholder="Kode"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {formType === "register" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          )}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="supervisor">Supervisor</option>
          </select>
          <button type="submit">
            {formType === "login" ? "Login" : "Register"}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="inline-button">
          {formType === "login" ? (
            <>
              Don't have an account?
              <inline-button
                type="button"
                onClick={toggleForm}
                className="inline-button"
              >
                Register here
              </inline-button>
            </>
          ) : (
            <>
              Already have an account?
              <inline-button
                type="button"
                onClick={toggleForm}
                className="inline-button"
              >
                Login here
              </inline-button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
