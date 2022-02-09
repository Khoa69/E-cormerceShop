import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../../context/context";
import { Link } from "react-router-dom";

function PopUpSearch() {
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState([]);

    const { products } = useGlobalContext();

    const filterProduct = (e) => {
        setSearch(e.target.value);
        const newFilter = products.filter((product) => {
            return (
                product.productName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                product.brand?.brand
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                product.category?.category
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        });

        if (search === "") {
            setFilterData([]);
        } else {
            setFilterData(newFilter);
        }
    };

    return (
        <Popup
            trigger={<SearchIcon className="cursor-pointer" />}
            modal
            nested
            position="center center"
            className="rounded-xl"
        >
            {(close) => (
                <div className="modal text-xs h-96 rounded-xl">
                    <div
                        className="close cursor-pointer absolute block py-2 px-1 w-10 h-10 text-center leading-4 -right-3 -top-3 text-2xl bg-green-dark rounded-full border-2 border-green-dark text-white-default"
                        onClick={close}
                    >
                        <CloseIcon />
                    </div>
                    <div className="header w-full p-3 text-xl">
                        <input
                            type="text"
                            className="mt-3 mb-2 w-full outline-none bg-transparent px-2 text-gray-400 border-b-2 border-gray-400"
                            value={search}
                            onChange={filterProduct}
                            placeholder="Search..."
                        />
                    </div>
                    <div className="content w-full py-3 px-2">
                        {filterData.length !== 0 && (
                            <div className="dataResult grid grid-cols-2 justify-between w-4/5 mx-auto h-60 overflow-y-auto">
                                {filterData.map((product, index) => {
                                    return (
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="flex align-middle border-2 mx-auto p-2 mt-1 w-11/12 h-3/4 bg-white-default rounded-lg border-b-2 border-r-2 border-gray-400"
                                            key={index}
                                            onClick={() => {
                                                close();
                                            }}
                                        >
                                            <img
                                                src={`http://127.0.0.1:8887/images/${
                                                    product.imagelist[
                                                        product.imagelist
                                                            .length - 1
                                                    ]?.path
                                                }`}
                                                alt="img"
                                                className="w-16"
                                            />
                                            <p className="ml-2">
                                                {product.productName}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Popup>
    );
}

export default PopUpSearch;
