import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
            backgroundColor: "#f4f8ff",
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
        <TableCell width="110px">{props.partner.region}</TableCell>
        <TableCell width="300px">{props.partner.nominatedAccount}</TableCell>
        <TableCell width="280px">{props.partner.profiledAccount}</TableCell>
        <TableCell width="260px">{props.partner.contacts}</TableCell>
        <TableCell width="310px">{props.partner.badData}</TableCell>
        <TableCell width="350px">{props.partner.opportunities}</TableCell>
        <TableCell width="250px">{props.partner.followUp}</TableCell>
        <TableCell width="340px">{props.partner.disqualified}</TableCell>
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
                <>
                  <TableRow
                    sx={{
                      "& > *": {
                        borderBottom: "unset",
                        textAlign: "left",
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    <TableCell sx={{ p: 0 }}>
                      <IconButton aria-label="expand row" size="small">
                        {open ? "" : ""}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" width="265px">
                      {userList.region}
                    </TableCell>
                    <TableCell width="300px">
                      {userList.nominatedAccount}
                    </TableCell>
                    <TableCell width="300px">
                      {userList.profiledAccount}
                    </TableCell>
                    <TableCell width="300px">{userList.contacts}</TableCell>
                    <TableCell width="300px">{userList.badData}</TableCell>
                    <TableCell width="300px">
                      {userList.opportunities}
                    </TableCell>
                    <TableCell width="300px">{userList.followUp}</TableCell>
                    <TableCell width="300px">{userList.disqualified}</TableCell>
                  </TableRow>
                </>
              ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const RegionRow = (props) => {
  const { regionList } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset", backgroundColor: "#fff" },
        }}
      >
        <TableCell sx={{ p: 1, m: 1 }}>
          <IconButton
            disabled={!regionList.partnerList}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {!open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" width="300px" scope="row">
          {regionList.region}
        </TableCell>
        <TableCell width="300px">{regionList.nominatedAccount}</TableCell>
        <TableCell width="300px">{regionList.profiledAccount}</TableCell>
        <TableCell width="300px">{regionList.contacts}</TableCell>
        <TableCell width="300px">{regionList.badData}</TableCell>
        <TableCell width="300px">{regionList.opportunities}</TableCell>
        <TableCell width="300px">{regionList.followUp}</TableCell>
        <TableCell width="300px">{regionList.disqualified}</TableCell>
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
            {regionList.partnerList &&
              regionList.partnerList.map((partner) => (
                <PartnerRow key={partner.region} partner={partner} />
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

        <TableCell component="th" width="300px" scope="row">
          {row && row.region}
        </TableCell>
        <TableCell width="300px">{row.nominatedAccount}</TableCell>
        <TableCell width="300px">{row.profiledAccount}</TableCell>
        <TableCell width="300px">{row.contacts}</TableCell>
        <TableCell width="300px">{row.badData}</TableCell>
        <TableCell width="300px">{row.opportunities}</TableCell>
        <TableCell width="300px">{row.followUp}</TableCell>
        <TableCell width="300px">{row.disqualified}</TableCell>
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
        regionIds: regionsFilter,
        partnerIds: partnerFilter,
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
