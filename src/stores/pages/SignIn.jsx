import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [value, setValue] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    signIn(v);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 420, margin: "24px auto", padding: 16, background: "#fff", borderRadius: 12, border: "1px solid #eee" }}>
        <h2 style={{ marginTop: 0 }}>Sign In / Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: 8 }}>Name or Email</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your name or email"
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #ccc", borderRadius: 8 }}
          />
          <button type="submit" style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, border: "1px solid #111", background: "#ff6a00", fontWeight: 600, cursor: "pointer" }}>
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;

