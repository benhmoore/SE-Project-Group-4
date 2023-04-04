import React from "react";

interface Props {
  description?: string;
}

const Spinner = ({ description = "Loading..." }: Props) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{description}</span>
      </div>
    </div>
  );
};

export default Spinner;
