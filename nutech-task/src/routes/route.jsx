import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../pages/Main";
import DetailProduct from "../components/DetailProduct";
import LoginRegist from "../pages/LoginRegist";

const router = createBrowserRouter([
  {
    element: <Main />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) throw redirect("/login");

      return null
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/product/:id", element: <DetailProduct /> },
    ],
  },
  {
    path: "/login",
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) throw redirect("/");

      return null;
    },
    element: <LoginRegist />,
  },
]);

export default router;
