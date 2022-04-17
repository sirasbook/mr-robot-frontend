import React, { useState, useEffect, useMemo } from "react";
import "./pagination.scss"

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
      if (i === currentPage) {
        pages.push(
          <li class="page-item active" key={i} aria-current="page">
            <a class="page-link" onClick={() => onPageChange(i)}>
              {i}
            </a>
          </li>
        );
      } else {
        pages.push(
          <li class="page-item" key={i}>
            <a class="page-link" onClick={() => onPageChange(i)}>
              {i}
            </a>
          </li>
        );
      }
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        {currentPage === 1 ? (
          <li class="page-item disabled">
            <a
              class="page-link"
              aria-label="Previous"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        ) : (
          <li class="page-item">
            <a
              class="page-link"
              aria-label="Previous"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}
        {paginationItems}
        {currentPage === totalPages ? (
          <li class="page-item disabled">
            <a
              class="page-link"
              aria-label="Next"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        ) : (
          <li class="page-item">
            <a
              class="page-link"
              aria-label="Next"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
