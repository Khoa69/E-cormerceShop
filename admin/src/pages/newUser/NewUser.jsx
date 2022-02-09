import axios from "axios";
import React, { useState } from "react";
import "./newUser.css";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import UserSubMenu from "../../components/subMenu/UserSubMenu";
import { useGlobalContext } from "../../context/context";
import Login from "../login/LogIn";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import FormControl from "@mui/material/FormControl";
import {
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Checkbox,
} from "@mui/material";

function NewUser() {
    const alert = useAlert();
    const navigate = useNavigate();
    const { fetchUsers, checkLogin } = useGlobalContext();

    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState(2);
    const [roles, setRoles] = useState({
        1: false,
        2: false,
        3: false,
    });

    const handleCheckbox = (event) => {
        setRoles({ ...roles, [event.target.value]: event.target.checked });
    };

    const handleDateChange = (newValue) => {
        setDob(newValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        if (avatar) {
            data.append("multipartFile", avatar, avatar.name);
        }
        data.append("username", username);
        data.append("fullName", fullName);
        data.append("dateOfBirth", dob.toString().slice(0, 10));
        data.append("phoneNumber", phoneNumber);
        data.append("email", email);
        data.append("password", password);
        data.append("gender", gender);
        data.append(
            "roles",
            Object.keys(roles).filter((key) => roles[key])
        );

        await axios
            .post("http://localhost:8080/doubleK/api/user/save", data, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then((response) => alert.success(response.data.status))
            .then(() => fetchUsers())
            .then(() => navigate("/users"))
            .catch((error) => {
                console.log(error);
                alert.error("Error!");
            });
    };

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="newUser">
            <UserSubMenu subMenuName="New User" />
            <form onSubmit={handleSubmit}>
                <div className="newUserForm">
                    <FormControl className="newUserFormLeft">
                        <div className="newUserItem">
                            <input
                                type="file"
                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                        </div>
                        <TextField
                            label="User name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl className="newUserFormRight">
                        <TextField
                            label="Phone"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date of birth"
                                inputFormat="dd/MM/yyyy"
                                value={dob}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                maxDate={new Date()}
                                minDate={
                                    new Date(
                                        new Date().setFullYear(
                                            new Date().getFullYear() - 100
                                        )
                                    )
                                }
                            />
                        </LocalizationProvider>
                        <FormControl className="userUpdateItem">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                row
                            >
                                <FormControlLabel
                                    value={0}
                                    control={<Radio />}
                                    label="Male"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <FormControlLabel
                                    value={1}
                                    control={<Radio />}
                                    label="Female"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <FormControlLabel
                                    value={2}
                                    control={<Radio />}
                                    label="Other"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className="userUpdateItem">
                            <FormLabel component="legend">Roles</FormLabel>
                            <div className="newUserRole">
                                <Checkbox
                                    value={1}
                                    onChange={handleCheckbox}
                                    id="user"
                                />
                                <FormLabel htmlFor="user">User</FormLabel>
                                <Checkbox
                                    value={2}
                                    onChange={handleCheckbox}
                                    id="admin"
                                />
                                <FormLabel htmlFor="admin">Admin</FormLabel>
                                <Checkbox
                                    value={3}
                                    onChange={handleCheckbox}
                                    id="shipper"
                                />
                                <FormLabel htmlFor="shipper">Shipper</FormLabel>
                            </div>
                        </FormControl>
                        <button type="submit" className="newUserButton">
                            Create
                        </button>
                    </FormControl>
                </div>
            </form>
        </div>
    );
}

export default NewUser;
