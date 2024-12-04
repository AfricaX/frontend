import { useState } from "react";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import { store } from "../redux/store";
import { Provider } from "react-redux";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <Provider  store={store} >
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
