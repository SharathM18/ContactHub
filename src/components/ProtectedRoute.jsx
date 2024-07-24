import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/Loading";

const ProtectedRoute = ({ children, authentication = true }) => {
  const authStatus = useSelector((state) => state.authSlice.authStatus);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication === true && authStatus === false) {
      navigate("/login");
    } else if (authentication === false && authStatus === true) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate, authentication, authStatus]);

  return loading ? <Loading /> : <>{children}</>;
};

export default ProtectedRoute;
