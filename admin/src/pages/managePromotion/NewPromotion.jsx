import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./managePromotion.css";
import { useAlert } from "react-alert";
import ProductSubMenu from "../../components/subMenu/ProductSubMenu";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Login from "../login/LogIn";
import { useGlobalContext } from "../../context/context";

function NewPromotion() {
    const alert = useAlert();

    const { checkLogin } = useGlobalContext();

    const navigate = useNavigate();

    const [dateBegin, setDateBegin] = useState(new Date().toLocaleDateString());
    const [dateEnd, setDateEnd] = useState(new Date().toLocaleDateString());
    const [saleOff, setSaleOff] = useState(0.0);
    const [content, setContent] = useState("");

    const handleDateBeginChange = (newValue) => {
        setDateBegin(newValue);
    };

    const handleDateEndChange = (newValue) => {
        setDateEnd(newValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (dateBegin > dateEnd) {
            return alert.error("Date begin must be before date end!");
        }

        if (new Date(dateEnd) < new Date()) {
            return alert.error("Promotion ending in the past!");
        }

        const data = {
            dateBegin: dateBegin.toString().slice(0, 10),
            dateEnd: dateEnd.toString().slice(0, 10),
            saleOff,
            content,
        };

        // console.log(data);
        await axios
            .post("http://localhost:8080/doubleK/api/promotion/save", data, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then(() => alert.success("Promotion created!"))
            .catch((e) => console.log(e));

        return navigate("/product/managepromotion");
    };

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="newPromotion">
            <ProductSubMenu subMenuName="New Promotion" />
            <form onSubmit={handleSubmit} className="addPromotionForm">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date begin"
                        inputFormat="dd/MM/yyyy"
                        value={dateBegin}
                        onChange={handleDateBeginChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                        label="Date end"
                        inputFormat="dd/MM/yyyy"
                        value={dateEnd}
                        onChange={handleDateEndChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                {/* <div className="addPromotionItem">
                    <label>Date Begin</label>
                    <input
                        type="date"
                        value={dateBegin}
                        onChange={(e) => setDateBegin(e.target.value)}
                    />
                </div>
                <div className="addPromotionItem">
                    <label>Date End</label>
                    <input
                        type="date"
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.target.value)}
                    />
                </div> */}
                <TextField
                    label="Sale off"
                    variant="outlined"
                    value={saleOff}
                    type="number"
                    onChange={(e) => setSaleOff(e.target.value)}
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {/* <div className="addPromotionItem">
                    <label>Sale off</label>
                    <input
                        type="number"
                        min={0}
                        step="0.1"
                        value={saleOff}
                        onChange={(e) => setSaleOff(e.target.value)}
                    />
                </div>
                <div className="addPromotionItem">
                    <label>Content</label>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div> */}
                <button type="submit" className="addPromotionButton">
                    Create
                </button>
            </form>
        </div>
    );
}

export default NewPromotion;
