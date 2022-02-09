import React from "react";
import Logo from "../Logo/Logo";
import About from "./About";
import Connect from "./Connect";
import Help from "./Help";
import PaymentMethods from "./PaymentMethods";

function Footer() {
    return (
        <footer className="footer-1 bg-gray-100 py-8 sm:py-12 dark:bg-gray-800">
            <div className="container mx-auto px-4 w-full md:w-4/5 md:mx-auto">
                <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
                    <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
                        <Logo />
                    </div>
                    <PaymentMethods />
                    <About />
                    <Help />
                    <Connect />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
