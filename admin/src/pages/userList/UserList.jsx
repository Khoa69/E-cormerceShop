import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./userList.css";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import UserSubMenu from "../../components/subMenu/UserSubMenu";
import { useGlobalContext } from "../../context/context";
import axios from "axios";
import Login from "../login/LogIn";
import { useAlert } from "react-alert";

function UserList() {
    const navigate = useNavigate();
    const alert = useAlert();

    const { users, fetchUsers, checkLogin } = useGlobalContext();

    const handleDelete = async (id) => {
        await axios
            .delete(`http://localhost:8080/doubleK/api/user/${id}`, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then(() => fetchUsers())
            .then(() => navigate("/users"))
            .catch((error) => alert.error(error.response.data.message));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "username",
            headerName: "User",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img
                            className="userListImg"
                            // src={params.row.avatar}
                            src={
                                params.row.imageUser?.path
                                    ? `http://127.0.0.1:8887/userImages/${params.row.imageUser?.path}`
                                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                            }
                            alt=""
                        />
                        {params.row.username}
                    </div>
                );
            },
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 120,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.gender === "0"
                            ? "Male"
                            : params.row.gender === "1"
                            ? "Female"
                            : "Other"}
                    </div>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "phoneNumber",
            headerName: "Phone number",
            width: 180,
        },
        {
            field: "roles",
            headerName: "Roles",
            width: 220,
            renderCell: (params) => {
                return (
                    <p>{`[${params.row.roles.map(
                        (role) => `${role.name}`
                    )}]`}</p>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
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
        <div className="userList">
            <UserSubMenu subMenuName="User Manage" />
            <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}

export default UserList;
