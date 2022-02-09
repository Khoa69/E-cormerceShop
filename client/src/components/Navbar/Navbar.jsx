import React from "react";
import SecondaryMenu from "./SecondaryMenu";
import Logo from "../Logo/Logo";
import { useGlobalContext } from "../../context/context";
import { Link } from "react-router-dom";

function Navbar() {
    const { categories } = useGlobalContext();

    const navSelectItems = categories.map(({ category }) => {
        const shortCategory = category.toLowerCase().replace(" ", "");

        return {
            title: category,
            link: `/products/${shortCategory}`,
        };
    });

    return (
        <nav className="flex items-center justify-between flex-wrap p-4 shadow-lg">
            <div className="w-full md:w-4/5 md:mx-auto flex justify-between">
                {/* logo */}
                <Logo />
                {/* primary menu */}
                <div className="hidden lg:flex lg:w-auto items-center">
                    <div className="flex justify-around flex-wrap items-center space-x-10">
                        {navSelectItems.map((category, index) => (
                            <Link to={category.link} key={index}>
                                <p className="py-1 px-3 border-green-dark border-opacity-0 border-2 rounded-full hover:text-green-dark hover:border-opacity-100 dark:hover:text-nightMode-hightLight dark:hover:border-2 dark:hover:border-nightMode-hightLight dark:hover:bg-transparent">
                                    {category.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
                {/* secondary menu */}
                <div className="hidden lg:flex md:flex">
                    <SecondaryMenu />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
