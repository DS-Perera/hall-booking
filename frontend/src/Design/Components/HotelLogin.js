import React, { useState } from "react";

const HotelLogin = ({ onLoginSuccess }) => {
  const [hotelId, setHotelId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "HotelId") {
      setHotelId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotelId || !password) {
      setMessage("Hotel ID and password are required.");
      return;
    }

    const loginData = { HotelId: hotelId, password };

    try {
      const response = await fetch("http://localhost:5011/hotelLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Login successful!");

        // Store hotel ID in localStorage
        localStorage.setItem("HotelId", hotelId);

        onLoginSuccess(); // Call parent function to update state
      } else {
        setMessage(result.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Hotel Login</h2>

            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Hotel ID</label>
                <input
                  type="text"
                  name="HotelId"
                  className="form-control"
                  value={hotelId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelLogin;
