import React from 'react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick';
const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
      };
      const banners = [
        {
          image: "https://images.hdqwalls.com/wallpapers/the-batman-on-the-hunt-i2.jpg",
          title: "Welcome to Our Site!",
          subtitle: "Discover amazing content",
        },
        {
          image: "https://images.hdqwalls.com/wallpapers/wolverine-weapon-x-unleashed-vl.jpg",
          title: "Explore New Features",
          subtitle: "Stay updated with our latest offerings",
        },
        {
          image: "https://images.hdqwalls.com/wallpapers/pubg-helmet-guy-immortality-ao.jpg",
          title: "Join Our Community",
          subtitle: "Connect with like-minded individuals",
        },
      ];
  return (
    <div className=" banner-container p-1">
    <Slider {...settings}>
      {banners.map((banner, index) => (
        <div key={index} className="banner-slide">
          <img src={banner.image} alt={banner.title} className="banner-image" />
          <div className="banner-content">
            {/* <h2>{banner.title}</h2>
            <p>{banner.subtitle}</p> */}
          </div>
        </div>
      ))}
    </Slider>
  </div>
  )
}

export default Banner