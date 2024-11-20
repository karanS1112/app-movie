import React from "react";

const SectionHeading = ({ title }) => {
  return (
    <div>
      <div className="row row-cols-12 row-cols-lg-15 g-2 g-lg-3">
        <h6>{title}</h6>
      </div>
    </div>
  );
};

export default SectionHeading;
