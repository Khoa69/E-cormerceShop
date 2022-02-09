import React from "react";
import SecondaryMenu from "./SecondaryMenu";
import Logo from "../Logo/Logo";

function Navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap p-4 shadow-lg h-20">
            <div className="w-full md:w-4/5 md:mx-auto flex justify-between">
                {/* logo */}
                <Logo />
                {/* secondary menu */}
                <div className="hidden lg:flex md:flex">
                    <SecondaryMenu />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
