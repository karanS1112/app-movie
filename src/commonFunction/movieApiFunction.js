import toast from "react-hot-toast";

export const fetchMovieData = async (apiFunction, dispatch, action, setLoading,currentPage,setTotalPage, previousResults=[]) => {
  try {
    const response = await apiFunction(currentPage);
    const data = response.data;
    const totalPages = response.data.total_pages;
    setTotalPage(totalPages)
    dispatch(action({...data,results: [...previousResults, ...data.results]}));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  } catch (error) {
    toast.error("Data is not fetching");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const fetchCastCrewData = async(castCrewMovie,setCastCrew,dispatch,id,setLoading)=>{
    try {
      const res = await castCrewMovie(id);
      const castCrewResponse = res.data;
      dispatch(setCastCrew(castCrewResponse));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("Cast Data is not fetching");
      console.error(error);
    }
}

export const fetchVideoData = async(castCrewMovie,setCastCrew,dispatch,id,setLoading)=>{
  try {
    const res = await castCrewMovie(id);
    const castCrewResponse = res.data;
    dispatch(setCastCrew(castCrewResponse));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  } catch (error) {
    toast.error("Video Data is not fetching");
    console.error(error);
  }
}