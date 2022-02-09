import React from "react";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <div className="w-full md:flex md:w-auto items-center md:flex-shrink-0 text-green-dark md:mr-6">
            <Link to="/">
                <div className="font-semibold text-4xl md:text-2xl lg:text-3xl text-center tracking-wider">
                    doubleK
                </div>
            </Link>
        </div>
    );
}

export default Logo;
