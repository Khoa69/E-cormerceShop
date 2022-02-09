import axios from "axios";
import React from "react";
import { useAlert } from "react-alert";
import { useGlobalContext } from "../../context/context";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import "./order.css";

import Login from "../login/LogIn";

function Orders() {
    const alert = useAlert();

    const { orders, formatNumber, checkLogin } = useGlobalContext();

    const handleDelete = async (id) => {
        await axios
            .delete(`http://localhost:8080/doubleK/api/order/${id}`, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then(() => alert.success(`Deleted order ${id}`));
        // .then(() => window.location.reload());
    };

    const columns = [
        { field: "orderId", headerName: "OrderID", width: 125 },
        {
            field: "orderUser",
            headerName: "OrderUser",
            width: 180,
            renderCell: (params) => {
                return (
                    <div className="user">
                        <img
                            className="userImg"
                            // src={params.row.avatar}
                            src={
                                params.row.orderUser.imageUser?.path
                                    ? `http://127.0.0.1:8887/userImages/${params.row.orderUser.imageUser?.path}`
                                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                            }
                            alt=""
                        />
                        {params.row.orderUser?.username}
                    </div>
                );
            },
        },
        { field: "status", headerName: "Status", width: 120 },
        { field: "dateOrder", headerName: "DateOrder", width: 140 },
        { field: "dateReceived", headerName: "DateReceived", width: 160 },
        {
            field: "orderDetails",
            headerName: "Total",
            width: 120,
            renderCell: (params) => {
                return (
                    <div>
                        {formatNumber(
                            params.row?.orderDetails.reduce(
                                (total, { price, quantity }) =>
                                    total + price ,
                                0
                            )
                        )}
                    </div>
                );
            },
        },
        {
            field: "shipper",
            headerName: "Shipper",
            width: 150,
            renderCell: (params) => {
                return <div>{params.row?.shipper?.username}</div>;
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/order/" + params.row.orderId}>
                            <button className="orderListEdit">Details</button>
                        </Link>
                        <DeleteOutline
                            className="orderListDelete"
                            onClick={() => handleDelete(params.row.orderId)}
                        />
                    </>
                );
            },
        },
    ];

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="orderList">
            <h1 className="orderTitle">Orders</h1>
            <DataGrid
                rows={orders}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row.orderId}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}

export default Orders;
