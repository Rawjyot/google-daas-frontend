import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  activityAll as activityAllAction,
  activityList as activityListAction,
} from "../../store/Features/accountSlice";
Box;

import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
// import {
//   accountActivity,
//   accountActivityAll,
// } from "../../Services/dashBoardService";
import dashboardService from "../../Services/dashBoardService";
const PartnerRow = (props) => {
  const [partnerOpen, setPartnerOpen] = React.useState(false);
  return (
    <>

      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor: "#f3f3f3",
          },
        }}
      >
        <TableCell style={{
          padding: 8,
        }}>
          <IconButton
            disabled={!props.partner.userList}
            aria-label="expand row"
            size="small"
            onClick={() => setPartnerOpen(!partnerOpen)}
          >
            {partnerOpen ? (
              <KeyboardArrowRightIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        {/*Inner 1st Grid*/}

        <TableCell >{props.partner.region}</TableCell>
        <TableCell >{props.partner.nominatedAccount}</TableCell>
        <TableCell >{props.partner.profiledAccount}</TableCell>
        <TableCell >{props.partner.contacts}</TableCell>
        <TableCell sx={{ color: "#FF0000" }}>
          {props.partner.badData}
        </TableCell>
        <TableCell sx={{ color: "#228B22" }}>
          {props.partner.opportunities}
        </TableCell>
        <TableCell >{props.partner.followUp}</TableCell>
        <TableCell sx={{ color: "#FF0000" }}>
          {props.partner.disqualified}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#fff",
          }}
          colSpan={20}
        >
          <Collapse in={partnerOpen} timeout="auto" unmountOnExit>
            {/*Third Row*/}
            {props.partner.userList &&
              props.partner.userList.map((userList) => (
                <UserListRow key={userList.region} user={userList} />
              ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const UserListRow = (props) => {
  return (
    <>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor: "#f7faff",
          },
        }}
      >
        <TableCell sx={{ p: 1, m: 1 }}>
          <IconButton aria-label="expand row" size="small">
            <PersonOutlineIcon />
          </IconButton>
        </TableCell>

        <TableCell >{props.user.region}</TableCell>
        <TableCell >{props.user.nominatedAccount}</TableCell>
        <TableCell >{props.user.profiledAccount}</TableCell>
        <TableCell >{props.user.contacts}</TableCell>
        <TableCell sx={{ color: "#FF0000" }}>
          {props.user.badData}
        </TableCell>
        <TableCell sx={{ color: "#228B22" }}>
          {props.user.opportunities}
        </TableCell>
        <TableCell >{props.user.followUp}</TableCell>
        <TableCell sx={{ color: "#FF0000" }}>
          {props.user.disqualified}
        </TableCell>
      </TableRow>
    </>
  );
};

const RegionRow = (props) => {
  const { regionList } = props;
  const [open, setOpen] = React.useState(false);

  const userData = JSON.parse(useGetLocalStorage("userData"));
  const userRole = userData?.roleId;

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset", backgroundColor: "#fff" },
        }}
      >
        <TableCell sx={{ p: 1, m: 1 }}>
          {userRole != 3 ? <IconButton
            // disabled={!regionList.partnerList || regionList.userList}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {!open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> : ''}
        </TableCell>

        <TableCell scope="row">
          {regionList.region}
        </TableCell>
        <TableCell >{regionList.nominatedAccount}</TableCell>
        <TableCell >{regionList.profiledAccount}</TableCell>
        <TableCell >{regionList.contacts}</TableCell>
        <TableCell sx={{ color: "#FF0000" }}>
          {regionList.badData}
        </TableCell>
        <TableCell sx={{ color: "#228B22" }}>
          {regionList.opportunities}
        </TableCell>
        <TableCell >{regionList.followUp}</TableCell>
        <TableCell sx={{ color: "#FF0000" }}>
          {regionList.disqualified}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#fff",
          }}
          colSpan={10}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            {userRole === 1 &&
              regionList.partnerList &&
              regionList.partnerList.map((partner) => (
                <PartnerRow key={partner.region} partner={partner} />
              ))}

            {userRole === 2 &&
              regionList.userList &&
              regionList.userList.map((user) => (
                <UserListRow key={user.region} user={user} />
              ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  if (!row) return;

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset", backgroundColor: "#fff" },
        }}
      >
        <TableCell sx={{ p: 1, m: 1 }}>
          <IconButton
            disabled={!row.regionList}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {!open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell scope="row">
          {row && row.region}
        </TableCell>
        <TableCell >{row.nominatedAccount}</TableCell>
        <TableCell >{row.profiledAccount}</TableCell>
        <TableCell >{row.contacts}</TableCell>
        <TableCell sx={{ color: "#FF0000" }}>
          {row.badData}
        </TableCell>
        <TableCell sx={{ color: "#228B22" }}>
          {row.opportunities}
        </TableCell>
        <TableCell >{row.followUp}</TableCell>
        <TableCell sx={{ color: "#FF0000" }}>
          {row.disqualified}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#fff",
          }}
          colSpan={10}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.regionList &&
              row.regionList.map((data) => (
                <RegionRow key={data.region} regionList={data} />
              ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const AccountActivityGrid = () => {
  const dispatch = useDispatch();
  const { regionsFilter } = useSelector((state) => state.account);
  const { partnerFilter } = useSelector((state) => state.account);
  // const { activityList } = useSelector((state) => state.account);
  const { activityAll } = useSelector((state) => state.account);

  const userData = JSON.parse(useGetLocalStorage("userData"));
  const fetchActivityListDetails = async () => {
    try {
      const response = await dashboardService.accountActivity({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
        dashboardFilter: {
          regionIds: regionsFilter,
          partnerIds: partnerFilter,
        },
      });

      dispatch(activityListAction(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchActivityAll = async () => {
    try {
      const response = await dashboardService.accountActivityAll({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
      });

      const activityList = await fetchActivityListDetails();
      response.data.regionList = activityList;
      dispatch(activityAllAction(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivityAll();
  }, [regionsFilter, partnerFilter]);

  return (
    <>
      <div className="main-content">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-md-6 col-12">
              <Typography className="page-title">Account Activity</Typography>
            </div>
            <div className="col-md-6 col-12 text-md-right mt-4" >
              <Link to="/account-list">
                <Button
                  variant="contained"
                  sx={{
                    alignItems: "center",
                    textAlign: "center",
                    width: "220px",
                  }}
                  startIcon={<VisibilityIcon />}
                >
                  View All Account
                </Button>
              </Link>
            </div>
            <div className="col-md-12">
              <Button
                className="mt-4 mb-3"
                variant="contained"
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  width: "220px",
                }}
              >
                Expand All
              </Button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="grid-data dashboard-tabel">
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead
                    component="th"
                    scope="row"
                    sx={{
                      fontSize: "13px",
                      height: "50px",
                      backgroundColor: "#4286f5",
                      color: "#fff",
                      alignItems: "center",
                    }}
                  >
                    <TableRow>
                      {/*TOP Row*/}
                      <TableCell />
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",

                        }}
                      >
                        Regions
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",

                        }}
                      >
                        Nominated Accounts
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",

                        }}
                      >
                        Profiled Accounts
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",

                        }}
                      >
                        Contacts
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",

                        }}
                      >
                        Bad Data (Contacts)
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",

                        }}
                      >
                        Opportunities
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",

                        }}
                      >
                        Follow Up
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",

                        }}
                      >
                        Disqualified
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Row
                      key={activityAll && activityAll.region}
                      row={activityAll}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
