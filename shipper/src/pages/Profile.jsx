import React, { useState, useEffect } from "react";
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
import Login from "./LogIn";
import { useAlert } from "react-alert";
import { useGlobalContext } from "../context/context";

function Profile() {
    const { userId } = useParams();
    const alert = useAlert();

    const { checkLogin } = useGlobalContext();

    const [user, setUser] = useState({});

    const [username, setUsername] = useState(undefined);
    const [fullName, setFullName] = useState(undefined);
    const [dob, setDob] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [avatar, setAvatar] = useState(null);
    const [gender, setGender] = useState(-1);

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
    }, [checkLogin, userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = new FormData();
        if (avatar) {
            data.append("multipartFile", avatar, avatar.name);
        }
        data.append("username", username || user.username);
        data.append("fullName", fullName || user.fullName);
        data.append("dateOfBirth", dob || user.dateOfBirth);
        data.append("phoneNumber", phoneNumber || user.phoneNumber);
        data.append("email", email || user.email);
        // data.append("password", user.password);
        data.append("gender", gender !== -1 ? gender : user.gender);
        data.append(
            "roles",
            user.roles.map(({ id }) => id)
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
        <div className="userPage w-4/5 mx-auto">
            <div className="userContainer flex mt-5">
                <div className="userShow flex-1 p-5 shadow-lg">
                    <div className="userShowTop flex items-center">
                        <img
                            src={
                                user.imageUser?.path
                                    ? `http://127.0.0.1:8887/userImages/${user.imageUser?.path}`
                                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                            }
                            alt=""
                            className="userShowImg w-10 h-10 rounded-full object-cover"
                        />
                        <div className="userShowTopTitle flex flex-col ml-5">
                            <span className="userShowUsername font-semibold">
                                {user.username}
                            </span>
                        </div>
                    </div>
                    <div className="userShowBottom mt-5">
                        <span className="userShowTitle text-sm font-semibold">
                            Account Details
                        </span>
                        <div className="userShowInfo flex items-center my-5 mx-0">
                            <PermIdentity className="userShowIcon text-base" />
                            <span className="userShowInfoTitle ml-2">
                                {user.fullName}
                            </span>
                        </div>
                        <div className="userShowInfo flex items-center my-5 mx-0">
                            <TransgenderIcon className="userShowIcon text-base" />
                            <span className="userShowInfoTitle ml-2">
                                {user?.gender === 0
                                    ? "Male"
                                    : user.gender === 1
                                    ? "Female"
                                    : "Other"}
                            </span>
                        </div>
                        <div className="userShowInfo flex items-center my-5 mx-0">
                            <CalendarToday className="userShowIcon text-base" />
                            <span className="userShowInfoTitle ml-2">
                                {new Date(
                                    user.dateOfBirth
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <span className="userShowTitle text-sm font-semibold">
                            Contact Details
                        </span>
                        <div className="userShowInfo flex items-center my-5 mx-0">
                            <PhoneAndroid className="userShowIcon text-base" />
                            <span className="userShowInfoTitle ml-2">
                                {user.phoneNumber}
                            </span>
                        </div>
                        <div className="userShowInfo flex items-center my-5 mx-0">
                            <MailOutline className="userShowIcon text-base" />
                            <span className="userShowInfoTitle ml-2">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    className="userUpdate ml-5 shadow-lg py-5 px-10"
                    style={{ flex: 2 }}
                >
                    <span className="userUpdateTitle text-2xl font-semibold">
                        Edit
                    </span>
                    <form
                        className="userUpdateForm flex justify-between mt-5"
                        onSubmit={handleSubmit}
                    >
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem flex flex-col mt-2">
                                <label className="mb-1 text-sm">Username</label>
                                <input
                                    type="text"
                                    disabled
                                    // defaultValue={user.username}
                                    placeholder={user?.username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="userUpdateInput w-64 h-8 border-b-2 border-gray-200"
                                />
                            </div>
                            <div className="userUpdateItem flex flex-col mt-2">
                                <label className="mb-1 text-sm">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder={user?.fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className="userUpdateInput w-64 h-8 border-b-2 border-gray-200"
                                />
                            </div>
                            <div className="userUpdateItem flex flex-col mt-2">
                                <label className="mb-1 text-sm">
                                    Date of birth
                                </label>
                                <input
                                    type="date"
                                    max={new Date().toJSON().slice(0, 10)}
                                    min={new Date(
                                        new Date().setFullYear(
                                            new Date().getFullYear() - 100
                                        )
                                    )
                                        .toJSON()
                                        .slice(0, 10)}
                                    defaultValue={user.dateOfBirth}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="userUpdateInput w-64 h-8 border-b-2 border-gray-200"
                                />
                            </div>
                            <div className="userUpdateItem flex flex-col mt-2">
                                <label className="mb-1 text-sm">Email</label>
                                <input
                                    type="email"
                                    placeholder={user?.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="userUpdateInput w-64 h-8 border-b-2 border-gray-200"
                                />
                            </div>
                            <div className="userUpdateItem flex flex-col mt-2">
                                <label className="mb-1 text-sm">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder={user?.phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    className="userUpdateInput w-64 h-8 border-b-2 border-gray-200"
                                />
                            </div>
                            <div className="userUpdateItem flex flex-col mt-2">
                                <p className="mb-1 text-base">Gender</p>
                                <div className="userGender">
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        value="0"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        className="mt-4"
                                    />
                                    <label
                                        htmlFor="male"
                                        className="m-2 text-base"
                                    >
                                        Male
                                    </label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        value="1"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        className="mt-4"
                                    />
                                    <label
                                        htmlFor="female"
                                        className="m-2 text-base"
                                    >
                                        Female
                                    </label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="other"
                                        value="2"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        className="mt-4"
                                    />
                                    <label
                                        htmlFor="other"
                                        className="m-2 text-base"
                                    >
                                        Other
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="userUpdateRight flex flex-col justify-between">
                            <div className="userUpdateUpload flex items-center">
                                <img
                                    className="userUpdateImg w-24 h-24 rounded-xl object-cover mr-5"
                                    src={
                                        user.imageUser?.path
                                            ? `http://127.0.0.1:8887/userImages/${user.imageUser?.path}`
                                            : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                                    }
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon cursor-pointer" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        setAvatar(e.target.files[0]);
                                    }}
                                />
                            </div>
                            <button className="userUpdateButton rounded border-none p-1 cursor-pointer bg-green-dark text-white-default font-semibold">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
