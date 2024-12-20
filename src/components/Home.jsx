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
        <Confetti
          numberOfPieces={100}
          drawShape={(ctx) => {
            const numBranches = 13;
            const radius = 1;

            for (let i = 0; i < numBranches; i++) {
              const angle = ((Math.PI * 2) / numBranches) * i;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(x, y);

              const branchLength = radius / 2;
              const offset = Math.PI / 8;
              const x1 = Math.cos(angle - offset) * branchLength;
              const y1 = Math.sin(angle - offset) * branchLength;
              const x2 = Math.cos(angle + offset) * branchLength;
              const y2 = Math.sin(angle + offset) * branchLength;

              ctx.moveTo(x, y);
              ctx.lineTo(x1, y1);
              ctx.moveTo(x, y);
              ctx.lineTo(x2, y2);

              ctx.strokeStyle = "#FFFFFF";
              ctx.lineWidth = 1.5;
              ctx.stroke();
              ctx.closePath();
            }
          }}
        />
        <Confetti
          numberOfPieces={10}
          drawShape={(ctx) => {
            ctx.beginPath();
            ctx.moveTo(0, -5);
            ctx.lineTo(8, 10);
            ctx.lineTo(-1, 10);
            ctx.closePath();
            ctx.fillStyle = "red";
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-1, 10);
            ctx.lineTo(8, 10);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(0, -12, 3, 0, Math.PI * 2, true);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
          }}
        />

        <Banner />
      </ScrollContainer>

      <MovieHeading />
    </>
  );
};

export default Home;
