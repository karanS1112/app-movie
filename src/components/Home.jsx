import React from "react";
import Banner from "./Banner";
import MovieHeading from "./MovieHeading";
import Confetti from "react-confetti";
import { ScrollContainer } from "react-scroll-motion";
import { useScroll, useSpring, motion } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const { width, height } = useWindowSize();
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
