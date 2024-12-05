import { useState } from "react";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Login from "./pages/Login";

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
