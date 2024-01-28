import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activityList as activityListAction } from "../../store/Features/accountSlice";

import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { accountActivity } from "../../Services/dashBoardService";

// const dataSource = [
//   {
//     region: "AUNZ",
//     nominatedAccount: 515,
//     profiledAccount: 515,
//     contacts: 2060,
//     badData: 0,
//     opportunities: 0,
//     followUp: 0,
//     disqualified: 0,
//     partnerList: [
//       {
//         region: "Ajeetv",
//         nominatedAccount: 224,
//         profiledAccount: 224,
//         contacts: 896,
//         badData: 0,
//         opportunities: 0,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rahul",
//             nominatedAccount: 224,
//             profiledAccount: 224,
//             contacts: 896,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//       {
//         region: "Shubham.Jaiswal",
//         nominatedAccount: 291,
//         profiledAccount: 291,
//         contacts: 1164,
//         badData: 0,
//         opportunities: 0,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rohit",
//             nominatedAccount: 176,
//             profiledAccount: 176,
//             contacts: 704,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//           {
//             region: "Manish Verma",
//             nominatedAccount: 115,
//             profiledAccount: 115,
//             contacts: 460,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     region: "Greater China",
//     nominatedAccount: 301,
//     profiledAccount: 301,
//     contacts: 1204,
//     badData: 0,
//     opportunities: 0,
//     followUp: 0,
//     disqualified: 0,
//     partnerList: [
//       {
//         region: "Ajeetv",
//         nominatedAccount: 132,
//         profiledAccount: 132,
//         contacts: 528,
//         badData: 0,
//         opportunities: 0,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rahul",
//             nominatedAccount: 132,
//             profiledAccount: 132,
//             contacts: 528,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//       {
//         region: "Shubham.Jaiswal",
//         nominatedAccount: 169,
//         profiledAccount: 169,
//         contacts: 676,
//         badData: 0,
//         opportunities: 0,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rohit",
//             nominatedAccount: 103,
//             profiledAccount: 103,
//             contacts: 412,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//           {
//             region: "Manish Verma",
//             nominatedAccount: 66,
//             profiledAccount: 66,
//             contacts: 264,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     region: "India",
//     nominatedAccount: 849,
//     profiledAccount: 841,
//     contacts: 3396,
//     badData: 9,
//     opportunities: 1,
//     followUp: 0,
//     disqualified: 0,
//     partnerList: [
//       {
//         region: "Ajeetv",
//         nominatedAccount: 320,
//         profiledAccount: 318,
//         contacts: 1280,
//         badData: 0,
//         opportunities: 0,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rahul",
//             nominatedAccount: 320,
//             profiledAccount: 318,
//             contacts: 1280,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//       {
//         region: "Shubham.Jaiswal",
//         nominatedAccount: 529,
//         profiledAccount: 523,
//         contacts: 2116,
//         badData: 9,
//         opportunities: 1,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rohit",
//             nominatedAccount: 219,
//             profiledAccount: 216,
//             contacts: 876,
//             badData: 1,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//           {
//             region: "Manish Verma",
//             nominatedAccount: 310,
//             profiledAccount: 307,
//             contacts: 1240,
//             badData: 8,
//             opportunities: 1,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     region: "Korea",
//     nominatedAccount: 206,
//     profiledAccount: 206,
//     contacts: 824,
//     badData: 0,
//     opportunities: 0,
//     followUp: 0,
//     disqualified: 0,
//     partnerList: [
//       {
//         region: "Ajeetv",
//         nominatedAccount: 88,
//         profiledAccount: 88,
//         contacts: 352,
//         badData: 0,
//         opportunities: 0,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rahul",
//             nominatedAccount: 88,
//             profiledAccount: 88,
//             contacts: 352,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//       {
//         region: "Shubham.Jaiswal",
//         nominatedAccount: 118,
//         profiledAccount: 118,
//         contacts: 472,
//         badData: 0,
//         opportunities: 0,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rohit",
//             nominatedAccount: 73,
//             profiledAccount: 73,
//             contacts: 292,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//           {
//             region: "Manish Verma",
//             nominatedAccount: 45,
//             profiledAccount: 45,
//             contacts: 180,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     region: "SEA",
//     nominatedAccount: 293,
//     profiledAccount: 293,
//     contacts: 1172,
//     badData: 0,
//     opportunities: 0,
//     followUp: 0,
//     disqualified: 0,
//     partnerList: [
//       {
//         region: "Ajeetv",
//         nominatedAccount: 130,
//         profiledAccount: 130,
//         contacts: 520,
//         badData: 0,
//         opportunities: 0,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rahul",
//             nominatedAccount: 130,
//             profiledAccount: 130,
//             contacts: 520,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//       {
//         region: "Shubham.Jaiswal",
//         nominatedAccount: 163,
//         profiledAccount: 163,
//         contacts: 652,
//         badData: 0,
//         opportunities: 0,
//         followUp: 0,
//         disqualified: 0,
//         userList: [
//           {
//             region: "Rohit",
//             nominatedAccount: 94,
//             profiledAccount: 94,
//             contacts: 376,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//           {
//             region: "Manish Verma",
//             nominatedAccount: 69,
//             profiledAccount: 69,
//             contacts: 276,
//             badData: 0,
//             opportunities: 0,
//             followUp: 0,
//             disqualified: 0,
//           },
//         ],
//       },
//     ],
//   },
// ];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [partnerOpen, setPartnerOpen] = React.useState(false);

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset", backgroundColor: "#cbe9f7" } }}
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

        <TableCell component="th" scope="row">
          {row.region}
        </TableCell>
        <TableCell>{row.nominatedAccount}</TableCell>
        <TableCell>{row.profiledAccount}</TableCell>
        <TableCell>{row.contacts}</TableCell>
        <TableCell>{row.badData}</TableCell>
        <TableCell>{row.opportunities}</TableCell>
        <TableCell>{row.followUp}</TableCell>
        <TableCell>{row.disqualified}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            // paddingLeft: 1,
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
                    <TableCell component="th" scope="row" width={"100px"}>
                      {partner.region}
                    </TableCell>
                    <TableCell>{partner.nominatedAccount}</TableCell>
                    <TableCell>{partner.profiledAccount}</TableCell>
                    <TableCell>{partner.contacts}</TableCell>
                    <TableCell>{partner.badData}</TableCell>
                    <TableCell>{partner.opportunities}</TableCell>
                    <TableCell>{partner.followUp}</TableCell>
                    <TableCell>{partner.disqualified}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
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
                                  },
                                }}
                              >
                                <TableCell sx={{ p: 0.5, m: 0 }}>
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
                                  sx={{ maxWidth: "20px" }}
                                >
                                  {userList.region}
                                </TableCell>
                                <TableCell>
                                  {userList.nominatedAccount}
                                </TableCell>
                                <TableCell>
                                  {userList.profiledAccount}
                                </TableCell>
                                <TableCell>{userList.contacts}</TableCell>
                                <TableCell>{userList.badData}</TableCell>
                                <TableCell>{userList.opportunities}</TableCell>
                                <TableCell>{userList.followUp}</TableCell>
                                <TableCell>{userList.disqualified}</TableCell>
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
}

export const AccountActivityGrid = () => {
  const dispatch = useDispatch();
  const { activityList } = useSelector((state) => state.account);
  const userData = JSON.parse(useGetLocalStorage("userData"));

  const fetchActivityListDetails = async () => {
    try {
      const response = await accountActivity({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
      });
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
              activityList.map((row) => <Row key={row.name} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
