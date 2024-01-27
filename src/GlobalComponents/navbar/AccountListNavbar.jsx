import { Avatar } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { LogoutIcon } from "../../assets/icons";
import "./navbar.css";
const AccountListNavbar = ({ list, details, activity, partener }) => {
  const userData = JSON.parse(useGetLocalStorage("userData"));
  const { accountName } = useParams();
  // console.log(accountName);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="navbar m-2 rounded-lg h-20 bg-sky-500">
      <div className="wrapper">
        <div className="flex gap-4 ">
          <NavLink
            to="/account-list"
            className={({ isActive }) =>
              `  duration-200 ${
                isActive
                  ? "bg-yellow-500 text-white "
                  : "bg-[rgba(182,174,174,1)]"
              } w-[298px] text-center rounded-lg text-white font-bold p-2 text-lg `
            }
          >
            Account List
          </NavLink>
          <NavLink
            className={`${accountName ? "bg-yellow-500":"bg-[rgba(182,174,174,1)]"}
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
    </div>
  );
};

export default AccountListNavbar;
