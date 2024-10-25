import React from "react";

const SectionHeading = ({ title }) => {
  return (
    <div>
      <div class="row row-cols-12 row-cols-lg-15 g-2 g-lg-3">
        <h2 className="">{title}</h2>
      </div>
    </div>
  );
};

export default SectionHeading;
