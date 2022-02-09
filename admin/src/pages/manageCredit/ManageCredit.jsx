import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Login from "../login/LogIn";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { useGlobalContext } from "../../context/context";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import "./manageCredit.css";

function ManageCredit() {
    const alert = useAlert();

    const { users, credits, formatCreditNumber, formatNumber, checkLogin } =
        useGlobalContext();

    const userOptions = users.map(({ username }) => username);

    const [creditNumber, setCreditNumber] = useState("");
    const [date, setDate] = useState("");
    const [owner, setOwner] = useState(userOptions[0]);
    const [ownerInput, setOwnerInput] = useState("");
    const [balance, setBalance] = useState(0);

    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const isNumeric = (str) => {
        if (typeof str != "string") return false;
        return !isNaN(str) && !isNaN(parseFloat(str));
    };

    const handleDelete = async (id) => {
        await axios
            .delete(`http://localhost:8080/doubleK/api/credit/${id}`, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then((response) => alert.success(response.data.status))
            .catch((error) => alert.error(error.response.errorMessages));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (creditNumber.length !== 12) {
            return alert.error("Credit number must have 12 numbers!");
        }

        if (!isNumeric(creditNumber)) {
            return alert.error("Credit number only have number character!");
        }

        const data = {
            numberOfCreditCard: creditNumber,
            price: balance,
            date: date.toJSON().slice(0, 10),
            ownerCredit: owner,
        };

        // console.log(data);
        await axios
            .post("http://localhost:8080/doubleK/api/credit/save", data, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then((response) => alert.success(response.data.message))
            .then(() => {
                setCreditNumber("");
                setDate("");
                setBalance(0);
            })
            .catch((error) => alert.error(error.response.data.message));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "numberOfCreditCard",
            headerName: "Card Number",
            width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        {formatCreditNumber(
                            params.row.numberOfCreditCard.toString()
                        )}
                    </div>
                );
            },
        },
        { field: "ownerCredit", headerName: "Owner", width: 200 },
        {
            field: "price",
            headerName: "Balance",
            width: 200,
            renderCell: (params) => {
                return <div>{formatNumber(params.row.price)}</div>;
            },
        },
        { field: "date", headerName: "Date", width: 200 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/credit/" + params.row.id}>
                            <button className="creditListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="orderListDelete"
                            onClick={() => handleDelete(params.row.id)}
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
        <div className="creditList">
            <div className="creditHeader">
                <h1 className="creditHeaderTitle">Credit</h1>
                <form className="creditForm" onSubmit={handleSubmit}>
                    <TextField
                        label="Credit number"
                        variant="outlined"
                        onChange={(e) => setCreditNumber(e.target.value)}
                    />
                    <Autocomplete
                        value={owner}
                        onChange={(event, newValue) => {
                            setOwner(newValue);
                        }}
                        inputValue={ownerInput}
                        onInputChange={(event, newInputValue) => {
                            setOwnerInput(newInputValue);
                        }}
                        disablePortal
                        id="combo-box"
                        options={userOptions}
                        sx={{ width: 150 }}
                        renderInput={(params) => (
                            <TextField {...params} label="User" />
                        )}
                    />
                    <TextField
                        label="Balance"
                        type="number"
                        variant="outlined"
                        onChange={(e) => setBalance(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Credit date"
                            inputFormat="dd/MM/yyyy"
                            value={date || ""}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                            minDate={
                                new Date(
                                    new Date().setDate(new Date().getDate() + 1)
                                )
                            }
                        />
                    </LocalizationProvider>
                    <button type="submit">Create credit</button>
                </form>
            </div>
            <DataGrid
                rows={credits}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row.id}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}

export default ManageCredit;
