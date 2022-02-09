import React, { useState, useEffect } from "react";
import OrderList from "../components/Order/OrderList";
import { useGlobalContext } from "../context/context";
import axios from "axios";
import OrderDetail from "../components/Order/OrderDetail";

function Order() {
    const { checkLogin } = useGlobalContext();

    const [orders, setOrders] = useState([]);
    const [curOrder, setCurOrder] = useState({});

    const fetchOrders = async () => {
        const res = await axios.get(
            `http://localhost:8080/doubleK/api/order/user/${localStorage.id}`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        ?.split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        ?.split("=")[1],
                },
            }
        );

        if (res.data) {
            setOrders(res.data.reverse());
            setCurOrder(res.data.reverse()[0]);
        } else {
            setOrders([]);
            setCurOrder({});
        }
    };

    useEffect(() => {
        if (checkLogin()) {
            fetchOrders();
        }
    }, [checkLogin]);

    if (orders.length === 0) {
        return (
            <h1 className="text-center font-semibold text-gray-300 text-3xl h-75 mt-28">
                You don't have any order!
            </h1>
        );
    }

    return (
        <div
            style={{ display: "flex", flex: 4 }}
            className="p-2 mb-5 w-4/5 mx-auto mt-5"
        >
            <OrderList
                orders={orders}
                setCurOrder={setCurOrder}
                curOrder={curOrder}
            />
            <OrderDetail order={curOrder} />
        </div>
    );
}

export default Order;
