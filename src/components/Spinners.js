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

export const ButtonSpinner = () => {
  return (
    <button className="btn btn-primary" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Pending...
    </button>
  )
}