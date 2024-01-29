import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  FormControl,
  OutlinedInput,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import logo from "../../assets/images/logo.png";
import {
  agentFilter as agentFilterAction,
  empSizeFilter as empSizeFilterAction,
  partnerFilter as partnerFilterAction,
  regionsFilter as regionsFilterAction,
  revenueFilter as revenueFilterAction,
  statusFilter as statusFilterAction,
  technographicsFilter as technographicsFilterAction,
  verticalFilter as verticalFilterAction,
} from "../../store/Features/accountSlice";
import "./sidebar.css";

export default function Sidebar(props) {
  const dispatch = useDispatch();
  const { regionsList } = useSelector((state) => state.account);
  const { agentFilter } = useSelector((state) => state.account);
  const { partnerFilter } = useSelector((state) => state.account);
  const { regionsFilter } = useSelector((state) => state.account);
  const { empSizeFilter } = useSelector((state) => state.account);
  const { verticalFilter } = useSelector((state) => state.account);
  const { statusFilter } = useSelector((state) => state.account);
  const { revenueFilter } = useSelector((state) => state.account);
  const { technographicsFilter } = useSelector((state) => state.account);

  const { agentList } = useSelector((state) => state.account);
  const { revenueList } = useSelector((state) => state.account);
  const { verticalList } = useSelector((state) => state.account);
  const { empSizeList } = useSelector((state) => state.account);
  const { contactStatusList } = useSelector((state) => state.account);
  const { technographicsList } = useSelector((state) => state.account);
  const { partnerList } = useSelector((state) => state.account);

  const [regionOpen, setRegionOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  const userData = JSON.parse(useGetLocalStorage("userData"));
  const userRole = userData?.roleId;

  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;

    const contextValue = typeof value === "string" ? value.split(",") : value;
    dispatch(regionsFilterAction(contextValue));
  };

  const handlePartnerChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    dispatch(partnerFilterAction(contextValue));
  };

  const handleTechnoChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    dispatch(technographicsFilterAction(contextValue));
  };

  const handleRevenueChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    dispatch(revenueFilterAction(contextValue));
  };

  const handleEmpSizeFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    dispatch(empSizeFilterAction(contextValue));
  };

  const handleVerticalChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    dispatch(verticalFilterAction(contextValue));
  };

  const handleStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    dispatch(statusFilterAction(contextValue));
  };

  const handleAgentChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    dispatch(agentFilterAction(contextValue));
  };

  const ITEM_HEIGHT = 50;
  const ITEM_PADDING_TOP = 4;
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
    const partnerListCache =
      useGetLocalStorage("partnerList")?.split(",") || [];
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
                              multiple
                              displayEmpty
                              value={regionsFilter}
                              onChange={handleRegionChange}
                              input={<OutlinedInput />}
                              MenuProps={MenuProps}
                              sx={{
                                backgroundColor: "#fff",
                              }}
                              renderValue={(selected) => {
                                if (!selected || selected.length === 0) {
                                  return <em>Select Region</em>;
                                } else {
                                  return (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                      }}
                                    >
                                      {selected.map((value) => {
                                        return (
                                          <Chip key={value} label={value} />
                                        );
                                      })}
                                    </Box>
                                  );
                                }
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
                  {userRole == 1 && (
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
                                multiple
                                displayEmpty
                                value={partnerFilter}
                                onChange={handlePartnerChange}
                                input={<OutlinedInput />}
                                MenuProps={MenuProps}
                                sx={{
                                  backgroundColor: "#fff",
                                }}
                                renderValue={(selected) => {
                                  if (!selected || selected.length === 0) {
                                    return <em>Select Partner</em>;
                                  } else {
                                    return (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: 0.5,
                                        }}
                                      >
                                        {selected.map((value) => {
                                          return (
                                            <Chip key={value} label={value} />
                                          );
                                        })}
                                      </Box>
                                    );
                                  }
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
                  )}
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
          {userRole == 2 && props.page === "accountList" && (
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
                    <FormControl size="small">
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        multiple
                        displayEmpty
                        value={partnerFilter}
                        onChange={handlePartnerChange}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select Agent</em>;
                          } else {
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => {
                                  return <Chip key={value} label={value} />;
                                })}
                              </Box>
                            );
                          }
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
                </AccordionDetails>
              </Accordion>
            </div>
          )}

          {userRole === 1 && props.page === "accountList" && (
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
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        multiple
                        displayEmpty
                        value={partnerFilter}
                        onChange={handlePartnerChange}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select Partner</em>;
                          } else {
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => {
                                  return <Chip key={value} label={value} />;
                                })}
                              </Box>
                            );
                          }
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
                  <div className="filter-control">
                    <FormControl fullWidth size="small">
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        multiple
                        displayEmpty
                        value={agentFilter}
                        onChange={handleAgentChange}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select Agent</em>;
                          } else {
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => {
                                  return <Chip key={value} label={value} />;
                                })}
                              </Box>
                            );
                          }
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {agentList &&
                          agentList.map((name) => (
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
                          multiple
                          displayEmpty
                          value={statusFilter}
                          onChange={handleStatusChange}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                          renderValue={(selected) => {
                            if (!selected || selected.length === 0) {
                              return <em>Select Status</em>;
                            } else {
                              return (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => {
                                    return <Chip key={value} label={value} />;
                                  })}
                                </Box>
                              );
                            }
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
                          multiple
                          value={verticalFilter}
                          onChange={handleVerticalChange}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                          renderValue={(selected) => {
                            if (!selected || selected.length === 0) {
                              return <em>Select Industry</em>;
                            } else {
                              return (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => {
                                    return <Chip key={value} label={value} />;
                                  })}
                                </Box>
                              );
                            }
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
                        multiple
                        value={empSizeFilter}
                        onChange={handleEmpSizeFilterChange}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select Size</em>;
                          } else {
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => {
                                  return <Chip key={value} label={value} />;
                                })}
                              </Box>
                            );
                          }
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
                      multiple
                      value={regionsFilter}
                      onChange={handleRegionChange}
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                      sx={{
                        backgroundColor: "#fff",
                      }}
                      renderValue={(selected) => {
                        if (!selected || selected.length === 0) {
                          return <em>Select Region</em>;
                        } else {
                          return (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => {
                                return <Chip key={value} label={value} />;
                              })}
                            </Box>
                          );
                        }
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
                        multiple
                        value={revenueFilter}
                        onChange={handleRevenueChange}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select Revenue</em>;
                          } else {
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => {
                                  return <Chip key={value} label={value} />;
                                })}
                              </Box>
                            );
                          }
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
                        multiple
                        value={technographicsFilter}
                        onChange={handleTechnoChange}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select Technographics</em>;
                          } else {
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => {
                                  return <Chip key={value} label={value} />;
                                })}
                              </Box>
                            );
                          }
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
