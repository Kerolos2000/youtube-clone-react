import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Channel from "./Components/Channel/Channel";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import PlayListVideos from "./Components/PlayListVideos/PlayListVideos";
import Register from "./Components/Register/Register";
import Resetpassword from "./Components/Resetpassword/Resetpassword";
import Search from "./Components/Search/Search";
import Updatepassword from "./Components/Updatepassword/Updatepassword";
import Video from "./Components/Video/Video";

import { SearchProvider } from "./Context/search";
import { UserDataContextProvider } from "./Context/userDataContext";

export default function App() {
  function IsUserNotLogin(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to={"/login"} />;
    } else {
      return props.children;
    }
  }

  function IsUserLogin(props) {
    if (localStorage.getItem("userToken") !== null) {
      return <Navigate to={"/"} />;
    } else {
      return props.children;
    }
  }

  let routes = createBrowserRouter([
    {
      path: "/",
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
