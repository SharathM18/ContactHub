import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Logout from "./components/Logout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AddContact from "./components/pages/AddContact.jsx";
import AllContacts from "./components/pages/AllContacts.jsx";
import NotFoundPage from "../utils/NotFoundPage.jsx";
import "./index.css";
import "./assets/style/theme.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute authentication={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedRoute authentication={false}>
            <Signup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/logout",
        element: (
          <ProtectedRoute authentication={true}>
            <Logout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addcontact",
        element: (
          <ProtectedRoute authentication={true}>
            <AddContact />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allcontacts",
        element: (
          <ProtectedRoute authentication={true}>
            <AllContacts />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
