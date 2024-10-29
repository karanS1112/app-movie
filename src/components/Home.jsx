import React from "react";
import Banner from "./Banner";
import MovieHeading from "./MovieHeading";
import {
  Animator,
  batch,
  Fade,
  FadeIn,
  Move,
  MoveIn,
  MoveOut,
  ScrollContainer,
  ScrollPage,
  Sticky,
  StickyIn,
  ZoomIn,
} from "react-scroll-motion";

const Home = () => {
 
  return (
    <>
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={MoveOut(-1000, 1000)}>
            <Banner />
          </Animator>
        </ScrollPage>
      </ScrollContainer>

      <MovieHeading />
    </>
  );
};

export default Home;
