import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Channel from "./Components/Channel/Channel";
import Video from "./Components/Video/Video";
import PlayListVideos from "./Components/PlayListVideos/PlayListVideos";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";
import Resetpassword from "./Components/Resetpassword/Resetpassword";
import Updatepassword from "./Components/Updatepassword/Updatepassword";
import NotFound from "./Components/NotFound/NotFound";

import { UserDataContextProvider } from "./Context/userDataContext";
import { SearchProvider } from "./Context/search";

export default function App() {
  function IsUserNotLogin(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to={"/youtube-clone-react/login"} />;
    } else {
      return props.children;
    }
  }

  function IsUserLogin(props) {
    if (localStorage.getItem("userToken") !== null) {
      return <Navigate to={"/youtube-clone-react/"} />;
    } else {
      return props.children;
    }
  }

  let routes = createBrowserRouter([
    {
      path: "youtube-clone-react",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <IsUserNotLogin>
              <Home />
            </IsUserNotLogin>
          ),
        },
        {
          path: "search/:id",
          element: (
            <IsUserNotLogin>
              <Search />
            </IsUserNotLogin>
          ),
        },
        {
          path: "channel/:id",
          element: (
            <IsUserNotLogin>
              <Channel />
            </IsUserNotLogin>
          ),
        },
        {
          path: "video/:id",
          element: (
            <IsUserNotLogin>
              <Video />
            </IsUserNotLogin>
          ),
        },
        {
          path: "playListVideos/:id",
          element: (
            <IsUserNotLogin>
              <PlayListVideos />
            </IsUserNotLogin>
          ),
        },
        {
          path: "login",
          element: (
            <IsUserLogin>
              <Login />
            </IsUserLogin>
          ),
        },
        {
          path: "register",
          element: (
            <IsUserLogin>
              <Register />
            </IsUserLogin>
          ),
        },
        {
          path: "forgot",
          element: (
            <IsUserLogin>
              <Forgotpassword />
            </IsUserLogin>
          ),
        },
        {
          path: "reset",
          element: (
            <IsUserLogin>
              <Resetpassword />
            </IsUserLogin>
          ),
        },
        {
          path: "update",
          element: (
            <IsUserLogin>
              <Updatepassword />
            </IsUserLogin>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <SearchProvider>
      <UserDataContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </UserDataContextProvider>
    </SearchProvider>
  );
}
