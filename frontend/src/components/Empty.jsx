import React from "react";

const Empty = ({ message = "No products found." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="Empty state"
        style={{ width: 80, marginBottom: 16 }}
      />
      <p className="mb-0">{message}</p>
    </div>
  );
};

export default Empty;
