import { useMemo } from "react";
import DataGrid from "react-data-grid";
import { CellExpanderFormatter } from "./CellExpanderFormatter";
const dataSource = [
  {
    region: "AUNZ",
    nominatedAccount: 515,
    profiledAccount: 515,
    contacts: 2060,
    badData: 0,
    opportunities: 0,
    followUp: 0,
    disqualified: 0,
    partnerList: [
      {
        region: "Ajeetv",
        nominatedAccount: 224,
        profiledAccount: 224,
        contacts: 896,
        badData: 0,
        opportunities: 0,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rahul",
            nominatedAccount: 224,
            profiledAccount: 224,
            contacts: 896,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
      {
        region: "Shubham.Jaiswal",
        nominatedAccount: 291,
        profiledAccount: 291,
        contacts: 1164,
        badData: 0,
        opportunities: 0,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rohit",
            nominatedAccount: 176,
            profiledAccount: 176,
            contacts: 704,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
          {
            region: "Manish Verma",
            nominatedAccount: 115,
            profiledAccount: 115,
            contacts: 460,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
    ],
  },
  {
    region: "Greater China",
    nominatedAccount: 301,
    profiledAccount: 301,
    contacts: 1204,
    badData: 0,
    opportunities: 0,
    followUp: 0,
    disqualified: 0,
    partnerList: [
      {
        region: "Ajeetv",
        nominatedAccount: 132,
        profiledAccount: 132,
        contacts: 528,
        badData: 0,
        opportunities: 0,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rahul",
            nominatedAccount: 132,
            profiledAccount: 132,
            contacts: 528,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
      {
        region: "Shubham.Jaiswal",
        nominatedAccount: 169,
        profiledAccount: 169,
        contacts: 676,
        badData: 0,
        opportunities: 0,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rohit",
            nominatedAccount: 103,
            profiledAccount: 103,
            contacts: 412,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
          {
            region: "Manish Verma",
            nominatedAccount: 66,
            profiledAccount: 66,
            contacts: 264,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
    ],
  },
  {
    region: "India",
    nominatedAccount: 849,
    profiledAccount: 841,
    contacts: 3396,
    badData: 9,
    opportunities: 1,
    followUp: 0,
    disqualified: 0,
    partnerList: [
      {
        region: "Ajeetv",
        nominatedAccount: 320,
        profiledAccount: 318,
        contacts: 1280,
        badData: 0,
        opportunities: 0,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rahul",
            nominatedAccount: 320,
            profiledAccount: 318,
            contacts: 1280,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
      {
        region: "Shubham.Jaiswal",
        nominatedAccount: 529,
        profiledAccount: 523,
        contacts: 2116,
        badData: 9,
        opportunities: 1,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rohit",
            nominatedAccount: 219,
            profiledAccount: 216,
            contacts: 876,
            badData: 1,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
          {
            region: "Manish Verma",
            nominatedAccount: 310,
            profiledAccount: 307,
            contacts: 1240,
            badData: 8,
            opportunities: 1,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
    ],
  },
  {
    region: "Korea",
    nominatedAccount: 206,
    profiledAccount: 206,
    contacts: 824,
    badData: 0,
    opportunities: 0,
    followUp: 0,
    disqualified: 0,
    partnerList: [
      {
        region: "Ajeetv",
        nominatedAccount: 88,
        profiledAccount: 88,
        contacts: 352,
        badData: 0,
        opportunities: 0,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rahul",
            nominatedAccount: 88,
            profiledAccount: 88,
            contacts: 352,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
      {
        region: "Shubham.Jaiswal",
        nominatedAccount: 118,
        profiledAccount: 118,
        contacts: 472,
        badData: 0,
        opportunities: 0,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rohit",
            nominatedAccount: 73,
            profiledAccount: 73,
            contacts: 292,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
          {
            region: "Manish Verma",
            nominatedAccount: 45,
            profiledAccount: 45,
            contacts: 180,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
    ],
  },
  {
    region: "SEA",
    nominatedAccount: 293,
    profiledAccount: 293,
    contacts: 1172,
    badData: 0,
    opportunities: 0,
    followUp: 0,
    disqualified: 0,
    partnerList: [
      {
        region: "Ajeetv",
        nominatedAccount: 130,
        profiledAccount: 130,
        contacts: 520,
        badData: 0,
        opportunities: 0,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rahul",
            nominatedAccount: 130,
            profiledAccount: 130,
            contacts: 520,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
      {
        region: "Shubham.Jaiswal",
        nominatedAccount: 163,
        profiledAccount: 163,
        contacts: 652,
        badData: 0,
        opportunities: 0,
        followUp: 0,
        disqualified: 0,
        userList: [
          {
            region: "Rohit",
            nominatedAccount: 94,
            profiledAccount: 94,
            contacts: 376,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
          {
            region: "Manish Verma",
            nominatedAccount: 69,
            profiledAccount: 69,
            contacts: 276,
            badData: 0,
            opportunities: 0,
            followUp: 0,
            disqualified: 0,
          },
        ],
      },
    ],
  },
];

const ActivityGrid = () => {
  const columns = useMemo(() => {
    return [
      {
        key: "regions",
        name: "Regions",
        frozen: true,
        formatter({ row, isCellSelected }) {
          const hasChildren = row?.children?.length !== 0;
          const style = { marginInlineStart: 10 * row?.level };
          return (
            <>
              {hasChildren && (
                <CellExpanderFormatter
                  isCellSelected={isCellSelected}
                  expanded={row.isExpanded === true}
                  onCellExpand={
                    () => true
                    // dispatch({ id: row.id, type: "toggleSubRow" })
                  }
                />
              )}

              <div className="rdg-cell-value">
                <div style={style}>{row.id}</div>
              </div>
            </>
          );
        },
      },
      {
        key: "nominatedAccount",
        name: "Nominated Accounts",
      },
      {
        key: "profiledAccount",
        name: "Profiled Accounts",
      },
      {
        key: "contacts",
        name: "Contacts",
      },
      {
        key: "badData",
        name: "Bad Data (Contacts)",
      },
      {
        key: "opportunities",
        name: "Opportunities",
      },
      {
        key: "followUp",
        name: "Follow Up",
      },
      {
        key: "disqualified",
        name: "Disqualified",
      },
    ];
  }, []);

  return (
    <>
      <DataGrid
        columns={columns}
        rows={dataSource}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        className="rdg-light"
        direction={"ltr"}
      />
    </>
  );
};
export default ActivityGrid;
