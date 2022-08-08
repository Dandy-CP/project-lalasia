import React from "react";
import "./Pagination.css";

const Pagination = ({productPerPage, totalProduct, paginate, currentPage,}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="Pagination">
      {pageNumber.map((number) => (
        <button
          className={currentPage === number ? "active" : ""}
          key={number}
          onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
