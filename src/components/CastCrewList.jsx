import React, { useEffect } from "react";
import { fetchCastCrewData } from "../commonFunction/movieApiFunction";
import { castCrewMovie } from "../api/movieApiList";
import { setCastCrew } from "../store/reducer/movieReducer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CastCrewList() {
  const param = useParams();
  const id = param.id;
  const castCrewData = useSelector((state) => state.movieSlice.castCrew);
  //   console.log(castCrewData, "castCrewData");
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  useEffect(() => {
    fetchCastCrewData(castCrewMovie, setCastCrew, dispatchEvent, id);
  }, []);
  return (
    <div className="container min-vh-100">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h4>Cast</h4>
          <div className="row">
            {castCrewData?.cast.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className="card">
                  <img src={imageUri + item.profile_path} alt={item.name} />
                  <h5>{item.name}</h5>
                  <p>{item.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <h4>crew</h4>
          <div className="row">
            {castCrewData?.crew.map((crew) => (
              <div className="col-md-6" key={crew.id}>
                <div className="card">
                  <img src={imageUri + crew.profile_path} alt={crew.name} />
                  <h5>{crew.name}</h5>
                  <p>{crew.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CastCrewList;
