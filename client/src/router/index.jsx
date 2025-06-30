import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

import Signup from "../pages/Signup";
import { Navigate } from "react-router-dom";
import Authorized from "../layout/Authorized";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Authorized requireAuth={true}>
            <Home />
          </Authorized>
        ),
      },
      {
        path: "login",
        element: (
          <Authorized requireAuth={false}>
            <Login />
          </Authorized>
        ),
      },
      {
        path: "signup",
        element: (
          <Authorized requireAuth={false}>
            <Signup />
          </Authorized>
        ),
      },
      {
        path: "profile",
        element: (
          <Authorized requireAuth={true}>
            <Profile />
          </Authorized>
        ),
      },
    ],
  },
]);

export default router;
