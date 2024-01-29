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
import {
  accountActivity,
  accountActivityAll,
} from "../../Services/dashBoardService";

const PartnerRow = (props) => {
  const [partnerOpen, setPartnerOpen] = React.useState(false);
  return (
    <>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor: "#fff",
          },
        }}
      >
        <TableCell sx={{ p: 0 }}>
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

        <TableCell width="210px">{props.partner.region}</TableCell>
        <TableCell width="300px">{props.partner.nominatedAccount}</TableCell>
        <TableCell width="280px">{props.partner.profiledAccount}</TableCell>
        <TableCell width="260px">{props.partner.contacts}</TableCell>
        <TableCell width="310px" sx={{ color: "#FF0000" }}>
          {props.partner.badData}
        </TableCell>
        <TableCell width="350px" sx={{ color: "#228B22" }}>
          {props.partner.opportunities}
        </TableCell>
        <TableCell width="250px">{props.partner.followUp}</TableCell>
        <TableCell width="340px" sx={{ color: "#FF0000" }}>
          {props.partner.disqualified}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingRight: 0,
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
            backgroundColor: "#f4f8ff",
          },
        }}
      >
        <TableCell sx={{ p: 1, m: 1, minWidth: "50px" }}>
          <IconButton aria-label="expand row" size="small">
            <PersonOutlineIcon />
          </IconButton>
        </TableCell>

        <TableCell width="210px">{props.user.region}</TableCell>
        <TableCell width="300px">{props.user.nominatedAccount}</TableCell>
        <TableCell width="280px">{props.user.profiledAccount}</TableCell>
        <TableCell width="260px">{props.user.contacts}</TableCell>
        <TableCell width="310px" sx={{ color: "#FF0000" }}>
          {props.user.badData}
        </TableCell>
        <TableCell width="350px" sx={{ color: "#228B22" }}>
          {props.user.opportunities}
        </TableCell>
        <TableCell width="250px">{props.user.followUp}</TableCell>
        <TableCell width="340px" sx={{ color: "#FF0000" }}>
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
          <IconButton
            // disabled={!regionList.partnerList || regionList.userList}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {!open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell width="300px" scope="row">
          {regionList.region}
        </TableCell>
        <TableCell width="300px">{regionList.nominatedAccount}</TableCell>
        <TableCell width="300px">{regionList.profiledAccount}</TableCell>
        <TableCell width="300px">{regionList.contacts}</TableCell>
        <TableCell width="300px" sx={{ color: "#FF0000" }}>
          {regionList.badData}
        </TableCell>
        <TableCell width="300px" sx={{ color: "#228B22" }}>
          {regionList.opportunities}
        </TableCell>
        <TableCell width="300px">{regionList.followUp}</TableCell>
        <TableCell width="300px" sx={{ color: "#FF0000" }}>
          {regionList.disqualified}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingRight: 0,
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

        <TableCell width="250px" scope="row">
          {row && row.region}
        </TableCell>
        <TableCell width="180px">{row.nominatedAccount}</TableCell>
        <TableCell width="300px">{row.profiledAccount}</TableCell>
        <TableCell width="350px">{row.contacts}</TableCell>
        <TableCell width="350px" sx={{ color: "#FF0000" }}>
          {row.badData}
        </TableCell>
        <TableCell width="200px" sx={{ color: "#228B22" }}>
          {row.opportunities}
        </TableCell>
        <TableCell width="250px">{row.followUp}</TableCell>
        <TableCell width="300px" sx={{ color: "#FF0000" }}>
          {row.disqualified}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingRight: 0,
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
      const response = await accountActivity({
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
      const response = await accountActivityAll({
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
            <div className="col-md-6">
              <Typography className="page-title">Account Activity</Typography>
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
            <Box className="col-md-6 text-right" sx={{ marginTop: "40px" }}>
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
            </Box>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="grid-data">
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead
                    component="th"
                    scope="row"
                    sx={{
                      fontSize: "14px",
                      height: "50px",
                      backgroundColor: "#4286f5",
                      color: "#fff",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <TableRow>
                      {/*TOP Row*/}
                      <TableCell />
                      <TableCell
                        sx={{
                          p: 0,
                          alignItems: "center",
                          color: "#fff",
                          minWidth: 150,
                        }}
                      >
                        Regions
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",
                          // minWidth: 10.0,
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
