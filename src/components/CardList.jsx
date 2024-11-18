import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../commonFunction/movieApiFunction";
import {
  NowPlayingMovieDataApi,
  topRatedMovieDataApi,
  upcomingMovieDataApi,
} from "../api/movieApiList";
import {
  setNowPlaying,
  setTopRated,
  setUpcoming,
} from "../store/reducer/movieReducer";
import { MutatingDots } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const CardList = ({ category }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  // console.log("selector", selector)
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const titleCategory = category;
  // console.log(category,"category")
  console.log(titleCategory, "titleCategory");

  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

  useEffect(() => {
    fetchMovieData(
      NowPlayingMovieDataApi,
      dispatch,
      setNowPlaying,
      setLoading,
      currentPage,
      setTotalPage,
      selector?.movieSlice?.nowPlaying.results
    );
    // fetchMovieData(upcomingMovieDataApi, dispatch, setUpcoming, setLoading);
    // fetchMovieData(topRatedMovieDataApi, dispatch, setTopRated, setLoading);
  }, [currentPage]);
  console.log(currentPage, totalPage, "currentPage");
  const titleData = [
    {
      title: "Now Playing",
      data: selector?.movieSlice?.nowPlaying,
    },
    {
      title: "Up Comming",
      data: selector?.movieSlice?.upcoming,
    },
    {
      title: "Top Rated",
      data: selector?.movieSlice?.topRated,
    },
  ];
  // console.log(titleData,"titledata");
  const loadMoreMovies = () => {
    // console.log("totalPage",totalPage)
    if (currentPage != totalPage) {
      // console.log(currentPage, "currentPage");
      setCurrentPage(currentPage + 1);
    }
  };
  const matchingCategory = titleData?.find(
    (category) => category.title === titleCategory
  );


  return (
    <div className="container">
      <div className="row">
        {matchingCategory?.data?.results?.length > 0 ? (
          matchingCategory.data.results.map((movie, index) => (
            <div className="col-sm-3 p-2" key={index}>
              <InfiniteScroll
                // key={resultIndex}
                dataLength={matchingCategory.data.results.length}
                next={loadMoreMovies}
                hasMore={true}
                // style={{ overflow: "visible" }}
                loader={
                  <div className="text-center mt-3">
                    {/* <MutatingDots
                          visible={true}
                          height="80"
                          width="80"
                          color="#fd7e14"
                          secondaryColor="#ffc107"
                          radius="12.5"
                          ariaLabel="mutating-dots-loading"
                        /> */}
                  </div>
                }
              >
                <div className="card">
                  <div className="card-body">
                    <img
                      src={
                        movie.poster_path
                          ? `${imageUri}${movie.poster_path}`
                          : "./images/404-img.jpg"
                      }
                      className="card-img-top home-movie-img-size"
                      alt={
                        movie.poster_path
                          ? "Movie poster"
                          : "Image not available"
                      }
                    />
                    <h6 className="text-truncate">{movie.title}</h6>
                  </div>
                </div>
              </InfiniteScroll>
            </div>
          ))
        ) : (
          <div className="container">
            <h4>No data available</h4>
          </div>
        )}
      </div>
    </div>
  );

  // if(category?.data?.results)
  // return (
  //   <div className="container min-vh-100 p-0 mt-4 mb-4">
  //     {loading ? (
  //       <div className="container">
  //         <MutatingDots
  //           visible={true}
  //           height="100"
  //           width="100"
  //           color="#fd7e14"
  //           secondaryColor="#ffc107"
  //           radius="12.5"
  //           ariaLabel="mutating-dots-loading"
  //           wrapperStyle={{}}
  //           wrapperClass="text-center-loader"
  //         />
  //       </div>
  //     ) : (
  //       <div className="row">
  //         {titleData?.map((category, categoryIndex) =>
  //           category.title == titleCategory ? (
  //             category?.data?.results?.map((result, resultIndex) => (
  //               <div key={category.title} className="col-sm-3 p-2">
  //                 <InfiniteScroll
  //                   key={resultIndex}
  //                   dataLength={category.data?.total_results}
  //                   next={loadMoreMovies}
  //                   hasMore={true}
  //                   // style={{ overflow: "visible" }}
  //                   loader={
  //                     <div className="text-center mt-3">
  //                       {/* <MutatingDots
  //                         visible={true}
  //                         height="80"
  //                         width="80"
  //                         color="#fd7e14"
  //                         secondaryColor="#ffc107"
  //                         radius="12.5"
  //                         ariaLabel="mutating-dots-loading"
  //                       /> */}
  //                     </div>
  //                   }
  //                 >
  //                   <div className="card">
  //                     <div className="card-body">
  //                       <img
  //                         src={
  //                           result.poster_path
  //                             ? `${imageUri}${result.poster_path}`
  //                             : "./images/404-img.jpg"
  //                         }
  //                         className="card-img-top home-movie-img-size"
  //                         alt={
  //                           result.poster_path
  //                             ? "Movie poster"
  //                             : "Image not available"
  //                         }
  //                       />
  //                       <h6 className="card-title">{result.title}</h6>
  //                       <ul className="list-group list-group-flush">
  //                         <li className="list-group-item"></li>
  //                       </ul>
  //                     </div>
  //                   </div>
  //                 </InfiniteScroll>
  //               </div>
  //             ))
  //           ) : (
  //             <div className="card-list-nodata text-center">
  //               {/* <h5> No Data </h5> */}
  //               <button onClick={loadMoreMovies}>ho</button>
  //             </div>
  //           )
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default CardList;
