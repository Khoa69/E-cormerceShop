import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/context";
import Login from "./LogIn";
import axios from "axios";
import OrderList from "../components/Order/OrderList";
import OrderDetail from "../components/Order/OrderDetail";

function Home() {
    const { checkLogin } = useGlobalContext();

    const [orders, setOrders] = useState([]);
    const [curOrder, setCurOrder] = useState({});

    const fetchOrder = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/order/all",
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
            setOrders(
                res.data.filter(
                    (order) => order.shipper?.id === parseInt(localStorage.id)
                )
            );
            setCurOrder(orders[0]);
        } else {
            setOrders([]);
            setCurOrder({});
        }
    };

    useEffect(() => {
        if (checkLogin()) {
            fetchOrder();
        }
    }, [checkLogin]);

    if (!checkLogin()) {
        return <Login />;
    }

    if (orders.length === 0) {
        return (
            <h1 className="text-3xl text-gray-400 uppercase text-center mt-48">
                You don't have any orders to ship!
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

export default Home;
