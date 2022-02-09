import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Connect() {
    return (
        <div className="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
            <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">
                Stay connected
            </h5>
            <div className="flex sm:justify-center xl:justify-start">
                <a
                    href="/"
                    className="w-10 h-10 border-2 text-xl border-gray-400 rounded-full text-center text-gray-600 hover:text-white-default hover:bg-blue-600 hover:border-blue-600 mr-6 dark:text-white-default"
                >
                    <FacebookIcon />
                </a>
                <a
                    href="/"
                    className="w-10 h-10 border-2 text-xl border-gray-400 rounded-full text-center text-gray-600 hover:text-white-default bg-gradient-to-tr hover:from-instagram-first hover:to-instagram-fifth mr-6 dark:text-white-default"
                >
                    <InstagramIcon />
                </a>
                <a
                    href="/"
                    className="w-10 h-10 border-2 text-xl border-gray-400 rounded-full text-center text-gray-600 hover:text-white-default hover:bg-red-600 hover:border-red-600 dark:text-white-default"
                >
                    <YouTubeIcon />
                </a>
            </div>
        </div>
    );
}

export default Connect;
