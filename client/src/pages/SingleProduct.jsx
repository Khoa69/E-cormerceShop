import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { useAlert } from "react-alert";

function SingleProduct() {
    const alert = useAlert();

    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(1);
    const { id } = useParams();
    const { addToCart, formatNumber } = useGlobalContext();

    const fetchProduct = useCallback(async () => {
        const res = await axios.get(
            `http://localhost:8080/doubleK/api/product/${id}`
        );

        if (res.data) {
            setProduct(res.data);
        } else {
            setProduct({});
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const {
        productName,
        imagelist,
        brand,
        price,
        description,
        screen,
        operatingSystem,
        cpu,
        ram,
        keyType,
        color,
        refreshRate,
    } = product;

    return (
        <div className="w-full md:w-4/5 md:mx-auto mt-16 mb-16">
            <h2 className="text-center text-2xl font-bold capitalize tracking-wide">
                {productName}
            </h2>
            <div className="flex mt-10">
                <div className="w-1/2 items-center">
                    <img
                        src={
                            product?.imagelist
                                ? `http://127.0.0.1:8887/images/${imagelist[0]?.path}`
                                : ""
                        }
                        alt={`${productName}-img`}
                        className="w-96"
                    />
                </div>
                <div className="w-1/2">
                    <p className="font-semibold mb-4">
                        <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                            name:
                        </span>{" "}
                        {productName}
                    </p>
                    <p className="font-semibold mb-4">
                        <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                            brand:
                        </span>{" "}
                        {brand?.brand}
                    </p>
                    <p className="font-semibold mb-4">
                        <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                            price:
                        </span>{" "}
                        {formatNumber(price || 0)} vnd
                    </p>
                    {color && (
                        <p className="font-semibold mb-4">
                            <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                                color:
                            </span>{" "}
                            {color}
                        </p>
                    )}
                    {screen && (
                        <p className="font-semibold mb-4">
                            <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                                screen:
                            </span>{" "}
                            {screen}
                        </p>
                    )}
                    {cpu && (
                        <p className="font-semibold mb-4">
                            <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                                cpu:
                            </span>{" "}
                            {cpu}
                        </p>
                    )}
                    {ram && (
                        <p className="font-semibold mb-4">
                            <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                                ram:
                            </span>{" "}
                            {ram}
                        </p>
                    )}
                    {operatingSystem && (
                        <p className="font-semibold mb-4">
                            <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                                operating system:
                            </span>{" "}
                            {operatingSystem}
                        </p>
                    )}
                    {keyType && (
                        <p className="font-semibold mb-4">
                            <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                                Switch:
                            </span>{" "}
                            {keyType}
                        </p>
                    )}
                    {refreshRate && (
                        <p className="font-semibold mb-4">
                            <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                                refresh rate:
                            </span>{" "}
                            {refreshRate}
                        </p>
                    )}
                    {description && (
                        <p className="font-semibold mb-4">
                            <span className="bg-green-dark px-2 py-1 text-center capitalize font-bold rounded-md">
                                description:
                            </span>
                            {description}
                        </p>
                    )}
                    <div className="flex gap-4 font-bold">
                        <div className="flex ">
                            <button
                                disabled={amount < 2 ? true : false}
                                className="bg-white-default h-10 w-10 rounded-full text-2xl leading-normal font-bold border-2 border-transparent cursor-pointer hover:bg-green-dark hover:text-white-default hover:border-green-dark"
                                onClick={() => setAmount(amount - 1)}
                            >
                                -
                            </button>
                            <h4 className="w-10 text-2xl text-center">
                                {amount}
                            </h4>
                            <button
                                className="bg-white-default h-10 w-10 rounded-full text-2xl leading-normal font-bold border-2 border-transparent cursor-pointer hover:bg-green-dark hover:text-white-default hover:border-green-dark"
                                onClick={() => setAmount(amount + 1)}
                            >
                                +
                            </button>
                        </div>
                        <button
                            type="button"
                            className="bg-green-dark text-white-default rounded px-2  py-1"
                            onClick={() => {
                                addToCart({ ...product, amount: amount });
                                setAmount(1);
                                alert.success("Add to cart");
                            }}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
