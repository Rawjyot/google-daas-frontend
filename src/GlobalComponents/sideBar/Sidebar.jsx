import ClearIcon from "@mui/icons-material/Clear";
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
import { ToastContainer, toast } from "react-toastify";
import {
  agentFilter as agentFilterAction,
  empSizeFilter as empSizeFilterAction,
  partnerFilter as partnerFilterAction,
  regionsFilter as regionsFilterAction,
  revenueFilter as revenueFilterAction,
  statusFilter as statusFilterAction,
  technographicsFilter as technographicsFilterAction,
  verticalFilter as verticalFilterAction,
  countryFilter as countryFilterAction,
  countryList as countryListAction,
  stateList as stateListAction,
  stateFilter as stateFilterAction,
  cityFilter as cityFilterAction,
  cityList as cityListAction
} from "../../store/Features/accountSlice";
import "./sidebar.css";

import dashboardService from "../../Services/dashBoardService";

export default function Sidebar(props) {
  const dispatch = useDispatch();
  const { regionsList } = useSelector((state) => state.account);
  const { agentFilter } = useSelector((state) => state.account);
  const { partnerFilter } = useSelector((state) => state.account);
  const { regionsFilter } = useSelector((state) => state.account);
  const { countryFilter } = useSelector((state) => state.account);
  const { stateFilter } = useSelector((state) => state.account);
  const { cityFilter } = useSelector((state) => state.account);
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

  const { countryList } = useSelector((state) => state.account);
  const { stateList } = useSelector((state) => state.account);
  const { cityList } = useSelector((state) => state.account);


  const [regionOpen, setRegionOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  const userData = JSON.parse(useGetLocalStorage("userData"));
  const userRole = userData?.roleId;

  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    fetchCountryCityState("REGION", value).then(res => {

      dispatch(countryListAction(res?.data?.countryList));
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
    dispatch(regionsFilterAction(contextValue));
  };


  const handleCountryChange = (event) => {
    const {
      target: { value },
    } = event;

    const contextValue = typeof value === "string" ? value.split(",") : value;
    fetchCountryCityState("COUNTRY", [value]).then(res => {

      dispatch(stateListAction(res?.data?.stateList));
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
    dispatch(countryFilterAction(contextValue));
  };

  const handleStateChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    fetchCountryCityState("STATE", value).then(res => {

      dispatch(cityListAction(res?.data?.cityList));
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
    dispatch(stateFilterAction(contextValue));
  };

  const handleCityChange = (event) => {
    const {
      target: { value },
    } = event;
    const contextValue = typeof value === "string" ? value.split(",") : value;
    dispatch(cityFilterAction(contextValue));
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

  const handleDropdownOpen = () => {
    // Your code to be executed when the dropdown is opened
    console.log('Dropdown opened!');
  };

  const handleChipDelete = (value, filter, filterKey) => {
    const updatedFilter = filter.slice();
    const index = updatedFilter.indexOf(value);
    if (index > -1) {
      updatedFilter.splice(index, 1);
    }

    switch (filterKey) {
      case "revenueFilter":
        dispatch(revenueFilterAction(updatedFilter));
        break;
      case "technographicsFilter":
        dispatch(technographicsFilterAction(updatedFilter));
        break;
      case "partnerFilter":
        dispatch(partnerFilterAction(updatedFilter));
        break;
      case "regionsFilter":
        if (updatedFilter.length < 1) {
          dispatch(countryFilterAction(''))
          dispatch(countryListAction([]))
          dispatch(stateFilterAction([]))
          dispatch(stateListAction(null))
          dispatch(cityFilterAction([]))
          dispatch(cityListAction(null))
        }
        fetchCountryCityState("REGION", updatedFilter).then(res => {

          dispatch(countryListAction(res?.data?.countryList.length > 0 ? res?.data?.countryList : false));

        }).catch(err => {
          console.log(err)
        })
        dispatch(regionsFilterAction(updatedFilter));
        break;
      case "empSizeFilter":
        dispatch(empSizeFilterAction(updatedFilter));
        break;
      case "verticalFilter":
        dispatch(verticalFilterAction(updatedFilter));
        break;
      case "statusFilter":
        dispatch(statusFilterAction(updatedFilter));
        break;
      case "agentFilter":
        dispatch(agentFilterAction(updatedFilter));
        break;
      case "countryFilter":
        if (updatedFilter.length < 1) {
          dispatch(stateFilterAction([]))
          dispatch(stateListAction([]))
        }
        fetchCountryCityState("COUNTRY", updatedFilter).then(res => {
          if (updatedFilter.length < 1) dispatch(ststeFilterAction(''))
          dispatch(stateListAction(res?.data?.stateList.length > 0 ? res?.data?.stateList : false));

        }).catch(err => {
          console.log(err)
        })
        dispatch(countryFilterAction(updatedFilter));
        break;
      case "stateFilter":
        if (updatedFilter.length < 1) {

          dispatch(cityFilterAction([]))
          dispatch(cityListAction(null))
        }
        dispatch(stateFilterAction(updatedFilter));
        break;
      case "cityFilter":
        dispatch(cityFilterAction(updatedFilter));
        break;
      default:
        break;
    }
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

  const fetchCountryCityState = async (type = "REGION", data) => {
    return await dashboardService.getCountryCityState({
      userId: userData?.userId,
      userToken: userData?.userToken,
      responseToken: userData?.responseToken,
      type: type,
      dataFor: data.join(","),
    });

    // const countryList = response?.data?.countryList

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
              {props.page === "accountActivity" && userRole === 1 && (
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
                              // MenuProps={MenuProps}
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
                                          <Chip
                                            key={value}
                                            label={value}
                                            deleteIcon={
                                              <ClearIcon
                                                onMouseDown={(event) =>
                                                  event.stopPropagation()
                                                }
                                              />
                                            }
                                            onDelete={() =>
                                              handleChipDelete(
                                                value,
                                                regionsFilter,
                                                "regionsFilter"
                                              )
                                            }
                                          />
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
                                            <Chip
                                              key={value}
                                              label={value}
                                              deleteIcon={
                                                <ClearIcon
                                                  onMouseDown={(event) =>
                                                    event.stopPropagation()
                                                  }
                                                />
                                              }
                                              onDelete={() =>
                                                handleChipDelete(
                                                  value,
                                                  partnerFilter,
                                                  "partnerFilter"
                                                )
                                              }
                                            />
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
          {/* {userRole == 2 && props.page === "accountList" && (
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
                        // MenuProps={MenuProps}
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
                                  return (
                                    <Chip
                                      key={value}
                                      label={value}
                                      deleteIcon={
                                        <ClearIcon
                                          onMouseDown={(event) =>
                                            event.stopPropagation()
                                          }
                                        />
                                      }
                                      onDelete={() =>
                                        handleChipDelete(
                                          value,
                                          partnerFilter,
                                          "partnerFilter"
                                        )
                                      }
                                    />
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
                </AccordionDetails>
              </Accordion>
            </div>
          )} */}

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
                        // MenuProps={MenuProps}
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
                                    <Chip
                                      key={value}
                                      label={value}
                                      deleteIcon={
                                        <ClearIcon
                                          onMouseDown={(event) =>
                                            event.stopPropagation()
                                          }
                                        />
                                      }
                                      onDelete={() =>
                                        handleChipDelete(
                                          value,
                                          partnerFilter,
                                          "partnerFilter"
                                        )
                                      }
                                    />
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
                  {/* <div className="filter-control">
                    <FormControl fullWidth size="small">
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        multiple
                        displayEmpty
                        disabled={partnerFilter && partnerFilter.length < 1}
                        value={agentFilter}
                        onChange={handleAgentChange}
                        input={<OutlinedInput />}
                        // MenuProps={MenuProps}
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
                                  return (
                                    <Chip
                                      key={value}
                                      label={value}
                                      deleteIcon={
                                        <ClearIcon
                                          onMouseDown={(event) =>
                                            event.stopPropagation()
                                          }
                                        />
                                      }
                                      onDelete={() =>
                                        handleChipDelete(
                                          value,
                                          agentFilter,
                                          "agentFilter"
                                        )
                                      }
                                    />
                                  );
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
                  </div> */}
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
                          // MenuProps={MenuProps}
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
                                    return (
                                      <Chip
                                        clickable
                                        key={value}
                                        label={value}
                                        deleteIcon={
                                          <ClearIcon
                                            onMouseDown={(event) =>
                                              event.stopPropagation()
                                            }
                                          />
                                        }
                                        onDelete={() =>
                                          handleChipDelete(
                                            value,
                                            statusFilter,
                                            "statusFilter"
                                          )
                                        }
                                      />
                                    );
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
                                    return (
                                      <Chip
                                        key={value}
                                        label={value}
                                        deleteIcon={
                                          <ClearIcon
                                            onMouseDown={(event) =>
                                              event.stopPropagation()
                                            }
                                          />
                                        }
                                        onDelete={() =>
                                          handleChipDelete(
                                            value,
                                            verticalFilter,
                                            "verticalFilter"
                                          )
                                        }
                                      />
                                    );
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
                    <FormControl fullWidth size="small" >
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
                                  return (
                                    <Chip
                                      key={value}
                                      label={value}
                                      deleteIcon={
                                        <ClearIcon
                                          onMouseDown={(event) =>
                                            event.stopPropagation()
                                          }
                                        />
                                      }
                                      onDelete={() =>
                                        handleChipDelete(
                                          value,
                                          empSizeFilter,
                                          "empSizeFilter"
                                        )
                                      }
                                    />
                                  );
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
                    <FormControl fullWidth size="small">
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
                                  return (
                                    <Chip
                                      key={value}
                                      label={value}
                                      deleteIcon={
                                        <ClearIcon
                                          onMouseDown={(event) =>
                                            event.stopPropagation()
                                          }
                                        />
                                      }
                                      onDelete={() =>
                                        handleChipDelete(
                                          value,
                                          regionsFilter,
                                          "regionsFilter"
                                        )
                                      }
                                    />
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
                  {userRole === 2 || userRole === 3 ? <>
                    <div className="filter-control">
                      <FormControl fullWidth size="small">
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          size="small"
                          displayEmpty
                          // multiple
                          value={countryFilter}
                          onChange={handleCountryChange}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          disabled={!countryList ? true : false}
                          // || countryList?.length < 1
                          // title={!countryList ? 'Please select Region first' : false}
                          // onMouseEnter={() => !countryList ? toast.error('Please select Region first') : false}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                          // onFocus={handleDropdownOpen}
                          renderValue={(selected) => {
                            if (!selected || selected.length === 0) {
                              return <em>Select Country</em>;
                            } else {
                              return (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {/* {selected.map((value) => {
                                  return ( */}
                                  <Chip
                                    key={selected}
                                    label={selected}
                                    deleteIcon={
                                      <ClearIcon
                                        onMouseDown={(event) =>
                                          event.stopPropagation()
                                        }
                                      />
                                    }
                                    onDelete={() => {
                                      dispatch(countryFilterAction(''));
                                      dispatch(stateFilterAction([]));
                                      dispatch(stateListAction(null));
                                      dispatch(cityFilterAction([]));
                                      dispatch(cityListAction(null));
                                    }}
                                  />


                                </Box>
                              );
                            }
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {countryList &&
                            countryList.map((name) => (
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
                          labelId="demo-multiple-state-label"
                          id="demo-multiple-state"
                          size="small"
                          displayEmpty
                          multiple
                          value={stateFilter}
                          onChange={handleStateChange}
                          disabled={!stateList ? true : false}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                          renderValue={(selected) => {
                            if (!selected || selected.length === 0) {
                              return <em>Select State</em>;
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
                                      <Chip
                                        key={value}
                                        label={value}
                                        deleteIcon={
                                          <ClearIcon
                                            onMouseDown={(event) =>
                                              event.stopPropagation()
                                            }
                                          />
                                        }
                                        onDelete={() =>
                                          handleChipDelete(
                                            value,
                                            stateFilter,
                                            "stateFilter"
                                          )
                                        }
                                      />
                                    );
                                  })}
                                </Box>
                              );
                            }
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {stateList &&
                            stateList.map((name) => (
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
                          labelId="demo-multiple-state-label"
                          id="demo-multiple-city"
                          size="small"
                          displayEmpty
                          multiple
                          value={cityFilter}
                          onChange={handleCityChange}
                          disabled={!cityList ? true : false}
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                          renderValue={(selected) => {
                            if (!selected || selected.length === 0) {
                              return <em>Select City</em>;
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
                                      <Chip
                                        key={value}
                                        label={value}
                                        deleteIcon={
                                          <ClearIcon
                                            onMouseDown={(event) =>
                                              event.stopPropagation()
                                            }
                                          />
                                        }
                                        onDelete={() =>
                                          handleChipDelete(
                                            value,
                                            cityFilter,
                                            "cityFilter"
                                          )
                                        }
                                      />
                                    );
                                  })}
                                </Box>
                              );
                            }
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {cityList &&
                            cityList.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </> : ''}
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
                  Advanced Search
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
                        // MenuProps={MenuProps}
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
                                  return (
                                    <Chip
                                      key={value}
                                      label={value}
                                      deleteIcon={
                                        <ClearIcon
                                          onMouseDown={(event) =>
                                            event.stopPropagation()
                                          }
                                        />
                                      }
                                      onDelete={() =>
                                        handleChipDelete(
                                          value,
                                          revenueFilter,
                                          "revenueFilter"
                                        )
                                      }
                                    />
                                  );
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
                        // MenuProps={MenuProps}
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
                                  return (
                                    <Chip
                                      key={value}
                                      label={value}
                                      deleteIcon={
                                        <ClearIcon
                                          onMouseDown={(event) =>
                                            event.stopPropagation()
                                          }
                                        />
                                      }
                                      onDelete={() =>
                                        handleChipDelete(
                                          value,
                                          technographicsFilter,
                                          "technographicsFilter"
                                        )
                                      }
                                    />
                                  );
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
          {/* <div className="sidebar-filter view-accepted"> */}
          <div className="sidebar accepted-policy" style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
            <div className="sidebar-list">
              <MenuList>
                <MenuItem>

                  <a
                    href="/policy-acceptance?view=1"
                    target="_blank"
                    className='btn btn-primary'
                  >
                    <i className="bi bi-eye"></i> View Accepted Policy
                  </a>
                </MenuItem>
              </MenuList>
            </div>
          </div>
          {/* </div> */}
        </div>
      </aside >
      <ToastContainer />
    </>
  );
}
