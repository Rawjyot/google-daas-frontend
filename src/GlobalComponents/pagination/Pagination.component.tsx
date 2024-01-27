import { useEffect, useState } from "react";

import "./Pagination.css";
import React from "react";

interface AUPaginationProps {
  onHandlePagination?: (currentPage: number, pageSize: number) => void;
  currentPage?: number;
  noOfPages: number;
}

export const Pagination = ({
  currentPage = 0,
  noOfPages,
  onHandlePagination,
  ...props
}: AUPaginationProps) => {
  const [page, setPage] = useState<number>(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const onClickNext = () => {
    if (page < noOfPages - 1) {
      setPage((prev) => {
        onHandlePagination?.(prev + 1, 10);
        return prev + 1;
      });
    }
  };

  const onClickPrev = () => {
    if (page > 0) {
      setPage((prev) => {
        onHandlePagination?.(prev - 1, 10);
        return prev - 1;
      });
    }
  };

  return (
    <div className="au-pagination" {...props}>
      <div className="page-show-label">
        <span className="m-text-sm-medium mr-3">
          {`paginationShowingLbl", ${currentPage} :  ${page} + 1,
            ${noOfPages}`}
        </span>
      </div>
      <nav
        className="pages isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          className="prev-btn"
          data-test-id={`PAGE-PREV`}
          onClick={() => onClickPrev()}
          disabled={currentPage === 0}
        >
          prev
        </button>
        <span
          data-test-id={`PAGE-${page}`}
          className="m-text-md-medium page page-selected"
        >
          {page + 1}
        </span>
        <button
          className="next-btn"
          data-test-id={`PAGE-NEXT`}
          onClick={() => onClickNext()}
          disabled={noOfPages - 1 === currentPage}
        >
          next
        </button>
      </nav>
    </div>
  );
};
