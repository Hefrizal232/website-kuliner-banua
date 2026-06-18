import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import FoodDetail from "../pages/FoodDetail";
import Login from "../pages/Login";

export const router = (user, setUser) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Home user={user} setUser={setUser} />,
    },
    {
      path: "/kuliner/:slug",
      element: <FoodDetail />,
    },
    {
      path: "/login",
      element: <Login setUser={setUser} />,
    },
  ]);
