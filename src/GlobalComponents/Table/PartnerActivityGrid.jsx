import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
  partnerActivityAll as partnerActivityAllAction,
  partnerActivityList as partnerActivityListAction,
} from "../../store/Features/accountSlice";

import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
// import {
//   getPartnerActivityAll,
//   partnerActivity,
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
            {!partnerOpen ? (
              <KeyboardArrowRightIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell width="300px">{props.partner.region}</TableCell>
        <TableCell width="300px">{props.partner.assignedAccounts}</TableCell>
        <TableCell width="300px">{props.partner.assignedContacts}</TableCell>
        <TableCell width="300px">{props.partner.accountsViewed}</TableCell>
        <TableCell width="300px">{props.partner.accountsTouched}</TableCell>
        <TableCell width="300px">{props.partner.contactsTouched}</TableCell>
        <TableCell width="300px">{props.partner.loginsPerMonth}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "#f4f8ff",
          }}
          colSpan={20}
        >
          <Collapse in={partnerOpen} timeout="auto" unmountOnExit>
            {props.partner.userList &&
              props.partner.userList.map((userList) => (
                <>
                  <TableRow
                    sx={{
                      "& > *": {
                        borderBottom: "unset",
                        textAlign: "left",
                        backgroundColor: "#f4f8ff",
                      },
                    }}
                  >
                    <TableCell sx={{ p: 1, m: 1, minWidth: "50px" }}>
                      <IconButton aria-label="expand row" size="small">
                        <PersonOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" width="300px">
                      {userList.region}
                    </TableCell>
                    <TableCell width="300px">
                      {userList.assignedAccounts}
                    </TableCell>
                    <TableCell width="300px">
                      {userList.assignedContacts}
                    </TableCell>
                    <TableCell width="300px">
                      {userList.accountsViewed}
                    </TableCell>
                    <TableCell width="300px">
                      {userList.accountsTouched}
                    </TableCell>
                    <TableCell width="300px">
                      {userList.contactsTouched}
                    </TableCell>
                    <TableCell width="300px">
                      {userList.contactsTouched}
                    </TableCell>
                  </TableRow>
                </>
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

        <TableCell width="300px">{props.user.region}</TableCell>
        <TableCell width="300px">{props.user.assignedAccounts}</TableCell>
        <TableCell width="300px">{props.user.assignedContacts}</TableCell>
        <TableCell width="300px">{props.user.accountsViewed}</TableCell>
        <TableCell width="300px">{props.user.accountsTouched}</TableCell>
        <TableCell width="300px">{props.user.contactsTouched}</TableCell>
        <TableCell width="300px">{props.user.loginsPerMonth}</TableCell>
      </TableRow>
    </>
  );
};

const RegionRow = (props) => {
  const [partnerOpen, setPartnerOpen] = React.useState(false);
  const userData = JSON.parse(useGetLocalStorage("userData"));
  const userRole = userData?.roleId;

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
            // disabled={!props.region.partnerList}
            aria-label="expand row"
            size="small"
            onClick={() => setPartnerOpen(!partnerOpen)}
          >
            {!partnerOpen ? (
              <KeyboardArrowRightIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell width="300px">{props.region.region}</TableCell>
        <TableCell width="300px">{props.region.assignedAccounts}</TableCell>
        <TableCell width="300px">{props.region.assignedContacts}</TableCell>
        <TableCell width="300px">{props.region.accountsViewed}</TableCell>
        <TableCell width="300px">{props.region.accountsTouched}</TableCell>
        <TableCell width="300px">{props.region.contactsTouched}</TableCell>
        <TableCell width="300px">{props.region.loginsPerMonth}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "#f4f8ff",
          }}
          colSpan={20}
        >
          <Collapse in={partnerOpen} timeout="auto" unmountOnExit>
            {userRole === 1 &&
              props.region.partnerList &&
              props.region.partnerList.map((data) => (
                <PartnerRow key={data.region} partner={data} />
              ))}

            {userRole === 2 &&
              props.region.userList &&
              props.region.userList.map((user) => (
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
            // disabled={!row.regionList}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {!open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" width="300px" scope="row">
          {row.region}
        </TableCell>
        <TableCell width="300px">{row.assignedAccounts}</TableCell>
        <TableCell width="300px">{row.assignedContacts}</TableCell>
        <TableCell width="300px">{row.accountsViewed}</TableCell>
        <TableCell width="300px">{row.accountsTouched}</TableCell>
        <TableCell width="300px">{row.contactsTouched}</TableCell>
        <TableCell width="300px">{row.loginsPerMonth}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingRight: 0,
            backgroundColor: "#ededed",
          }}
          colSpan={20}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.regionList &&
              row.regionList.map((data) => (
                <RegionRow key={data.region} region={data} />
              ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const PartnerActivityGrid = () => {
  const dispatch = useDispatch();
  const { regionsFilter } = useSelector((state) => state.account);
  const { partnerFilter } = useSelector((state) => state.account);
  const { partnerActivityAll } = useSelector((state) => state.account);
  const userData = JSON.parse(useGetLocalStorage("userData"));

  const fetchPartnerActivityListDetails = async () => {
    try {
      const response = await partnerActivity({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
      });
      dispatch(partnerActivityListAction(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPartnerActivityAll = async () => {
    try {
      const response = await dashboardService.getPartnerActivityAll({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
      });

      const partnerList = await fetchPartnerActivityListDetails();
      response.data.regionList = partnerList;
      dispatch(partnerActivityAllAction(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPartnerActivityAll();
  }, [regionsFilter, partnerFilter]);

  return (
    <>
      <div className="main-content">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-md-6">
              <Typography className="page-title">Patner Activity</Typography>
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
            <div className="col-md-6 text-right">
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
                      backgroundColor: "#4286f5",
                      color: "#fff",
                      fontSize: "14px",
                      alignItems: "center",
                      textAlign: "center",
                      p: 0.5,
                    }}
                  >
                    <TableRow>
                      <TableCell />
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",
                          fontSize: "16px",
                        }}
                      >
                        Regions
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",
                          fontSize: "16px",
                        }}
                      >
                        Assigned Accounts
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",
                          fontSize: "16px",
                        }}
                      >
                        Assigned Contacts
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",
                          fontSize: "16px",
                        }}
                      >
                        Account Viewed
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",
                          fontSize: "16px",
                        }}
                      >
                        Account Touched
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",

                          fontSize: "16px",
                        }}
                      >
                        Contacts Touched
                      </TableCell>
                      <TableCell
                        sx={{
                          alignItems: "center",
                          color: "#fff",
                          fontSize: "16px",
                        }}
                      >
                        Login Per Month
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Row
                      key={partnerActivityAll && partnerActivityAll.region}
                      row={partnerActivityAll}
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
