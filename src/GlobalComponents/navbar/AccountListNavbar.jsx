import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink, useParams } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { toggleBodyClass } from "../../utils/utils";
import Logout from "../navbar/Logout";
import "./navbar.css";
const AccountListNavbar = ({ page }) => {
  const userData = JSON.parse(useGetLocalStorage("userData"));
  const { accountName } = useParams();
  // console.log(accountName);
  // const navigate = useNavigate();
  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/");
  // };
  const handleButtonClick = () => {
    // Toggle the 'togglesidebar' on the body element
    toggleBodyClass("sidebar-open");
  };
  return (
    <>
      <nav className="main-header navbar navbar-expand">
        <div className="small-action d-none">
          <Button className="togglesidebar" id="" onClick={handleButtonClick}>
            <i className="bi bi-list"></i>
          </Button>
          {/* <Button
          className="togglesidebar"
          id=""
          onClick={ToggleClass}
        >
          <i class="bi bi-three-dots-vertical"></i>
        </Button> */}
        </div>
        <ul className="navbar-nav top-nav">
          <li>
            <NavLink
              to="/account-list"
              className={({ isActive }) =>
                `${page === "list"
                  ? "top-nav-active top-nav-link"
                  : "top-nav-link"
                }`
              }
            >
              Account List
            </NavLink>
          </li>
          {page === "detailed" && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${page === "detailed"
                    ? "top-nav-active top-nav-link"
                    : "top-nav-link"
                  }`
                }
              >
                Account Details
              </NavLink>
            </li>
          )}
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
