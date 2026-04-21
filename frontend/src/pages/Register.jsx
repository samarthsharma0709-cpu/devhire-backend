import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("https://devhire-backend-xe8h.onrender.com//api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully");
    } catch (err) {
  console.log(err.response?.data);
  alert(err.response?.data?.msg || "Registration failed");
}
  };

  return (
    <div style={{ marginBottom: "20px" }}>
  <h2>Register</h2>

  <input
    placeholder="name"
    style={{
      padding: "8px",
      margin: "5px",
      borderRadius: "6px",
      border: "none"
    }}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    placeholder="email"
    style={{
      padding: "8px",
      margin: "5px",
      borderRadius: "6px",
      border: "none"
    }}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    placeholder="password"
    style={{
      padding: "8px",
      margin: "5px",
      borderRadius: "6px",
      border: "none"
    }}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    onClick={handleRegister}
    style={{
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      background: "#3b82f6",
      color: "white",
      cursor: "pointer"
    }}
  >
    Register
  </button>
</div>
  );
}

export default Register;