import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { useCallback, useMemo, useState } from "react";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const AccountListGrid = () => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    // using default ColDef
    { field: "athlete" },
    { field: "sport" },
    // using number column type
    { field: "age", type: "numberColumn" },
    { field: "year", type: "numberColumn" },
    // using date and non-editable column types
    { field: "date", type: ["dateColumn", "nonEditableColumn"], width: 220 },
    {
      headerName: "Medals",
      groupId: "medalsGroup",
      children: [
        // using medal column type
        { headerName: "Gold", field: "gold", type: "medalColumn" },
        { headerName: "Silver", field: "silver", type: "medalColumn" },
        { headerName: "Bronze", field: "bronze", type: "medalColumn" },
        {
          headerName: "Total",
          field: "total",
          type: "medalColumn",
          columnGroupShow: "closed",
        },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      // set the default column width
      width: 150,
      // make every column editable
      editable: false,
      // make every column use 'text' filter by default
      filter: "agTextColumnFilter",
      // enable floating filters by default
      floatingFilter: true,
      // disable cell data types
      cellDataType: false,
    };
  }, []);
  const defaultColGroupDef = useMemo(() => {
    return {
      marryChildren: true,
    };
  }, []);
  const columnTypes = useMemo(() => {
    return {
      numberColumn: { width: 130, filter: "agNumberColumnFilter" },
      medalColumn: { width: 100, columnGroupShow: "open", filter: false },
      nonEditableColumn: { editable: false },
      dateColumn: {
        // specify we want to use the date filter
        filter: "agDateColumnFilter",
        // add extra parameters for the date filter
        filterParams: {
          // provide comparator function
          comparator: (filterLocalDateAtMidnight, cellValue) => {
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = cellValue.split("/");
            const day = Number(dateParts[0]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[2]);
            const cellDate = new Date(year, month, day);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      },
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={gridStyle} className="ag-theme-quartz">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        defaultColGroupDef={defaultColGroupDef}
        columnTypes={columnTypes}
        onGridReady={onGridReady}
      />
    </div>
  );
};
