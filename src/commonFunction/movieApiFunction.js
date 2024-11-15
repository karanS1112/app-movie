export const fetchMovieData = async (apiFunction, dispatch, action, setLoading) => {
  try {
    setLoading(true);
    const response = await apiFunction();
    const data = response.data;
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