import React from "react";
import Banner from "./Banner";
import MovieHeading from "./MovieHeading";
import {
  ScrollContainer,
} from "react-scroll-motion";
import { useScroll, useSpring,motion } from "framer-motion";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <ScrollContainer>
          <motion.div className="progress-bar" style={{ scaleX }} />
            <Banner />
      </ScrollContainer>

      <MovieHeading />
    </>
  );
};

export default Home;
