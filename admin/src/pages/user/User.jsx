import React, { useState, useEffect } from "react";
import "./user.css";
import { useParams } from "react-router-dom";
import {
    CalendarToday,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import TransgenderIcon from "@mui/icons-material/Transgender";
import axios from "axios";
import UserSubMenu from "../../components/subMenu/UserSubMenu";
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
    Button,
    Checkbox,
} from "@mui/material";
import Login from "../login/LogIn";
import { useAlert } from "react-alert";
import { useGlobalContext } from "../../context/context";

function User() {
    const { userId } = useParams();
    const { checkLogin } = useGlobalContext();
    const alert = useAlert();

    const [user, setUser] = useState({});

    const [username, setUsername] = useState(undefined);
    const [fullName, setFullName] = useState(undefined);
    const [dob, setDob] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [avatar, setAvatar] = useState(null);
    const [gender, setGender] = useState(-1);
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

    const fetchUser = async (id) => {
        const res = await axios.get(
            `http://localhost:8080/doubleK/api/user/${id}`,
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
            setUser(res.data);
        } else {
            setUser({});
        }
    };

    useEffect(() => {
        if (checkLogin()) {
            fetchUser(userId);
        }
    }, [userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = new FormData();
        if (avatar) {
            data.append("multipartFile", avatar, avatar.name);
        }
        data.append("username", username || user.username);
        data.append("fullName", fullName || user.fullName);
        data.append(
            "dateOfBirth",
            dob.toJSON().slice(0, 10) || user.dateOfBirth
        );
        data.append("phoneNumber", phoneNumber || user.phoneNumber);
        data.append("email", email || user.email);
        // data.append("password", user.password);
        data.append("gender", gender !== -1 ? gender : user.gender);
        data.append(
            "roles",
            JSON.stringify(roles) !==
                JSON.stringify({ 1: false, 2: false, 3: false })
                ? Object.keys(roles).filter((key) => roles[key])
                : user.roles.map(({ id }) => id)
        );

        // for (let pair of data.entries()) {
        //     console.log(pair[0] + " " + pair[1]);
        // }

        await axios
            .put(`http://localhost:8080/doubleK/api/user/${userId}`, data, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        ?.split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then((response) => alert.success(response.data.status))
            .then(() => window.location.reload())
            .catch((error) => alert.error(error.response.data.errorMessages));
    };

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="userPage">
            {window.location.href.includes("http://localhost:3001/user") && (
                <div className="userTitleContainer">
                    <UserSubMenu subMenuName="Edit User" />
                </div>
            )}
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={
                                user.imageUser?.path
                                    ? `http://127.0.0.1:8887/userImages/${user.imageUser?.path}`
                                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                            }
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">
                                {user.username}
                            </span>
                            <span className="userShowUserTitle">
                                {user.roles &&
                                    `[${user.roles.map((role) => role.name)}]`}
                            </span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {user.fullName}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <TransgenderIcon className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {user?.gender === 0
                                    ? "Male"
                                    : user.gender === 1
                                    ? "Female"
                                    : "Other"}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {new Date(
                                    user.dateOfBirth
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {user.phoneNumber}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm" onSubmit={handleSubmit}>
                        <FormControl className="userUpdateLeft">
                            <TextField
                                label="Full name"
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder={user?.fullName}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date of birth"
                                    inputFormat="dd/MM/yyyy"
                                    value={user.dateOfBirth || ""}
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
                            <TextField
                                label="Phone number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder={user?.phoneNumber}
                                type="tel"
                            />
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
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    />
                                    <FormControlLabel
                                        value={1}
                                        control={<Radio />}
                                        label="Female"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    />
                                    <FormControlLabel
                                        value={2}
                                        control={<Radio />}
                                        label="Other"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
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
                                    <FormLabel htmlFor="shipper">
                                        Shipper
                                    </FormLabel>
                                </div>
                            </FormControl>
                        </FormControl>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={
                                        user.imageUser?.path
                                            ? `http://127.0.0.1:8887/userImages/${user.imageUser?.path}`
                                            : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                                    }
                                    alt=""
                                />
                                <Button>
                                    <Publish className="userUpdateIcon" />
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) =>
                                            setAvatar(e.target.files[0])
                                        }
                                    />
                                </Button>
                            </div>
                            <Button
                                variant="outlined"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default User;
