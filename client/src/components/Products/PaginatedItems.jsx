import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ProductItems from "./ProductItems";

function PaginatedItems({ items, itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, items, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="">
            <ProductItems items={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< prev"
                pageClassName="page-item leading-6 text-gray-400 rounded-md hover:text-white-default hover:bg-green-dark cursor-pointer w-10 h-10 border-green-dark border-2 text-center p-1 align-middle"
                pageLinkClassName="page-link"
                previousClassName="page-item border-0 leading-6 rounded-r-md w-auto text-center p-1 h-10 bg-green-dark cursor-pointer text-white-default mr-2 px-2 py-1 rounded-l-xl"
                previousLinkClassName="page-link"
                nextClassName="page-item border-0 w-auto rounded-l-md leading-6 text-center p-1 bg-green-dark text-white-default ml-2 cursor-pointer px-2 py-1 rounded-r-xl"
                nextLinkClassName="page-link"
                breakClassName="page-item leading-6 text-gray-400 rounded-md hover:text-white-default hover:bg-green-dark cursor-pointer w-10 h-10 border-green-dark border-2 text-center p-1 align-middle"
                breakLinkClassName="page-link"
                containerClassName="pagination flex mt-10 w-1/2 justify-between mx-auto text-2xl"
                activeClassName="bg-green-dark"
                activeLinkClassName="text-white-default"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default PaginatedItems;
