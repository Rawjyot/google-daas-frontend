import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  FormControl,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
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

  const AutoData = [
    { title: "Region One" },
    { title: "Region Two" },
    { title: "Region Three" },
    { title: "Region Four" },
    { title: "Region Five" },
  ];

  // For Select
  const [age, setAge] = useState("");

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
          <hr className="mt-3 mb-3 bg-white"></hr>
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
                    <Select
                      labelId="status"
                      size="small"
                      input={<OutlinedInput />}
                      id="status-select"
                      value={0}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>Status</MenuItem>
                      <MenuItem value={10}>Status One</MenuItem>
                      <MenuItem value={20}>Status Two</MenuItem>
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
                      <MenuItem value={0}>Industry</MenuItem>
                      <MenuItem value={10}>Industry One</MenuItem>
                      <MenuItem value={20}>Industry Two</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="filter-control">
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="status"
                      id="status-select"
                      input={<OutlinedInput />}
                      value={0}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>Size One</MenuItem>
                      <MenuItem value={10}>Size One</MenuItem>
                      <MenuItem value={20}>Size Two</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="filter-control">
                  <Autocomplete
                    fullWidth
                    size="small"
                    multiple
                    limitTags={2}
                    input={<OutlinedInput />}
                    id="multiple-limit-tags"
                    options={AutoData}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[]}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Region" />
                    )}
                    sx={{ width: "200px" }}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
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
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="status"
                      input={<OutlinedInput />}
                      id="status-select"
                      value={0}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>Revenue</MenuItem>
                      <MenuItem value={10}>Revenue One</MenuItem>
                      <MenuItem value={20}>Revenue Two</MenuItem>
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
                      <MenuItem value={0}>Technographics</MenuItem>
                      <MenuItem value={10}>Technographics One</MenuItem>
                      <MenuItem value={20}>Technographics Two</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </aside>
    </>
  );
}
