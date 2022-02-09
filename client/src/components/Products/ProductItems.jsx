import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";

function ProductItems({ items }) {
    const { formatNumber } = useGlobalContext();

    return (
        <div className="grid grid-cols-5 gap-10 mx-auto mt-6">
            {items &&
                items?.map((menuItem) => {
                    const { id, productName, imagelist, price } = menuItem;
                    return (
                        <Link
                            type="button"
                            to={`/product/${id}`}
                            key={id}
                            className="w-52 shadow-md px-4 rounded-md"
                        >
                            <img
                                src={`http://127.0.0.1:8887/images/${
                                    imagelist[imagelist.length - 1]?.path
                                }`}
                                alt={`${productName}-img`}
                            />
                            <h4>{productName}</h4>
                            <h4 className="text-right text-green-dark text-xl mb-1">
                                {formatNumber(price)} vnd
                            </h4>
                        </Link>
                    );
                })}
        </div>
    );
}

export default ProductItems;
