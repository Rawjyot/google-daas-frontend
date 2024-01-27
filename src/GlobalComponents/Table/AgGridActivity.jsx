import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useMemo, useRef, useState } from "react";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
export const AgGridActivity = () => {
  const gridRef = useRef();
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const rowData = [
    {
      regions: ["Indian"],
      nominated_accounts: 200,
      profiled_accounts: 100,
      contacts: 500,
      bad_data: 50,
      opportunities: 15,
      follow_up: 20,
      disqualified: 50,
    },
    {
      regions: ["Indian", "USA"],
      nominated_accounts: 500,
      profiled_accounts: 500,
      contacts: 500,
      bad_data: 50,
      opportunities: 15,
      follow_up: 20,
      disqualified: 50,
    },
  ];

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Regions",
      field: "regions",
      cellRendererParams: {
        suppressCount: true,
      },
      filter: "agSetColumnFilter",
      filterParams: {
        treeList: true,
        keyCreator: (params) => (params.value ? params.value.join("#") : null),
      },
      minWidth: 280,
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);

  const getDataPath = useMemo(() => {
    return (data) => {
      return data.regions;
    };
  }, []);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    {
      field: "nominated_accounts",
      headerName: "Nominated Accounts",
      floatingFilter: true,
    },
    {
      field: "profiled_accounts",
      headerName: "Profiled Accounts",
      floatingFilter: true,
    },
    {
      field: "contacts",
      headerName: "Contacts",
      floatingFilter: true,
    },
    {
      field: "bad_data",
      headerName: "Bad Data",
      floatingFilter: true,
    },
    {
      field: "opportunities",
      headerName: "Opportunities",
      floatingFilter: true,
    },
    {
      field: "follow_up",
      headerName: "Follow Up",
      floatingFilter: true,
    },
    {
      field: "disqualified",
      headerName: "Disqualified",
      floatingFilter: true,
    },
  ]);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="ag-theme-quartz" style={gridStyle}>
      <AgGridReact
        ref={gridRef}
        treeData={true}
        rowData={rowData}
        columnDefs={colDefs}
        getDataPath={getDataPath}
        groupDefaultExpanded={-1}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
      />
    </div>
  );
};
