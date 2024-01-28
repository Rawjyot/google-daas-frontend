import "./sidebar.css";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { revenueFilter, sizeFilter, stateFilter, statusFilter } from "../../store/Features/filterSlice";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OutlinedInput from '@mui/material/OutlinedInput';


import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Sidebar() {



  const AutoData = [ 
    { title: 'Region One'}, 
    { title: 'Region Two'}, 
    { title: 'Region Three'}, 
    { title: 'Region Four'}, 
    { title: 'Region Five'}, 
  ];

  

  // For Select
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  // For Select End


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
                  <Autocomplete fullWidth size="small"
                    multiple
                    limitTags={2}
                    input={<OutlinedInput />}
                    id="multiple-limit-tags"
                    options={AutoData}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[]}
                    renderInput={(params) => (
                      <TextField {...params}  placeholder="Region" />
                    )}
                    sx={{ width: '500px' }}
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
