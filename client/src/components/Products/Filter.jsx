import React, { useState } from "react";

function Filter({ brands, filterItems }) {
    const [activeButton, setActiveButton] = useState("All");

    return (
        <div className="w-full bg-transparent p-2 rounded-lg border-2 border-green-dark justify-between flex">
            {brands.map((brand, index) => {
                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => {
                            filterItems(brand);
                            setActiveButton(brand);
                        }}
                        className={`px-2 py-1 shadow-sm rounded-full hover:bg-transparent hover:border-green-dark hover:text-green-dark border-2 ${
                            activeButton === brand
                                ? "bg-transparent border-green-dark text-green-dark"
                                : "text-white-default bg-green-dark"
                        }`}
                    >
                        {brand}
                    </button>
                );
            })}
        </div>
    );
}

export default Filter;
