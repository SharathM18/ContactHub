import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "../assets/style/logout.css";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <>
      <div className="logout_container container">
        <p className="logout_msg">Are you sure you want to log out?</p>
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
