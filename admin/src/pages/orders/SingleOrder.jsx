import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Login from "../login/LogIn";
import {
    CalendarToday,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
} from "@material-ui/icons";
import TransgenderIcon from "@mui/icons-material/Transgender";
import "./order.css";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGlobalContext } from "../../context/context";
import { useAlert } from "react-alert";

function SingleOrder() {
    const alert = useAlert();

    const [order, setOrder] = useState({});
    const { orderId } = useParams();
    const { users, formatNumber, checkLogin } = useGlobalContext();

    const shipperOptions = users
        .filter(({ roles }) =>
            roles.map(({ name }) => name).includes("ROLE_SHIPPER")
        )
        .map(({ username }) => username);

    const [shipper, setShipper] = useState(shipperOptions[0]);
    const [shipperInput, setShipperInput] = useState("");

    const fetchOrder = async (id) => {
        const res = await axios.get(
            `http://localhost:8080/doubleK/api/order/${id}`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        ?.split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            setOrder(res.data);
        } else {
            setOrder({});
        }
    };

    useEffect(() => {
        if (checkLogin()) {
            fetchOrder(orderId);
        }
    }, []);

    const total = order.orderDetails
        ? order?.orderDetails.reduce(
              (total, { price, quantity }) => total + price ,
              0
          )
        : 0;

    const handleOrder = async (checked, status) => {
        const data = {
            shipperID: order.shipper?.id,
            checked: checked,
            status: status,
        };

        await axios
            .put(
                `http://localhost:8080/doubleK/api/order/${order.orderId}`,
                data,
                {
                    headers: {
                        accept: "application/json",
                        Authorization: document?.cookie
                            ?.split("; ")
                            .find((token) => token.includes("doubleKToken"))
                            .split("=")[1],
                    },
                }
            )
            .then((response) => alert.success(`${status} success!`))
            .catch((error) => alert.error("Error"));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            shipperID: users.find(({ username }) => username === shipper)["id"],
            checked: order.checked,
            status: "On delivery",
        };

        await axios
            .put(`http://localhost:8080/doubleK/api/order/${orderId}`, data, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        ?.split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then((response) => alert.success("Add shipper success!"))
            .catch((error) => alert.error("Error"));
    };

    const columns = [
        {
            field: "productId",
            headerName: "ProductID",
            width: 160,
            renderCell: (params) => {
                return <div>{params.row?.product?.id}</div>;
            },
        },
        {
            field: "productName",
            headerName: "ProductName",
            width: 200,
            renderCell: (params) => {
                return <div>{params.row?.product?.productName}</div>;
            },
        },
        {
            field: "price",
            headerName: "Price",
            width: 140,
            renderCell: (params) => {
                return <div>{formatNumber(params.row.price)}</div>;
            },
        },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 140,
        },
    ];

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="order">
            <div className="orderTitleContainer">
                <h1>{`Order ${orderId}`}</h1>
                <h4>
                    Total:{" "}
                    {order.orderDetails &&
                        formatNumber(
                            order?.orderDetails.reduce(
                                (total, { price, quantity }) =>
                                    total + price * quantity,
                                0
                            )
                        )}
                </h4>
            </div>
            <div className="orderContainer">
                <div className="leftInfo">
                    <div className="userInfo">
                        <div className="userShowTop">
                            <img
                                src={
                                    order?.orderUser?.imageUser
                                        ? `http://127.0.0.1:8887/userImages/${order.orderUser.imageUser.path}`
                                        : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                                }
                                alt=""
                                className="userShowImg"
                            />
                            <div className="userShowTopTitle">
                                <span className="userShowUsername">
                                    {order?.orderUser?.username}
                                </span>
                                <span className="userShowUserTitle">
                                    {order?.orderUser?.roles &&
                                        order?.orderUser?.roles.map(
                                            (role) => role.name
                                        )}
                                </span>
                            </div>
                        </div>
                        <div className="userShowBottom">
                            <span className="userShowTitle">
                                Account Details
                            </span>
                            <div className="userShowInfo">
                                <PermIdentity className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {order?.orderUser?.fullName}
                                </span>
                            </div>
                            <div className="userShowInfo">
                                <TransgenderIcon className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {order?.orderUser?.gender === "0"
                                        ? "Male"
                                        : order?.orderUser?.gender === "1"
                                        ? "Female"
                                        : "Other"}
                                </span>
                            </div>
                            <div className="userShowInfo">
                                <CalendarToday className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {new Date(
                                        order?.orderUser?.dateOfBirth
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <span className="userShowTitle">
                                Contact Details
                            </span>
                            <div className="userShowInfo">
                                <PhoneAndroid className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {order?.orderUser?.phoneNumber}
                                </span>
                            </div>
                            <div className="userShowInfo">
                                <MailOutline className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {order?.orderUser?.email}
                                </span>
                            </div>
                        </div>
                    </div>
                    {!(order.checked === 2 || order.status === "shipped") && (
                        <div className="shipper">
                            <form onSubmit={handleSubmit}>
                                <Autocomplete
                                    value={shipper}
                                    onChange={(event, newValue) => {
                                        setShipper(newValue);
                                    }}
                                    inputValue={shipperInput}
                                    onInputChange={(event, newInputValue) => {
                                        setShipperInput(newInputValue);
                                    }}
                                    disablePortal
                                    id="combo-box"
                                    options={shipperOptions}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Shipper"
                                        />
                                    )}
                                />
                                <button type="submit">Add shipper</button>
                            </form>
                        </div>
                    )}
                </div>
                <div className="orderInfo">
                    <div className="orderDetail">
                        <div className="orderDetailContainer">
                            <div className="orderDetailInfo">
                                <p>Date order: {order?.dateOrder}</p>
                                <p>Date received: {order?.dateReceived}</p>
                                <p>Total: {formatNumber(total)}</p>
                            </div>
                            <div className="orderDetailInfo">
                                <p>Status: {order?.status}</p>
                                <p>Shipper: {order?.shipper?.username}</p>
                                <p>
                                    Payment:{" "}
                                    {order.checked ? "Credit card" : "COD"}
                                </p>
                            </div>
                        </div>
                        {!(
                                    order.checked === 2 ||
                                    order.status === "shipped"
                                )  && (
                            <div className="orderDetailButtonContainer">
                                <button
                                    className="orderDetailButton orderDetailButtonConfirm"
                                    onClick={() =>
                                        handleOrder(order.checked, "confirm")
                                    }
                                >
                                    Confirm order
                                </button>
                                {!(
                                    order.checked === 2 ||
                                    order.status === "shipped"
                                ) && (
                                    <button
                                        className="orderDetailButton"
                                        onClick={() => handleOrder(2, "cancel")}
                                    >
                                        Cancel order
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="orderDataGrid">
                        <DataGrid
                            rows={order?.orderDetails || []}
                            disableSelectionOnClick
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleOrder;
