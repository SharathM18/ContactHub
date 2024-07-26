import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../src/store/authSlice";
import { useState, useEffect } from "react";
import PageLoading from "../utils/PageLoading";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({ uid: user.uid, email: user.email }));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div>
          <Navbar />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default App;
