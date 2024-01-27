import { useEffect, useState } from "react";

import "./DataTable.css";
import React from "react";
import { Pagination } from "../pagination/Pagination.component";

interface DataTableProps {
  data: any[];

  columns: TabColumns[];
  totalCount?: number;
  onRowPress?: (item: any) => void;
  onDataPress?: (item: any) => void;
  classes?: string;
  onMinOrMaximise?: () => void;
  isShowToolBar?: boolean;
  extraTools?: React.JSX.Element;
  extraTools2?: React.JSX.Element;
  showSearch?: boolean;
  showMinMaxBtn?: boolean;
  pagination?: boolean;
  searchTitle?: string;
  outerSearchFunc?: (val) => void;
  isSearchButton?: boolean | false;
  loadFromServer?: (
    currentPage: number,
    pageSize: number,
    params?: object | undefined
  ) => void;
  noData?: React.JSX.Element;
  defaultPage?: number;
  tableContainerClass?: string;
  width?: string;
  rowClass?: string;
  footer?: React.JSX.Element;
  toolbarStyle?: string[];
  selectionType?: "radio" | "checkbox" | null;
  onSelection?: (_data) => void;
  rejectDataPressColumn?: string[];
  tray?: string;
  onCallPagination?: (page) => void;

  setPageCallback?: (func: (arg: number) => void) => void;
}

export interface TabColumns {
  name: React.JSX.Element | string | any;
  key: string;
  onShowMaximize?: boolean;
  hidden?: boolean;
  headerClasses?: string;
  classes?: string;
  sort?: boolean;
  sortDirection?: string;
  width?: string;
  search?: true;
  onFormatter?: (
    item: any,
    colProps: TabColumns,
    key: string
  ) => React.JSX.Element | string;
  onSorter?: (row1: any, row2: any, colProps: TabColumns) => number | null;
  onServerSorter?: (side: TabColumns) => void;
  onHeaderClick?: (item) => void;
  onColSearch?: (
    rowData: any,
    colProps: TabColumns,
    searchText: string
  ) => boolean;
}

