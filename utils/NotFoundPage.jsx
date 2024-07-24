import { useNavigate } from "react-router-dom";
import "../src/assets/style/notfoundpage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="nfp_container">
      <div className="nfp_content">
        <h1 className="nfp_code">404</h1>
        <p className="nfp_message">Oops! Page not found.</p>
        <p className="nfp_description">
          The page you’re looking for doesn’t exist.
        </p>
        <button onClick={handleHome} className="nfp_btn">
          Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
