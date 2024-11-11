import React from "react";

const SectionHeading = ({ title }) => {
  return (
    <div>
      <div className="row row-cols-12 row-cols-lg-15 g-2 g-lg-3">
        <h4 >{title}</h4>
      </div>
    </div>
  );
};

export default SectionHeading;
