import "./sidebar.css";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { revenueFilter, sizeFilter, stateFilter, statusFilter } from "../../store/Features/filterSlice";

export default function Sidebar() {
  const {status,revenue,size,State} = useSelector((state)=>state.filter)
  const dispatch = useDispatch();
  // console.log(status,revenue,size,State)
  return (
    <div className="flex flex-col">
      <div className="h-[65px] font-bold text-2xl text-center flex items-center justify-center">
        <span className=" ">
          <img src={logo} alt="" height={40} width={130} />
        </span>
      </div>
      <div className="m-3 shadow-lg flex flex-col items-start shadow-[0px_6px_29px_0px_rgba(7, 21, 70, 0.81)] sidebar rounded-lg text-white bg-[#00B0F0] ">
        <div className="flex flex-col p-2">
          <NavLink
            to="/account-activity"
            className={({ isActive }) =>
              `  duration-200 ${
                isActive ? "bg-yellow-500 text-white " : ""
              } text-white px-6 py-2 rounded-md  font-semibold text-2xl `
            }
          >
            DashBoard
          </NavLink>

          <div className="text-xl ml-6">
            <h1>{">"}Regions</h1>

            <h1>{">"}Partner</h1>
          </div>

          <NavLink
            to="/account-list"
            className={({ isActive }) =>
              `  duration-200 ${
                isActive ? "bg-yellow-500 text-white " : ""
              } text-white px-6 py-2 rounded-md  font-semibold text-2xl `
            }
          >
            AccountList
          </NavLink>

          <div className="border-2 p-1 rounded my-4 border-gray-200">
            <h1 className="text-white px-6 py-2 rounded-md  font-semibold text-xl">
              Account Search
            </h1>
            <form action="" className="flex flex-col items-start ">
              <div>
                <span className="border-5 border-black text-xl">Status :</span>{" "}
                <select
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => dispatch(statusFilter(e.target.value))}
                  className={`ml-1 text-black p-1 rounded `}
                >
                  <option value="None">None</option>
                  <option value="Opportunity">Opportunity</option>
                  <option value="Nurture">Nurture</option>
                  <option value="Followup">Followup</option>
                  <option value="Disqualified">Disqualified</option>
                  <option value="Bad data">Bad Data</option>
                  <option value="Viewed">Viewed</option>
                  <option value="Untouched">Untouched</option>
                </select>
              </div>
              <div className="mt-1">
                <span className="border-5 border-black text-xl">Size :</span>{" "}
                <select
                  id="status"
                  name="status"
                  value={size}
                  onChange={(e) => dispatch(sizeFilter(e.target.value))}
                  className={`ml-1 text-black p-1 rounded `}
                >
                  <option value="None">None</option>
                  <option value="1-10 employees">1-10</option>
                  <option value="11-50 employees">11-50</option>
                  <option value="51-200 employees">51-200</option>
                  <option value="201-500 employees">201-500</option>
                  <option value="501-1000 employees">501-1000</option>
                  <option value="1001-5000 employees">1001-5000</option>
                  <option value="5000-10000 employees">5000-10000</option>
                  <option value="10001 & Above employees">10001&Above</option>
                </select>
              </div>
              <div className="mt-1">
                <span className="border-5 border-black text-xl">Revenue :</span>{" "}
                <select
                  id="status"
                  name="status"
                  value={revenue}
                  onChange={(e) => dispatch(revenueFilter(e.target.value))}
                  className={`ml-1 text-black p-1 rounded `}
                >
                  <option value="None">None</option>
                  <option value="0-1M">0-1M</option>
                  <option value="1-50M">1-50M</option>
                  <option value="50-200M">50-200M</option>
                  <option value="200-500M">200-500M</option>
                  <option value="500-1000M">500-1000M</option>
                  <option value="1000-5000M">1000-5000M</option>
                  <option value="5000M&Above">5000M&Above</option>
                </select>
              </div>
              <div className="mt-1">
                <span className="border-5 border-black text-xl">State :</span>{" "}
                <select
                  id="status"
                  name="status"
                  value={State}
                  onChange={(e) => dispatch(stateFilter(e.target.value))}
                  className={`ml-1 text-black p-1 rounded `}
                >
                  <option value="None">None</option>
                  <option value="Delhi"> Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
