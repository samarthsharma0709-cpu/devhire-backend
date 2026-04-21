import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";

function App() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
  <div style={{
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
  }}>
    <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>DevHire</h1>

    {token ? (
      <>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "white",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

        <Jobs />
      </>
    ) : (
      <>
        <Register />
        <Login />
      </>
    )}
  </div>
);
}

export default App;