import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Box from "@mui/material/Box";
import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";



ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
export const AccountListGrid = (props) => {
  const gridRef = useRef();
  const { accountListData } = useSelector((state) => state.account);
  const gridStyle = useMemo(() => ({ height: "65%", width: "100%" }), []);
  const [currentPage, setCurrentPage] = useState(0);
  // Custom cell renderer function for the "Account Name" column
  const accountNameCellRenderer = (params) => {
    const accountName = params.data.accountName;
    const detailPageLink = `/account-details/${params.data.accountId}`; // Detail page link to show

    return (
      <Link to={detailPageLink} style={{ textDecoration: "none" }}>
        {accountName}
      </Link>
    );
  };
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      wrapText: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    {
      field: "accountName",
      headerName: "Account Name",
      minWidth: 300,
      cellStyle: (params) => {
        return { textDecoration: "underline", color: "#4185F4" };
      },
      cellRenderer: accountNameCellRenderer,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      minWidth: 180,
    },
    {
      field: "empSize",
      headerName: "Size (Global)",
      minWidth: 120,
    },
    {
      field: "vertical",
      headerName: "Industry",
      minWidth: 220,
    },
    {
      field: "revenue",
      headerName: "Revenue",
      minWidth: 100,
    },
    {
      field: "boardlineNumber1",
      headerName: "Boardline",
      minWidth: 120,
    },
    {
      field: "city",
      headerName: "City (Country HQ)",
      minWidth: 160,
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 120,
    },
    {
      field: "country",
      headerName: "Country",
      minWidth: 150,
    },
    {
      field: "region",
      headerName: "Region",
      minWidth: 150,
    },
    {
      field: "noOfContact",
      headerName: "Contacts",
      minWidth: 100,
    },
    {
      field: "noOfNewContact",
      headerName: "New Contacts",
      minWidth: 130,
    },
    {
      field: "accountStatus",
      headerName: "Status",
      minWidth: 120,
      cellStyle: (params) => {
        if (params.value === "Opportunity") {
          return { color: "green", fontWeight: 600 };
        }
        return null;
      },
    },
    {
      field: "partnerName",
      headerName: "Partner Name",
      minWidth: 200,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 150,
    },
  ]);
  const onPaginationChanged = (e) => {
    console.log(e?.api?.paginationProxy)
    // Get the current page number
    // const currentPage = gridApi.paginationGetCurrentPage() + 1; // +1 because pages are 0-indexed
    // if (e?.api?.paginationProxy?.currentPage > currentPage) 
    setCurrentPage(+e?.api?.paginationProxy?.currentPage)
    // Do something with the current page number
    console.log('Current Page:', currentPage);
  };
  const onGridReady = (params) => {
    // setGridApi(params.api);
    const userData = JSON.parse(useGetLocalStorage("userData"));
    const userRole = userData?.roleId;

    params.api.sizeColumnsToFit();
    params.api.resetRowHeights();
    // params.api.paginationGoToPage(5);
    // console.log("User Id", userRole);
    // console.log(params.api.paginationGetCurrentPage(), "Page nuber")
    (userRole === 3 || userRole === 2) &&
      params.api.setColumnVisible("partnerName", false);

    userRole === 3 && params.api.setColumnVisible("user", false);
    // userRole === 3 && params.api.setColumnVisible("user", false);
  };

  return (
    <Box className="ag-theme-quartz" style={gridStyle} sx={{ m: 1 }}>
      <AgGridReact
        ref={gridRef}
        rowData={accountListData ? accountListData.accountGridData : []}
        columnDefs={colDefs}
        pagination={true}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
      // onPaginationChanged={onPaginationChanged}
      />
    </Box>
  );
};
