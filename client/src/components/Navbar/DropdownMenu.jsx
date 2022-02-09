import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGlobalContext } from "../../context/context";
import { ButtonGroup, Box, Avatar } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MopedIcon from "@mui/icons-material/Moped";
import InboxIcon from "@mui/icons-material/Inbox";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function DropdownMenu() {
    const { logOut, checkLogin } = useGlobalContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate("/");
        window.location.reload();
    };

    if (!checkLogin()) {
        return <></>;
    }

    return (
        <Box
            sx={{
                display: "flex",
                "& > *": {
                    m: 1,
                },
            }}
            className="absolute top-14 right-36 w-56 border-gray-400 rounded-lg z-20 bg-white-semiLight shadow-lg p-2"
        >
            <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
            >
                <Link
                    to={`/profile/${localStorage.getItem("id")}`}
                    className="flex mb-2 w-full"
                >
                    <Avatar
                        src={
                            localStorage.avatar !== "null" 
                                ? `http://127.0.0.1:8887/userImages/${localStorage.avatar}`
                                : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                        }
                        sx={{ width: 24, height: 24 }}
                        className="pb-1 mr-4"
                    />
                    My Profile
                </Link>
                <Link
                    to={`/changepassword/${localStorage.getItem("id")}`}
                    className="flex mb-2 w-full"
                >
                    <VpnKeyIcon className="mr-4" />
                    Change Password
                </Link>
                <Link to="/orders" className="flex mb-2 w-full">
                    <InboxIcon className="mr-4" />
                    My order
                </Link>
                {localStorage.roles.includes("ROLE_ADMIN") && (
                    <button className="flex mb-2 w-full">
                        <a href="http://localhost:3001" target="_self">
                            <ManageAccountsIcon className="mr-4" />
                            Admin page
                        </a>
                    </button>
                )}
                {localStorage.roles.includes("ROLE_SHIPPER") && (
                    <button className="flex mb-2 w-full">
                        <a href="http://localhost:3003" target="_self">
                            <MopedIcon className="mr-4" />
                            Shipper page
                        </a>
                    </button>
                )}
                <Link
                    to={"/"}
                    onClick={handleLogout}
                    className="flex mb-2 w-full"
                >
                    <LogoutIcon className="mr-4" />
                    Sign out
                </Link>
            </ButtonGroup>
        </Box>
    );
}

export default DropdownMenu;
