import React, { useEffect, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`about-page ${isVisible ? 'fade-in' : ''}`}>
      <h1 className="title">About Us</h1>
      <div className="row">
        <div className={`col left ${isVisible ? 'slide-in-left' : ''}`}>
          <img
            src="./images/about.jpg"
            alt="About Us"
            className="about-image"
          />
        </div>

        <div className={`col right ${isVisible ? 'slide-in-right' : ''}`}>
          <div className="content">
            <p className="description">
              Welcome to our Movie App! Dive into the world of entertainment with a vast collection of movies, TV shows, and exclusive content.
            </p>
            <p className="description">
              Whether you are a fan of action-packed blockbusters, heartwarming dramas, or mind-bending thrillers, we have something for everyone.
            </p>
            <p className="description">
              Enjoy seamless streaming and stay updated with our curated movie lists, reviews, and ratings.
            </p>
            <div className="credit">
              <p>
                Made with ❤️ by <strong>Sukhwinder Singh</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
