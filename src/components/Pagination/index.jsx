import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ArrowNextIcon, ArrowPrevIcon } from "../../constants/icons";
import "./style.scss";

export default function Pagination({
  currentPage,
  onSetCurrentPage,
  pageSize,
  onSetPageSize,
  totalCount,
}) {
  const pageSizeOptions = [
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 },
    { value: 40, label: 40 },
  ];

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageClick = (e) => {
    onSetCurrentPage(Number(e.target.id));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onSetCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onSetCurrentPage(currentPage + 1);
    }
  };

  const onChangePageSize = (e) => {
    onSetPageSize(e ? e.value : null);
    onSetCurrentPage(1);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const pageNumbers = pages.map((page) => {
    // if(page <= 3  && page > 0) {
    return (
      <li
        key={page}
        id={page}
        onClick={handlePageClick}
        className={`page-number-item ${currentPage === page ? "active" : null}`}
      >
        {page}
      </li>
    );
    // }else{
    // return null;
    // }
  });

  const fromPage = (currentPage - 1) * pageSize + 1;

  const toPage =
    pageSize > totalCount
      ? (currentPage - 1) * pageSize + totalCount
      : (currentPage - 1) * pageSize + pageSize;

  return (
    <div className="pagination-block">
      <div>
        {fromPage}-{toPage > totalCount ? totalCount : toPage} of {totalCount}
      </div>
      <div>
        <button
          className="pagination-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <ArrowPrevIcon />
        </button>
        <ul className="pagination-pages-numbers">{pageNumbers}</ul>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowNextIcon />
        </button>
      </div>
      <div className="pagination-page-size">
        <span className="page-size-text">Page Size</span>
        <Select
          className="page-size-select small-select"
          classNamePrefix="cheap"
          menuPlacement="top"
          value={{ label: pageSize, value: pageSize }}
          options={pageSizeOptions}
          onChange={onChangePageSize}
          isSearchable={false}
        />
      </div>
    </div>
  );
}
