import { Avatar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { LogoutIcon } from "../../assets/icons";
import "./navbar.css";
import { toggleBodyClass } from '../../utils/utils';
import { useState } from "react";
import Button from '@mui/material/Button';
const DashBoardNavbar = () => {
  const userData = JSON.parse(useGetLocalStorage("userData"));
  // console.log(userData);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleButtonClick = () => {
    // Toggle the 'togglesidebar' on the body element
    toggleBodyClass('sidebar-open');
  };


  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };


  return (
    <>
      <nav className="main-header navbar navbar-expand">
        <div className="small-action d-none">
          <Button
            className="togglesidebar"
            id=""
            onClick={handleButtonClick}
          >
            <i class="bi bi-list"></i>
          </Button>
          {/* <Button
          className="togglesidebar"
          id=""
          onClick={ToggleClass}
        >
          <i class="bi bi-three-dots-vertical"></i>
        </Button> */}
        </div>
        <ul className={isActive ? "header-menu-open navbar-nav top-nav" : "navbar-nav top-nav"}>
          <li>
            <NavLink
              to="/account-activity"
              className={({ isActive }) =>
                `${isActive
                  ? "top-nav-active top-nav-link"
                  : "top-nav-link"
                }`
              }
            >
              Account Activity
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/partner-activity"
              className={({ isActive }) =>
                `${isActive
                  ? "top-nav-active top-nav-link"
                  : "top-nav-link"
                }`
              }
            >
              Partner Activity
            </NavLink>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <div className="top-user">
              <p> Welcome {userData?.name}</p>
              <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link log-out-btn" onClick={handleLogout}>
              <LogoutIcon /> Log Out
            </a>
          </li>
        </ul>
      </nav>


    </>

  );
};

export default DashBoardNavbar;
