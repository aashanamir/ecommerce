import React, { useState } from 'react';
import './style.css';
import Pagination from "react-js-pagination";

const PaginationComp = ({productPerpage , productsCount}) => {

  const [currentPage , setCurrentPage] = useState(1);


  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  return (
    <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={productPerpage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>

  );
};

export default PaginationComp;
