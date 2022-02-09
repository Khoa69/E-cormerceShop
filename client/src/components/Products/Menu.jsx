import React from "react";
import PaginatedItems from "./PaginatedItems";

function Menu({ items }) {
    return (
        <div>
            <PaginatedItems items={items} itemsPerPage={20} />
        </div>
    );
}

export default Menu;
