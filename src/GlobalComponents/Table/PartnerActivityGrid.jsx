import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
import { partnerActivityList as partnerActivityListAction } from "../../store/Features/accountSlice";

import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { partnerActivity } from "../../Services/dashBoardService";

export const PartnerActivityGrid = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [partnerOpen, setPartnerOpen] = React.useState(false);
  const { partnerActivityList } = useSelector((state) => state.account);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPartnerActivityListDetails();
  }, []);

  // const expandAll = () => {
  //   setOpen(true);
  //   setPartnerOpen(true);
  // };

  const Row = (props) => {
    const { row } = props;

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
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
              {row.partnerList &&
                row.partnerList.map((partner) => (
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
                          disabled={!partner.userList}
                          aria-label="expand row"
                          size="small"
                          onClick={() => setPartnerOpen(!partnerOpen)}
                        >
                          {partnerOpen ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell width="300px">{partner.region}</TableCell>
                      <TableCell width="300px">
                        {partner.assignedAccounts}
                      </TableCell>
                      <TableCell width="300px">
                        {partner.assignedContacts}
                      </TableCell>
                      <TableCell width="300px">
                        {partner.accountsViewed}
                      </TableCell>
                      <TableCell width="300px">
                        {partner.accountsTouched}
                      </TableCell>
                      <TableCell width="300px">
                        {partner.contactsTouched}
                      </TableCell>
                      <TableCell width="300px">
                        {partner.loginsPerMonth}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          paddingBottom: 0,
                          paddingTop: 0,
                          backgroundColor: "#fff",
                        }}
                        colSpan={20}
                      >
                        <Collapse in={partnerOpen} timeout="auto" unmountOnExit>
                          {partner.userList &&
                            partner.userList.map((userList) => (
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
                                    <IconButton
                                      aria-label="expand row"
                                      size="small"
                                      onClick={() => setOpen(!open)}
                                    >
                                      {open ? "" : ""}
                                    </IconButton>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    width="300px"
                                  >
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
                ))}
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <Box>
        <Box sx={{ pt: 2, pb: 2 }}>
          <Typography className="page-title">Patner Activity</Typography>
        </Box>
        <Box sx={{ display: "flex", pb: 2, justifyContent: "space-between" }}>
          <Box>
            <Button
              // onClick={() => expandAll()}
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
            {partnerActivityList &&
              partnerActivityList.map((row) => (
                <Row key={row.name} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
