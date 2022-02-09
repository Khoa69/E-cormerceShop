import React from "react";

function About() {
    return (
        <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
            <h5 className="text-xl font-bold mb-6">About</h5>
            <ul className="list-none footer-links">
                <li className="mb-2">
                    <a
                        href="/"
                        className="border-b border-solid border-transparent hover:text-green-dark"
                    >
                        Team
                    </a>
                </li>
                <li className="mb-2">
                    <a
                        href="/"
                        className="border-b border-solid border-transparent hover:text-green-dark"
                    >
                        Locations
                    </a>
                </li>
                <li className="mb-2">
                    <a
                        href="/"
                        className="border-b border-solid border-transparent hover:text-green-dark"
                    >
                        Privacy
                    </a>
                </li>
                <li className="mb-2">
                    <a
                        href="/"
                        className="border-b border-solid border-transparent hover:text-green-dark"
                    >
                        Terms
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default About;
