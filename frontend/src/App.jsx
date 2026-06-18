import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("is_logged_in") === "true";
    const role = localStorage.getItem("user_role");
    if (isLoggedIn) {
      setUser({ role });
    }
  }, []);

  return <RouterProvider router={router(user, setUser)} />;
}
