import { FormControl, OutlinedInput, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import logo from "../../assets/images/logo.png";
import "./sidebar.css";
export default function Sidebar() {
  const { regionsList } = useSelector((state) => state.account);
  const { partnerList } = useSelector((state) => state.account);

  const [regionFilter, setRegionFilter] = useState("");
  const [partnerFilter, setPartnerFilter] = useState("");
  const [regionOpen, setRegionOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;
    setRegionFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handlePartnerChange = (event) => {
    const {
      target: { value },
    } = event;
    setPartnerFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const toggleRegions = () => {
    setRegionOpen(!regionOpen);
  };

  const togglePartner = () => {
    setPartnerOpen(!partnerOpen);
  };

  const getPartnerList = () => {
    if (partnerList) return partnerList;
    const partnerListCache = useGetLocalStorage("partnerList").split(",") || [];
    return partnerListCache;
  };

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
                    `${isActive ? "menu-active" : "menu-inactive"}`
                  }
                >
                  <i class="bi bi-ui-radios-grid"></i> DashBoard
                </NavLink>
              </MenuItem>
              <div className="submenu">
                <MenuItem>
                  <NavLink onClick={toggleRegions}>
                    {regionOpen ? (
                      <i class="bi bi-chevron-down" />
                    ) : (
                      <i class="bi bi-chevron-right" />
                    )}{" "}
                    Regions
                  </NavLink>
                  {regionOpen && (
                    <>
                      <div>
                        <FormControl sx={{ m: "0 35px", width: 180 }}>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            size="small"
                            displayEmpty
                            value={regionFilter}
                            onChange={handleRegionChange}
                            input={<OutlinedInput />}
                            MenuProps={MenuProps}
                            sx={{
                              backgroundColor: "#fff",
                            }}
                            renderValue={(selected) => {
                              if (selected.length === 0) {
                                return <em>Select Region</em>;
                              }

                              return selected;
                            }}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            {regionsList &&
                              regionsList.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                    </>
                  )}
                </MenuItem>
                <MenuItem>
                  <NavLink onClick={togglePartner}>
                    {partnerOpen ? (
                      <i class="bi bi-chevron-down" />
                    ) : (
                      <i class="bi bi-chevron-right" />
                    )}{" "}
                    Partner
                  </NavLink>
                  {partnerOpen && (
                    <>
                      <div>
                        <FormControl sx={{ m: "0 35px", width: 180 }}>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            size="small"
                            displayEmpty
                            value={partnerFilter}
                            onChange={handlePartnerChange}
                            input={<OutlinedInput />}
                            MenuProps={MenuProps}
                            sx={{
                              backgroundColor: "#fff",
                            }}
                            renderValue={(selected) => {
                              if (selected.length === 0) {
                                return <em>Select Partner</em>;
                              }

                              return selected;
                            }}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            {getPartnerList().map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </>
                  )}
                </MenuItem>
              </div>

              <MenuItem>
                <NavLink
                  to="/account-list"
                  className={({ isActive }) =>
                    `${isActive ? "menu-active" : "menu-inactive"}`
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
