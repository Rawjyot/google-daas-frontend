import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Box from "@mui/material/Box";
import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
export const AccountListGrid = (props) => {
  const gridRef = useRef();
  const { accountListData } = useSelector((state) => state.account);
  const gridStyle = useMemo(() => ({ height: "65%", width: "100%" }), []);

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
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      minWidth: 120,
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
      minWidth: 150,
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
      field: "noOfContact",
      headerName: "Contacts",
      minWidth: 100,
    },
    {
      field: "noOfNewContact",
      headerName: "New Contacts",
      minWidth: 100,
    },
    {
      field: "accountStatus",
      headerName: "Status",
      minWidth: 120,
    },
    {
      field: "assignedTo",
      headerName: "Assignee",
      minWidth: 120,
    },
  ]);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
    params.api.resetRowHeights();
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
      />
    </Box>
  );
};
