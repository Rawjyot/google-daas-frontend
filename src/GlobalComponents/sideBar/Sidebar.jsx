import "./sidebar.css";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { revenueFilter, sizeFilter, stateFilter, statusFilter } from "../../store/Features/filterSlice";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
export default function Sidebar() {
  const { status, revenue, size, State } = useSelector((state) => state.filter)
  const dispatch = useDispatch();
  // console.log(status,revenue,size,State)
  return (

    <>

      <aside className="main-sidebar">

        <div className="brand-link">

          <img src={logo} alt="" height={40} width={130} />
        </div>
        <div className="sidebar">

          <div className="sidebar-list">
            <MenuList>
              <MenuItem>
                <NavLink
                  to="/account-activity"
                  className={({ isActive }) =>
                    `${isActive ? "menu-active" : "menu-inactive"
                    }`
                  }
                >
                  <i class="bi bi-ui-radios-grid"></i> DashBoard
                </NavLink>

              </MenuItem>
              <div className="submenu">
                <MenuItem><NavLink><i class="bi bi-chevron-right"></i> Regions</NavLink> </MenuItem>
                <MenuItem><NavLink><i class="bi bi-chevron-right"></i> Partners</NavLink> </MenuItem>
              </div>

              <MenuItem>
                <NavLink
                  to="/account-list"
                  className={({ isActive }) =>
                    `${isActive ? "menu-active" : "menu-inactive"
                    }`
                  }
                >
                 <i class="bi bi-list-stars"></i> AccountList
                </NavLink>
              </MenuItem>
            </MenuList>
          </div>
        </div>
      </aside>

    </>

  );
}
