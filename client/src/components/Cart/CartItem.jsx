import React from "react";
import { useGlobalContext } from "../../context/context";
import { useAlert } from "react-alert";

function CartItem({ id, imagelist, productName, price, amount }) {
    const alert = useAlert();

    const { remove, toggleAmount, formatNumber } = useGlobalContext();

    return (
        <article className="cart-item align-middle flex w-4/5 justify-between gap-6 my-6 mx-auto">
            <img
                src={
                    imagelist
                        ? `http://127.0.0.1:8887/images/${imagelist[0]?.path}`
                        : ""
                }
                className="w-20 h-20 object-cover"
                alt={productName}
            />
            <div className="">
                <h4 className="mb-2 font-medium tracking-wide">
                    {productName}
                </h4>
                <h4 className="item-price mb-2 font-medium tracking-wide text-gray-500">
                    {formatNumber(price)} vnd
                </h4>
                <button
                    className="remove-btn text-gray-500 tracking-wider cursor-pointer text-sm bg-transparent border-none mt-2 hover:text-red-500"
                    onClick={() => {
                        remove(id);
                        alert.success("Remove item!");
                    }}
                >
                    remove
                </button>
            </div>
            <div className="flex w-20 h-6 align-middle">
                <button
                    className="amount-btn w-6 bg-transparent border-none cursor-pointer"
                    onClick={() => toggleAmount(id, "dec")}
                >
                    <p className="text-2xl leading-4">-</p>
                </button>
                <p className="amount text-center text-2xl mb-0 text-lg leading-6 w-6">
                    {amount}
                </p>
                <button
                    className="amount-btn w-6 bg-transparent border-none cursor-pointer"
                    onClick={() => toggleAmount(id, "inc")}
                >
                    <p className="text-2xl leading-4">+</p>
                </button>
            </div>
        </article>
    );
}

export default CartItem;
