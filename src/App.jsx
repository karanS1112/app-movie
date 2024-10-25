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
          path: "/nowplaying",
          element: <NowPlaying />,
        },
        {
          path: "/upcoming",
          element: <UpComing />,
        },
        {
          path: "/toprated",
          element: <TopRated />,
        },
        {
          path: "/popular",
          element: <Popular />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
