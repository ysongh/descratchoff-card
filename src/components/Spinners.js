import React from 'react';

export const BorderSpinner = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status" style={{ width: "5rem", height: "5rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}