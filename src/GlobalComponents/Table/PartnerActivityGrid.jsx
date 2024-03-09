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
            backgroundColor: "#f3f3f3",
          },
        }}
      >
        <TableCell sx={{ p: 1, m: 1 }}>
          {/* <IconButton
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
          </IconButton> */}
        </TableCell>
        <TableCell>{props.partner.region}</TableCell>
        <TableCell>{props.partner.assignedAccounts}</TableCell>
        <TableCell>{props.partner.assignedContacts}</TableCell>
        <TableCell>{props.partner.accountsViewed}</TableCell>
        <TableCell>{props.partner.accountsTouched}</TableCell>
        <TableCell>{props.partner.contactsTouched}</TableCell>
        <TableCell>{props.partner.loginsPerMonth}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#f4f8ff",
          }}
          colSpan={20}
        >
          {/* UserList Partner */}
          {/* <Collapse in={partnerOpen} timeout="auto" unmountOnExit>
            {props.partner.userList &&
              props.partner.userList.map((userList) => (
                <>
                  <TableRow
                    sx={{
                      "& > *": {
                        borderBottom: "unset",
                        textAlign: "left",
                        backgroundColor: "#f7faff",
                      },
                    }}
                  >
                    <TableCell>
                      <IconButton aria-label="expand row" size="small">
                        <PersonOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell scope="row" width="300px">
                      {userList.region}
                    </TableCell>
                    <TableCell>
                      {userList.assignedAccounts}
                    </TableCell>
                    <TableCell>
                      {userList.assignedContacts}
                    </TableCell>
                    <TableCell>
                      {userList.accountsViewed}
                    </TableCell>
                    <TableCell>
                      {userList.accountsTouched}
                    </TableCell>
                    <TableCell>
                      {userList.contactsTouched}
                    </TableCell>
                    <TableCell>
                      {userList.loginsPerMonth}
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </Collapse> */}
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

        <TableCell>{props.user.region}</TableCell>
        <TableCell>{props.user.assignedAccounts}</TableCell>
        <TableCell>{props.user.assignedContacts}</TableCell>
        <TableCell>{props.user.accountsViewed}</TableCell>
        <TableCell>{props.user.accountsTouched}</TableCell>
        <TableCell>{props.user.contactsTouched}</TableCell>
        <TableCell>{props.user.loginsPerMonth}</TableCell>
      </TableRow>
    </>
  );
};

const RegionRow = (props) => {
  const { expandAll } = props;
  const [partnerOpen, setPartnerOpen] = React.useState(expandAll);
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
        <TableCell sx={{ p: 1, m: 1 }}>
          {userRole === 1 ? (
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
          ) : (
            ""
          )}
        </TableCell>
        <TableCell scope="row">{props.region.region}</TableCell>
        <TableCell>{props.region.assignedAccounts}</TableCell>
        <TableCell>{props.region.assignedContacts}</TableCell>
        <TableCell>{props.region.accountsViewed}</TableCell>
        <TableCell>{props.region.accountsTouched}</TableCell>
        <TableCell>{props.region.contactsTouched}</TableCell>
        <TableCell>{props.region.loginsPerMonth}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#f4f8ff",
          }}
          colSpan={20}
        >
          <Collapse in={partnerOpen} timeout="auto" unmountOnExit>
            {userRole === 1 &&
              props.region.partnerList &&
              props.region.partnerList.map((data) => (
                <PartnerRow key={data.region} partner={data} expandAll={props.expandAll} />
              ))}

            {/* {userRole === 2 &&
              props.region.userList &&
              props.region.userList.map((user) => (
                <UserListRow key={user.region} user={user} />
              ))} */}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Row = (props) => {
  const { row, expandAll } = props;
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(expandAll);
  }, [expandAll])

  if (!row) return;

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset", backgroundColor: "#fff" },
        }}
      >
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#fff",
          }}
          colSpan={10}
        >
          <TableCell sx={{ p: 1, m: 1 }}>
            <IconButton
              // disabled={!row.regionList}
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open)
              }}
            >
              {!open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          <TableCell scope="row">
            {row.region}
          </TableCell>
          <TableCell>{row.assignedAccounts}</TableCell>
          <TableCell>{row.assignedContacts}</TableCell>
          <TableCell>{row.accountsViewed}</TableCell>
          <TableCell>{row.accountsTouched}</TableCell>
          <TableCell>{row.contactsTouched}</TableCell>
          <TableCell>{row.loginsPerMonth ? row.loginsPerMonth : '-'}</TableCell>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#ededed",
          }}
          colSpan={20}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.regionList &&
              row.regionList.map((data) => (
                <RegionRow key={data.region} region={data} expandAll={expandAll} />
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

  const [expandAll, setExpandAll] = React.useState(false);

  const handleExpandAllClick = () => {
    setExpandAll((prevExpandAll) => !prevExpandAll);
  };

  const userData = JSON.parse(useGetLocalStorage("userData"));

  const fetchPartnerActivityListDetails = async () => {
    try {
      const response = await dashboardService.partnerActivity({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
        dashboardFilter: {
          regionIds: regionsFilter,
          partnerIds: partnerFilter,
        },
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
        dashboardFilter: {
          regionIds: regionsFilter,
          partnerIds: partnerFilter,
        },
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
            <div className="col-md-6 col-12">
              <Typography className="page-title">Partner Activity</Typography>
            </div>
            <div className="col-md-6 col-12 text-md-right mt-4">
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
            {userData?.roleId == 1 ? <div className="col-md-12">
              <Button
                className="mt-4 mb-3"
                variant="contained"
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  width: "220px",
                }}
                onClick={handleExpandAllClick}
              >
                {expandAll ? "Collapse All" : "Expand All"}
              </Button>
            </div> : ''}
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
                      backgroundColor: "#4286f5",
                      color: "#fff",
                      fontSize: "14px",
                      alignItems: "center",
                      textAlign: "center",
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
                      expandAll={expandAll}
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
