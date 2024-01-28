import { Avatar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { LogoutIcon } from "../../assets/icons";
import "./navbar.css";

import Button from '@mui/material/Button';
const DashBoardNavbar = () => {
  const userData = JSON.parse(useGetLocalStorage("userData"));
  // console.log(userData);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <nav className="main-header navbar navbar-expand">
        <ul className="navbar-nav top-nav">
          <li> 
            <Button
            className="togglesidebar"
            id="" 
          >
            <i class="bi bi-list"></i>
          </Button>
          </li>
          <li>
            <NavLink
              to="/account-activity"
              className={({ isActive }) =>
                `  duration-200 ${isActive
                  ? "bg-yellow-500 text-white "
                  : "bg-[rgba(182,174,174,1)]"
                } w-[298px] text-center rounded-lg text-white font-bold p-2 text-lg `
              }
            >
              Account Activity
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/partner-activity"
              className={({ isActive }) =>
                `  duration-200 ${isActive
                  ? "bg-yellow-500 text-white "
                  : "bg-[rgba(182,174,174,1)]"
                } w-[298px] text-center rounded-lg text-white font-bold p-2 text-lg `
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
              <LogoutIcon/> Log Out
            </a>
          </li>
        </ul>
      </nav>


    </>

  );
};

export default DashBoardNavbar;
