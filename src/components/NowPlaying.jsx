import React from "react";
import CardList from "./CardList";

const NowPlaying = () => {
  const title = "Now Playing"
  return (
    <>
    <CardList category={title}/>
    </>
   
  );
};

export default NowPlaying;
