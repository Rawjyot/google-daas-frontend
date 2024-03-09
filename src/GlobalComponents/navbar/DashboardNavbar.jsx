import { Avatar } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { toggleBodyClass } from "../../utils/utils";
import Logout from "../navbar/Logout";
import "./navbar.css";

import Button from "@mui/material/Button";
const DashBoardNavbar = () => {
  const userData = JSON.parse(useGetLocalStorage("userData"));
  // console.log(userData);
  const userRole = userData?.roleId;
  const handleButtonClick = () => {
    // Toggle the 'togglesidebar' on the body element
    toggleBodyClass("sidebar-open");
  };

  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };
  return (
    <>
      <nav className="main-header navbar navbar-expand">
        <div className="small-action d-none">
          <Button className="togglesidebar" id="" onClick={handleButtonClick}>
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <ul
          className={
            isActive
              ? "header-menu-open navbar-nav top-nav"
              : "navbar-nav top-nav"
          }
        >
          <li>
            <NavLink
              to="/account-activity"
              className={({ isActive }) =>
                `${isActive ? "top-nav-active top-nav-link" : "top-nav-link"}`
              }
            >
              Account Activity
            </NavLink>
          </li>
          {userRole === 1 || userRole === 2 ? <li>
            <NavLink
              to="/partner-activity"
              className={({ isActive }) =>
                `${isActive ? "top-nav-active top-nav-link" : "top-nav-link"}`
              }
            >
              Partner Activity
            </NavLink>
          </li> : ''}
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <div className="top-user">
              <p> Welcome {userData?.userName}</p>
              {/* <Avatar src="https://www.w3schools.com/howto/img_avatar.png" /> */}
            </div>
          </li>
          <Logout />
        </ul>
      </nav>
    </>
  );
};

export default DashBoardNavbar;
