import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://devhire-backend-xe8h.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (err) {
  console.log("ERROR:", err);
  console.log("DATA:", err.response?.data);
  alert(err.response?.data?.msg || "Failed");
}
  };

  return (
    <div style={{ marginBottom: "20px" }}>
  <h2>Login</h2>

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
    onClick={handleLogin}
    style={{
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      background: "#3b82f6",
      color: "white",
      cursor: "pointer"
    }}
  >
    Login
  </button>
</div>
  );
}

export default Login;