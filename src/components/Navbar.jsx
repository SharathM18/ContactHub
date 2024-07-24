import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "../assets/style/navbar.css";
import ThemeIcon from "../../utils/ThemeIcon";

const Navbar = () => {
  const authStatus = useSelector((state) => state.authSlice.authStatus);

  const navItem = [
    {
      name: "Home",
      path: "/",
      visible: true,
    },
    {
      name: "Login",
      path: "/login",
      visible: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      visible: !authStatus,
    },
    {
      name: "All Contacts",
      path: "/allcontacts",
      visible: authStatus,
    },
    {
      name: "Add Contact",
      path: "/addcontact",
      visible: authStatus,
    },
    {
      name: "Logout",
      path: "/logout",
      visible: authStatus,
    },
  ];
  return (
    <>
      <header className="navbar_container">
        <nav className="nav_links">
          <div className="logo_title">
            <Link to="/">ContactHub</Link>
          </div>
          <ul className="nav_link">
            {navItem.map((item, idx) =>
              item.visible ? (
                <NavLink
                  to={item.path}
                  key={`${item.name}-${idx}}`}
                  className={({ isActive }) => (isActive ? "isActive" : null)}
                >
                  <li>{item.name} </li>
                </NavLink>
              ) : null
            )}
            <div className="theme_icon">
              <ThemeIcon />
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
