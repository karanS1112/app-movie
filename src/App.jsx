import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import NowPlaying from "./components/NowPlaying";
import UpComing from "./components/UpComing";
import TopRated from "./components/TopRated";
import Popular from "./components/Popular";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";
import MovieDetail from "./components/MovieDetail";
import CastCrewList from "./components/CastCrewList";
import CastCrewDetail from "./components/CastCrewDetail";
import VideoList from "./components/VideoList";

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <Header /> <Outlet /> <Footer />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movie/now-playing",
          element: <NowPlaying />,
        },
        {
          path: "/movie/up-coming",
          element: <UpComing />,
        },
        {
          path: "/movie/top-rated",
          element: <TopRated />,
        },
        {
          path: "/movie/popular",
          element: <Popular />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: `/movie/:id`,
          element: <MovieDetail />,
        },
        {
          path: `/movie/cast-crew/:id`,
          element: <CastCrewList />,
        },
        {
          path: `/movie/cast-crew-detail/:id`,
          element: <CastCrewDetail />,
        },
        {
          path: `/movie/video-list/:id`,
          element: <VideoList />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  return (
    <div className="main min-vh-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
