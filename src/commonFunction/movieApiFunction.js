export const fetchMovieData = async (apiFunction, dispatch, action, setLoading,currentPage,setTotalPage) => {
  try {
    setLoading(true);
    console.log(currentPage,"common function");
    const response = await apiFunction(currentPage);
    const data = response.data;
    const totalPages = response.data.total_pages;
    setTotalPage(totalPages)
    dispatch(action(data));
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