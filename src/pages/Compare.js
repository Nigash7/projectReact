import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Compare() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.itemsToCompare;

  if (!items || items.length !== 2) {
    return (
      <div className="container mt-4">
        <h3>No items selected for comparison.</h3>
        <button className="btn btn-primary" onClick={() => navigate("/home")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Compare Items</h2>
      <div className="row">
        {items.map((item, index) => (
          <div key={index} className="col-md-6">
            <div className="card p-3 mb-3">
              <h5>Item {index + 1}</h5>
              <p><strong>Text:</strong> {item.text}</p>
              <p><strong>Date:</strong> {item.date}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

export default Compare;
