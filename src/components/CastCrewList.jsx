import React, { useEffect } from "react";
import { fetchCastCrewData } from "../commonFunction/movieApiFunction";
import { castCrewMovie } from "../api/movieApiList";
import { setCastCrew } from "../store/reducer/movieReducer";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function CastCrewList() {
  const param = useParams();
  const id = param.id;
  console.log(id, "idd's");

  const castCrewList = useSelector((state) => state.movieSlice.castCrew);
  console.log(castCrewList, "castCrewList");
  //   console.log(castCrewData, "castCrewData");
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCastCrewData(castCrewMovie, setCastCrew, dispatch, id);
  }, []);

  return (
    <div className="container min-vh-100">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h4>Cast</h4>
          <div className="row">
            {castCrewList?.cast?.length > 0 ? (
              castCrewList?.cast.map((item) => (
                <div className="col-md-6" key={item.id}>
                  <div className="card">
                    <Link
                      style={{ textDecorationColor: "transparent" }}
                      to={`/movie/cast-crew-detail/${item.id}`}
                    >
                      <img
                        src={
                          item.profile_path
                            ? `${imageUri}${item.profile_path}`
                            : "./images/404-img.jpg"
                        }
                        alt={item.name}
                      />
                      <div className="card-body text-center">
                        <h5 className="text-truncate text-black">
                          {item.name}
                        </h5>
                        <p className="text-truncate text-black-50">
                          {item.character}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-md-6">
                <p>No Data Found</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <h4>crew</h4>
          <div className="row">
            {castCrewList?.crew?.length > 0 ? (
              castCrewList?.crew.map((crew) => (
                <div className="col-md-6" key={crew.id}>
                  <div className="card">
                    <Link
                      style={{ textDecorationColor: "transparent" }}
                      to={`/movie/cast-crew-detail/${crew.id}`}
                    >
                      <img
                        src={
                          crew.profile_path
                            ? `${imageUri}${crew.profile_path}`
                            : "http://localhost:5173/images/404-img.jpg"
                        }
                        // alt={crew.name}
                      />
                      <div className="card-body text-center">
                        <h5 className="text-truncate text-black">
                          {crew.name}
                        </h5>
                        <p className="text-truncate text-black-50">
                          {crew.department}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-md-6">
                <p>No Data Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CastCrewList;
