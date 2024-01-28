import { Avatar } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { LogoutIcon } from "../../assets/icons";
import "./navbar.css";
import Button from '@mui/material/Button';
import { toggleBodyClass } from '../../utils/utils';
const AccountListNavbar = ({ list, details, activity, partener }) => {
  const userData = JSON.parse(useGetLocalStorage("userData"));
  const { accountName } = useParams();
  // console.log(accountName);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleButtonClick = () => {
    // Toggle the 'togglesidebar' on the body element
    toggleBodyClass('sidebar-open');
  };
  return (

    <>
      <nav className="main-header navbar navbar-expand">
        <ul className="navbar-nav top-nav">
          <li>
            <Button
              className="togglesidebar"
              id=""
              onClick={handleButtonClick}
            >
              <i class="bi bi-list"></i>
            </Button>
          </li>
          <li>
            <NavLink
              to="/account-list"
              className={({ isActive }) =>
                `  duration-200 ${isActive
                  ? "bg-yellow-500 text-white "
                  : "bg-[rgba(182,174,174,1)]"
                } w-[298px] text-center rounded-lg text-white font-bold p-2 text-lg `
              }
            >
              Account List
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${accountName ? "bg-yellow-500" : "bg-[rgba(182,174,174,1)]"}
               w-[298px] text-center rounded-lg text-white font-bold p-2 text-lg `}
            >
              Account Details
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
            <p class="nav-link log-out-btn" onClick={handleLogout}>
              <LogoutIcon /> Log Out
            </p>
          </li>
        </ul>
      </nav>

      {/* <div className="navbar m-2 rounded-lg h-20 bg-sky-500">
        <div className="wrapper">
          <div className="flex gap-4 ">
            <NavLink
              to="/account-list"
              className={({ isActive }) =>
                `  duration-200 ${isActive
                  ? "bg-yellow-500 text-white "
                  : "bg-[rgba(182,174,174,1)]"
                } w-[298px] text-center rounded-lg text-white font-bold p-2 text-lg `
              }
            >
              Account List
            </NavLink>
            <NavLink
              className={`${accountName ? "bg-yellow-500" : "bg-[rgba(182,174,174,1)]"}
               w-[298px] text-center rounded-lg text-white font-bold p-2 text-lg `}
            >
              Account Details
            </NavLink>

          </div>
          <div className="item">
            <p className="font-bold text-lg mr-5 text-white">
              Welcome {userData?.name}
            </p>
            <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
            <div className="text-white text-xl rounded-full cursor-pointer bg-red-600 p-2 ml-2">
              <LogoutIcon onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div> */}
    </>



  );
};

export default AccountListNavbar;
