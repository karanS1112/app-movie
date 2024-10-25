import React from "react";

const HomeCards = () => {
    const movieData = [
        {
            title: "Dead pool",
            img: "https://img.freepik.com/free-photo/collage-about-movie-time-with-popcorn_23-2149946322.jpg?t=st=1729843765~exp=1729847365~hmac=6f9ba67ab9132b72dda496cbd0538f3eace301cdd58eee66c724a82be82ac6c4&w=740",
            rating:5.4
        },

    ]
  return (
    <div class="row">
      <div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
