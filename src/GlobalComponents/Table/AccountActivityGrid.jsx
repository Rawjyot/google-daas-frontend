import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  activityList as activityListAction,
  regionsdropdown as regionDropdownAction,
} from "../../store/Features/accountSlice";

import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { accountActivity } from "../../Services/dashBoardService";

const PartnerRow = (props) => {
  const [partnerOpen, setPartnerOpen] = React.useState(false);
  return (
    <>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor: "#ededed",
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

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset", backgroundColor: "#cbe9f7" },
        }}
      >
        <TableCell sx={{ p: 1, m: 1 }}>
          <IconButton
            disabled={!row.partnerList}
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
            backgroundColor: "#ededed",
          }}
          colSpan={10}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.partnerList &&
              row.partnerList.map((partner) => (
                <PartnerRow key={partner.region} partner={partner} />
              ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const AccountActivityGrid = () => {
  const dispatch = useDispatch();
  const { activityList } = useSelector((state) => state.account);
  const userData = JSON.parse(useGetLocalStorage("userData"));

  const extractRegions = (data) => {
    console.log("Data => ", data);
    const partnerList = [];
    const regions = data.map((data) => data.region);
    data.map((data) => {
      data.partnerList.map((partner) => {
        partnerList.push(partner.region);
      });
    });

    dispatch(regionDropdownAction(regions));
  };

  const fetchActivityListDetails = async () => {
    try {
      const response = await accountActivity({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
      });

      extractRegions(response.data);
      dispatch(activityListAction(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivityListDetails();
  }, []);

  return (
    <>
      <Box>
        <Box sx={{ pt: 2, pb: 2 }}>
          <Typography className="page-title">Account Activity</Typography>
        </Box>
        <Box sx={{ display: "flex", pb: 2, justifyContent: "space-between" }}>
          <Box>
            <Button
              variant="contained"
              sx={{
                alignItems: "center",
                textAlign: "center",
                width: "220px",
              }}
            >
              Expand All
            </Button>
          </Box>
          <Box sx={{ pr: 1 }}>
            <Link to="/account-list">
              <Button
                variant="contained"
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  width: "220px",
                }}
                startIcon={<ArrowBackIcon />}
              >
                View All Account
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead
            component="th"
            scope="row"
            sx={{
              backgroundColor: "#37BCF8",
              color: "#fff",
              fontSize: "14px",
              alignItems: "center",
              textAlign: "center",
              p: 0.5,
            }}
          >
            <TableRow>
              {/*TOP Row*/}
              <TableCell />
              <TableCell
                sx={{
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "16px",
                  minWidth: 100,
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
                Nominated Accounts
              </TableCell>
              <TableCell
                sx={{
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Profiled Accounts
              </TableCell>
              <TableCell
                sx={{
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Contacts
              </TableCell>
              <TableCell
                sx={{
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Bad Data (Contacts)
              </TableCell>
              <TableCell
                sx={{
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Opportunities
              </TableCell>
              <TableCell
                sx={{
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Follow Up
              </TableCell>
              <TableCell
                sx={{
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Disqualified
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityList &&
              activityList.map((row) => <Row key={row.region} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
