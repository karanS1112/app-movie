export const fetchMovieData = async (apiFunction, dispatch, action, setLoading,currentPage,setTotalPage, previousResults=[]) => {
  try {
    setLoading(true);
    const response = await apiFunction(currentPage);
    const data = response.data;
    const totalPages = response.data.total_pages;
    setTotalPage(totalPages)
    dispatch(action({...data,results: [...previousResults, ...data.results]}));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  } catch (error) {
    toast.error("Please check your internet connection");
    console.error(error);
  } finally {
    setLoading(false);
  }
};