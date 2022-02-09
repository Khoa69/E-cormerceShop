import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./manageCredit.css";
import { useAlert } from "react-alert";
import Login from "../login/LogIn";
import TextField from "@mui/material/TextField";
import { useGlobalContext } from "../../context/context";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

function EditCredit() {
    const alert = useAlert();

    const { formatCreditNumber, checkLogin } = useGlobalContext();

    const [creditCard, setCreditCard] = useState({
        id: -1,
        numberOfCreditCard: 0,
        price: 0,
        date: "",
    });

    const [date, setDate] = useState(undefined);
    const [balance, setBalance] = useState(undefined);

    const [deposit, setDeposit] = useState(0);
    const [withdraw, setWithdraw] = useState(0);

    const { creditId } = useParams();

    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const fetchCredit = useCallback(async () => {
        const res = await axios.get(
            `http://localhost:8080/doubleK/api/credit/${creditId}`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            setCreditCard(res.data);
        } else {
            setCreditCard({});
        }
    }, [creditId]);

    useEffect(() => {
        if (checkLogin()) {
            fetchCredit();
        }
    }, [checkLogin, fetchCredit]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = {
            numberOfCreditCard: creditCard.numberOfCreditCard,
            price: balance || creditCard.price,
            date: date.toJSON().slice(0, 10) || creditCard.date,
        };

        await axios
            .put(`http://localhost:8080/doubleK/api/credit/${creditId}`, data, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then((response) => alert.success(response.data.status))
            .then(() => fetchCredit())
            .then(() => window.location.reload())
            .catch((error) => alert.error(error.response.data.errorMessages));
    };

    const handleDeposit = async (e) => {
        e.preventDefault();

        await axios
            .put(
                `http://localhost:8080/doubleK/api/credit/add/${creditId}`,
                { price: deposit },
                {
                    headers: {
                        accept: "application/json",
                        Authorization: document?.cookie
                            .split("; ")
                            .find((token) => token.includes("doubleKToken"))
                            .split("=")[1],
                    },
                }
            )
            .then((response) => alert.success(response.data.message))
            .then(() => setDeposit(0))
            .then(() => window.location.reload())
            .catch((error) => {
                console.log(error.response);
                alert.error("Error!");
            });
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();

        await axios
            .put(
                `http://localhost:8080/doubleK/api/credit/buy/${creditId}`,
                { price: withdraw },
                {
                    headers: {
                        accept: "application/json",
                        Authorization: document?.cookie
                            .split("; ")
                            .find((token) => token.includes("doubleKToken"))
                            .split("=")[1],
                    },
                }
            )
            .then((response) => alert.success(response.data.message))
            .then(() => setDeposit(0))
            .then(() => window.location.reload())
            .catch((error) => {
                console.log(error.response);
                alert.error("Error!");
            });
    };

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="credit">
            <div className="creditTitleContainer">
                <h1>{`Credit ${creditId}`}</h1>
            </div>
            <div className="creditContainer">
                <div className="creditLeft">
                    <form className="creditFormUpdate" onSubmit={handleUpdate}>
                        <TextField
                            label="Credit number"
                            variant="outlined"
                            disabled
                            value={formatCreditNumber(
                                creditCard.numberOfCreditCard.toString()
                            )}
                        />
                        <TextField
                            label="Balance"
                            type="number"
                            variant="outlined"
                            placeholder={creditCard.price}
                            onChange={(e) => setBalance(e.target.value)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Credit date"
                                inputFormat="dd/MM/yyyy"
                                value={new Date(creditCard.date) || ""}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                minDate={
                                    new Date(
                                        new Date().setDate(
                                            new Date().getDate() + 1
                                        )
                                    )
                                }
                            />
                        </LocalizationProvider>
                        <button type="submit">Update credit</button>
                    </form>
                </div>
                <div className="creditRight">
                    <form
                        className="creditFormUpdateBalance"
                        onSubmit={handleDeposit}
                    >
                        <TextField
                            label="Deposit"
                            type="number"
                            variant="outlined"
                            onChange={(e) => setDeposit(e.target.value)}
                        />
                        <button type="submit">Deposit</button>
                    </form>
                    <form
                        className="creditFormUpdateBalance"
                        onSubmit={handleWithdraw}
                    >
                        <TextField
                            label="Withdraw"
                            type="number"
                            variant="outlined"
                            onChange={(e) => setWithdraw(e.target.value)}
                        />
                        <button type="submit">Withdraw</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCredit;
