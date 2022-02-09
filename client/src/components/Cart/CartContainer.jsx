import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/context";
import CartItem from "./CartItem";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Otp from "./Otp";

function CartContainer() {
    const alert = useAlert();
    const navigate = useNavigate();

    const [openOtp, setOpenOtp] = useState(false);
    const [otp, setOtp] = useState("");

    const [payment, setPayment] = useState(0);
    const [creditNumber, setCreditNumber] = useState("");
    const [creditId, setCreditId] = useState(0);
    const [creditDate, setCreditDate] = useState(new Date());
    const [creditOwner, setCreditOwner] = useState("");

    const { cart, total, clearCart, credits, formatNumber, checkLogin } =
        useGlobalContext();

    useEffect(() => {
        const res = credits.find(
            ({ numberOfCreditCard }) =>
                numberOfCreditCard === parseInt(creditNumber)
        );

        if (res) {
            setCreditId(res.id);
        }
    }, [creditNumber, credits]);

    const saveOrder = async () => {
        await axios
            .post(
                "http://localhost:8080/doubleK/api/order/save",
                {
                    dateOrder: new Date().toISOString().slice(0, 10),
                    dateReceived: new Date(
                        new Date().setDate(new Date().getDate() + 30)
                    )
                        .toISOString()
                        .slice(0, 10),
                    status: "waiting",
                    orderDetails: JSON.parse(localStorage.cart).map(
                        ({ amount, price, id }) =>
                            new Object({
                                productId: id,
                                price:price*amount,
                                quantity: amount,
                            })
                    ),
                    orderID: localStorage.id,
                    checked: parseInt(payment),
                    paymentID: creditId,
                },
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
            .then(() => localStorage.removeItem("cart"))
            .then(() => navigate("/"))
            .then(() => window.location.reload())
            .then(() => alert.success("Making order 📦"))
            .catch((error) => console.log(error.response));
    };

    const creditCardBuy = async () => {
        const data = {
            numberOfCreditCard: creditNumber,
            price: total,
            month: creditDate.getMonth() + 1,
            year: creditDate.getFullYear(),
            ownerCredit: creditOwner,
        };

        await axios
            .put(
                `http://localhost:8080/doubleK/api/credit/buy/${creditId}`,
                data,
                {
                    headers: {
                        Authorization: document?.cookie
                            ?.split("; ")
                            .find((token) => token.includes("doubleKToken"))
                            ?.split("=")[1],
                    },
                }
            )
            .then(() => saveOrder())
            .catch((error) => alert.error(error.response.data.message));
    };

    const handleBuy = async () => {
        if (!checkLogin()) {
            return navigate("/login");
        }

        if (payment === 0) {
            return saveOrder();
        }

        if (payment === "1") {
            if (creditNumber === "") {
                return alert.error("Please input credit card number");
            }

            if (creditOwner === "") {
                return alert.error("Please input credit owner");
            }

            if (creditDate === "") {
                return alert.error("Please input credit date");
            }

            if (
                !credits.find(
                    ({ numberOfCreditCard }) =>
                        numberOfCreditCard === parseInt(creditNumber)
                )
            ) {
                return alert.error("Invalid credit card");
            }
        }

        const res = await axios.get(
            `http://localhost:8080/doubleK/api/user/otp/${localStorage.id}`,
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
            setOtp(res.data.data);
            setOpenOtp(true);
        }
    };

    if (cart.length === 0) {
        return (
            <section className="cart w-11/12 my-0 mx-auto mt-10 py-9 px-0">
                <header>
                    <h2 className="uppercase text-center mb-12 text-2xl">
                        your wishlist
                    </h2>
                    <h4 className="empty-cart lowercase text-gray-500 text-xl mt-4 text-center">
                        is current empty
                    </h4>
                </header>
            </section>
        );
    }

    return (
        <section className="cart w-11/12 my-0 mx-auto mt-10 py-9 px-0">
            <div className="top flex">
                <div
                    className="left flex-auto p-5 shadow-lg"
                    style={{ flex: 2 }}
                >
                    <header>
                        <h1 className="uppercase text-center mb-12 text-2xl">
                            your wishlist
                        </h1>
                    </header>
                    <div>
                        {cart.map((item) => {
                            return <CartItem key={item.id} {...item} />;
                        })}
                    </div>
                    <hr />
                    <div className="cart-total">
                        <h4 className="flex justify-between mt-4 font-semibold">
                            Total <span>{formatNumber(total)} vnd</span>
                        </h4>
                    </div>
                </div>
                <div className="right flex-1 p-5 ml-5 shadow-lg">
                    <h1 className="text-center text-2xl">Payment</h1>
                    <div>
                        <div className="mt-5 border-4 rounded-lg p-3 border-green-dark">
                            <input
                                type="radio"
                                id="cod"
                                value="0"
                                name="payment"
                                defaultChecked
                                className="form-radio h-6 w-6 text-green-dark"
                                onChange={(e) => setPayment(e.target.value)}
                            />
                            <label
                                htmlFor="cod"
                                className="ml-3 text-lg h-6 top-0 leading-4"
                            >
                                Cash on Delivery
                            </label>
                        </div>
                        <div className="mt-5 border-4 rounded-lg p-3 border-green-dark">
                            <input
                                type="radio"
                                id="credit"
                                value="1"
                                className="form-radio h-6 w-6 text-green-dark"
                                name="payment"
                                onChange={(e) => setPayment(e.target.value)}
                            />
                            <label htmlFor="credit" className="ml-3 text-lg">
                                Credit Card
                            </label>
                            <Otp
                                openOtp={openOtp}
                                setOpenOtp={setOpenOtp}
                                creditCardBuy={creditCardBuy}
                                otp={otp}
                            />
                            <div className="flex flex-col gap-2 mt-2">
                                <TextField
                                    id="outlined-basic"
                                    label="Credit card number"
                                    className="mt-5 outline-none text-gray-500 rounded-lg p-3 border-none border-0 w-full"
                                    onChange={(e) =>
                                        setCreditNumber(e.target.value)
                                    }
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Credit owner"
                                    onChange={(e) =>
                                        setCreditOwner(e.target.value)
                                    }
                                    className="mt-5 outline-none text-gray-500 rounded-lg p-3 border-none border-0 w-full"
                                    variant="outlined"
                                />
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        views={["year", "month"]}
                                        label="Credit date"
                                        minDate={new Date("2012-03-01")}
                                        maxDate={new Date("2023-06-01")}
                                        onChange={(newValue) =>
                                            setCreditDate(newValue)
                                        }
                                        value={creditDate}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                helperText={null}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mt-5 text-center p-5 shadow-lg w-full">
                <div className="flex justify-between">
                    <button
                        className="btn clear-btn bg-transparent py-2 px-4 text-green-dark border-2 border-solid border-green-dark mt-9 rounded hover:bg-gray-300 hover:text-white-default hover:border-gray-300 capitalize"
                        onClick={() => {
                            clearCart();
                            alert.success("Clear cart!");
                        }}
                    >
                        clear cart
                    </button>
                    <button
                        className="capitalize bg-transparent py-2 px-4 text-green-dark border-2 border-solid border-green-dark mt-9 rounded hover:bg-green-dark hover:text-white-semiLight"
                        onClick={handleBuy}
                    >
                        buy
                    </button>
                </div>
            </footer>
        </section>
    );
}

export default CartContainer;
