import React from "react";
import SectionHeading from "./SectionHeading";
import HomeCards from "./HomeCards";

const MovieHeading = () => {
  const titleData = [
    {
      title: "Now Playing",
    },

    {
      title: "Up Comming",
    },
    {
      title: "Top Rated",
    },
    {
        title: "Popular",
      },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {titleData.map((data) => (
            <>
              <SectionHeading title={data.title} />
              <HomeCards />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieHeading;
