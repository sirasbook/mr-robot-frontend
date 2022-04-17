import React, { useState, useEffect, useMemo } from "react";
import "./pagination.scss";

const Pagination = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          class={i === currentPage ? "page-item active" : "page-item"}
          key={i}
          aria-current="page"
        >
          <a class="page-link" onClick={() => onPageChange(i)}>
            {i}
          </a>
        </li>
      );
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination flex-wrap">
        <li class={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <a
            class="page-link"
            aria-label="Previous"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {paginationItems}
        <li
          class={
            currentPage === totalPages ? "page-item disabled" : "page-item"
          }
        >
          <a
            class="page-link"
            aria-label="Next"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