export const DataTable = ({
  data,
  columns = [],
  totalCount,
  classes,
  onRowPress,
  onMinOrMaximise,
  isShowToolBar = true,
  showSearch = true,
  showMinMaxBtn = true,
  pagination = true,
  isSearchButton = false,
  searchTitle = "",
  outerSearchFunc,
  loadFromServer,
  noData,
  defaultPage = 0,
  tableContainerClass = "table-container",
  width,
  rowClass,
  footer,
  toolbarStyle,
  selectionType,
  onSelection,
  onDataPress,
  rejectDataPressColumn = [],
  tray,
  onCallPagination,
  setPageCallback,
}: DataTableProps) => {
  const debounceTime = 1000;
  const [maximize, setMaximize] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [noOfPages, setNoOfPages] = useState(1);
  const [pageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(defaultPage);
  const [colPropsState, setColPropsState] = useState<TabColumns[]>(
    columns ?? []
  );
  const [dataList, setDataList] = useState<any[]>([]);
  const [initialList, setInitialData] = useState<any[]>(data);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    setColPropsState(columns);
  }, [columns]);

  useEffect(() => {
    if (loadFromServer) {
      setDataList(data);
      setNoOfPages(Math.ceil((totalCount ?? 0) / pageSize));
      setPageCallback?.(setCurrentPage);
    } else {
      setCurrentPage(0);
    }
  }, [data]);

  useEffect(() => {
    if (!loadFromServer) {
      (!searchInput || outerSearchFunc) && setInitialData(data);
      setDataList(sliceData());
      setNoOfPages(Math.ceil((initialList.length ?? 0) / pageSize));
    }
  }, [currentPage, searchInput, initialList, data]);

  const deepGet = (obj, key) =>
    key
      .split(".")
      .reduce(
        (xs, x) => (xs?.[x] !== null && xs[x] !== undefined ? xs[x] : null),
        obj
      );

  const onClickSearchBtn = (searchText) => {
    let tempDataList = data ?? [];
    if (searchText) {
      const searchAbleColumns = colPropsState.filter((datum) => datum.search);

      tempDataList = tempDataList.filter((obj) => {
        const conditions: boolean[] = [];
        searchAbleColumns.forEach((item) => {
          let result = false;
          if (item.onColSearch) {
            result = item.onColSearch(obj, item, searchText);
          } else {
            const str = deepGet(obj, item.key).toLowerCase();
            const toBeMatched = searchText.toLowerCase();
            result = str.includes(toBeMatched);
          }
          conditions.push(result);
        });
        return conditions.reduce((arg1, arg2) => arg1 || arg2);
      });
    }
    setCurrentPage(0);
    setInitialData(tempDataList);
  };

  const sliceData = () => {
    return (
      initialList?.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
      ) ?? []
    );
  };

  const generateStyle = (dataObj: TabColumns) => {
    const obj = {};
    if (dataObj.width) {
      Object.assign(obj, { width: dataObj.width, maxWidth: dataObj.width });
    } else {
      Object.assign(obj, {
        width: `${100 / columns.length}%`,
        maxWidth: `${100 / columns.length}%`,
      });
    }
    if ("hidden" in dataObj && dataObj.hidden === true) {
      Object.assign(obj, { display: "none" });
    }

    if ("hidden" in dataObj && dataObj.hidden === true) {
      "onShowMaximize" in dataObj && maximize && dataObj.onShowMaximize
        ? Object.assign(obj, { display: "" })
        : Object.assign(obj, { display: "none" });
    }
    return obj;
  };
  const onColFormatter = (item: any, columnProp: TabColumns, key: string) => {
    if ("onFormatter" in columnProp) {
      return columnProp.onFormatter?.(item, columnProp, key);
    }
    return deepGet(item, key);
  };

  const onCallPaginationChange = (page: number) => {
    if (onCallPagination) {
      onCallPagination(page);
    }
    setCurrentPage(page);
    if (loadFromServer) {
      loadFromServer(page, pageSize, {
        searchInput,
      });
    } else {
      setDataList(sliceData());
      setNoOfPages(Math.ceil((initialList.length ?? 0) / pageSize));
    }
  };
  const onSelectionClick = (
    item,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const flag = event.target.checked;
    let newList: any = [];
    if (flag) {
      newList = [...selectedItems, ...item];
    } else {
      newList = selectedItems.filter(
        (pv) => pv.serial !== item.find((e) => e.serial === pv.serial)?.serial
      );
    }
  };
  const onRadionSelection = (event) => {
    setSelectedItems([event]);
    onSelection?.([event]);
  };

  const paginationMinmaxContainer = () => {
    return (
      <div>
        {pagination && (
          <Pagination
            noOfPages={noOfPages}
            currentPage={currentPage}
            onHandlePagination={(page, _pageSize) => {
              onCallPaginationChange(page);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="data-table-component-container">
      {!(dataList.length === 0 && noData) && (
        <div className={tableContainerClass}>
          <div className={`data-table-container ${classes}`}>
            <div className="data-table-headers">
              {colPropsState?.map((item, index) => {
                return (
                  <div
                    className={`header m-text-sm-bold text-gray-800 ${
                      selectionType ? "selection-header items-center" : ""
                    } ${item.headerClasses ?? ""}`}
                    key={index}
                    style={generateStyle(item)}
                    onClickCapture={(event) => {
                      item?.onHeaderClick && event.stopPropagation();
                      item?.onHeaderClick?.(item.key);
                    }}
                  >
                    <div className="flex items-center">
                      <span>{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="data-table-body" style={{ width }}>
              {dataList.map((item: any, index) => {
                return (
                  <div
                    className={`data-table-row cursor-pointer ${
                      rowClass ?? ""
                    }`}
                    key={index}
                    onClick={() => {
                      onRowPress?.(item);
                    }}
                  >
                    {colPropsState.map((itemCol: TabColumns, innerIn) => {
                      return (
                        <div
                          onClick={(_event) => {
                            !rejectDataPressColumn.includes(String(innerIn)) &&
                              onDataPress?.(item);
                          }}
                          className={`data-table-data ${
                            itemCol.classes ?? "m-text-md-regular text-gray-600"
                          }`}
                          key={innerIn}
                          style={generateStyle(itemCol)}
                        >
                          <div
                            className={`${
                              itemCol.onFormatter ? "cellFormatter" : "cell"
                            } ${
                              selectionType ? "checkbox-cell items-center" : ""
                            }`}
                          >
                            <span
                              className={`${
                                (selectionType === "checkbox" ||
                                  selectionType === "radio") &&
                                innerIn === 0
                                  ? "text-gray-900 m-text-sm-medium"
                                  : ""
                              }`}
                            >
                              {onColFormatter(item, itemCol, itemCol.key)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {isShowToolBar && (pagination || showMinMaxBtn) && (
        <div className="pagination-container-bottom">
          {paginationMinmaxContainer()}
        </div>
      )}
      {!(dataList.length === 0 && noData) && footer && footer}
      {dataList.length === 0 && noData}
    </div>
  );
};
