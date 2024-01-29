import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  OutlinedInput,
  Select,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import logo from "../../assets/images/logo.png";
import "./sidebar.css";

export default function Sidebar(props) {
  const { regionsList } = useSelector((state) => state.account);
  const { revenueList } = useSelector((state) => state.account);
  const { revenueFilter } = useSelector((state) => state.account);
  const { verticalList } = useSelector((state) => state.account);
  const { empSizeList } = useSelector((state) => state.account);
  const { contactStatusList } = useSelector((state) => state.account);
  const { technographicsList } = useSelector((state) => state.account);
  const { partnerList } = useSelector((state) => state.account);

  const [regionFilter, setRegionFilter] = useState("");
  const [partnerFilter, setPartnerFilter] = useState("");
  const [regionOpen, setRegionOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  const userData = JSON.parse(useGetLocalStorage("userData"));
  const userRole = userData?.roleId;

  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;
    setRegionFilter(typeof value === "string" ? value.split(",") : value);
  };

  const handlePartnerChange = (event) => {
    const {
      target: { value },
    } = event;
    setPartnerFilter(typeof value === "string" ? value.split(",") : value);
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

  const handleChange = (event) => {
    setAge(event.target.value);
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
                  <i className="bi bi-ui-radios-grid"></i> DashBoard
                </NavLink>
              </MenuItem>
              {props.page === "accountActivity" && (
                <div className="submenu">
                  <MenuItem>
                    <NavLink onClick={toggleRegions}>
                      {regionOpen ? (
                        <i className="bi bi-chevron-down" />
                      ) : (
                        <i className="bi bi-chevron-right" />
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
                        <i className="bi bi-chevron-down" />
                      ) : (
                        <i className="bi bi-chevron-right" />
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
              )}

              <MenuItem>
                <NavLink
                  to="/account-list"
                  className={({ isActive }) =>
                    `${isActive ? "menu-active" : "menu-inactive"}`
                  }
                >
                  <i className="bi bi-list-stars"></i> AccountList
                </NavLink>
              </MenuItem>
            </MenuList>
          </div>
          {userRole == 2 && props.page === "accountList" ? (
            <div className="sidebar-filter">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Agent Search
                </AccordionSummary>
                <AccordionDetails>
                  <div className="filter-control">
                    <FormControl fullWidth size="small">
                      <Select
                        labelId="status"
                        id="status-select"
                        value={0}
                        input={<OutlinedInput />}
                        label="Status"
                        onChange={handleChange}
                      >
                        <MenuItem value={0}>Agent</MenuItem>
                        <MenuItem value={10}>Agent One</MenuItem>
                        <MenuItem value={20}>Agent Two</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : (
            ""
          )}

          {userRole === 1 && props.page === "accountList" ? (
            <div className="sidebar-filter">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Partner Search
                </AccordionSummary>
                <AccordionDetails>
                  <div className="filter-control">
                    <FormControl fullWidth size="small">
                      <Select
                        labelId="status"
                        input={<OutlinedInput />}
                        id="status-select"
                        value={0}
                        label="Status"
                        onChange={handleChange}
                      >
                        <MenuItem value={0}>Partner Name</MenuItem>
                        <MenuItem value={10}>Partner One</MenuItem>
                        <MenuItem value={20}>Partner Two</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="filter-control">
                    <FormControl fullWidth size="small">
                      <Select
                        labelId="status"
                        id="status-select"
                        value={0}
                        input={<OutlinedInput />}
                        label="Status"
                        onChange={handleChange}
                      >
                        <MenuItem value={0}>Agent</MenuItem>
                        <MenuItem value={10}>Agent One</MenuItem>
                        <MenuItem value={20}>Agent Two</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : (
            ""
          )}
          {props.page === "accountList" && (
            <div className="sidebar-filter">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Account Search
                </AccordionSummary>
                <AccordionDetails>
                  <div className="filter-control">
                    <FormControl fullWidth size="small">
                      <FormControl>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          size="small"
                          displayEmpty
                          value={revenueFilter}
                          onChange={handlePartnerChange}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                          renderValue={(selected) => {
                            if (!selected || selected.length === 0) {
                              return <em>Select Status</em>;
                            }

                            return selected;
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {contactStatusList &&
                            contactStatusList.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </FormControl>
                  </div>
                  <div className="filter-control">
                    <FormControl fullWidth size="small">
                      <FormControl>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          size="small"
                          displayEmpty
                          value={revenueFilter}
                          onChange={handlePartnerChange}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                          renderValue={(selected) => {
                            if (!selected || selected.length === 0) {
                              return <em>Select Industry</em>;
                            }

                            return selected;
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {verticalList &&
                            verticalList.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </FormControl>
                  </div>
                  <div className="filter-control">
                    <FormControl>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        displayEmpty
                        value={revenueFilter}
                        onChange={handlePartnerChange}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select Size</em>;
                          }

                          return selected;
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {empSizeList &&
                          empSizeList.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="filter-control">
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      size="small"
                      displayEmpty
                      value={revenueFilter}
                      onChange={handlePartnerChange}
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                      sx={{
                        backgroundColor: "#fff",
                      }}
                      renderValue={(selected) => {
                        if (!selected || selected.length === 0) {
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
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          )}

          {props.page === "accountList" && (
            <div className="sidebar-filter">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Advance Search
                </AccordionSummary>
                <AccordionDetails>
                  <div className="filter-control">
                    <FormControl>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        displayEmpty
                        value={revenueFilter}
                        onChange={handlePartnerChange}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select Revenue</em>;
                          }

                          return selected;
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {revenueList &&
                          revenueList.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="filter-control">
                    <FormControl sx={{ width: "170px" }}>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        displayEmpty
                        value={revenueFilter}
                        onChange={handlePartnerChange}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select Technographics</em>;
                          }

                          return selected;
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {technographicsList &&
                          technographicsList.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
