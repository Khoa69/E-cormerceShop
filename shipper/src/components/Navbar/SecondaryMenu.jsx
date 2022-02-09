import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Avatar from "@mui/material/Avatar";
import DropdownMenu from "./DropdownMenu";

function SecondaryMenu() {
    const { checkLogin } = useGlobalContext();

    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-wrap space-x-5 w-max">
            {checkLogin() ? (
                <button
                    className="text-gray-500 dark:text-white-default"
                    onClick={() => {
                        setOpen(!open);
                    }}
                    type="button"
                >
                    <Avatar
                        src={
                            localStorage.avatar != "null" 
                                ? `http://127.0.0.1:8887/userImages/${localStorage.avatar}`
                                : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                        }
                        sx={{ width: 32, height: 32 }}
                        className="pb-1 ml-4"
                    />
                    {open && <DropdownMenu />}
                </button>
            ) : (
                <div className="py-1">
                    <Link to="/login">Login</Link>
                </div>
            )}
        </div>
    );
}

export default SecondaryMenu;
