import React, { useState } from "react";
import Filter from "../components/Products/Filter";
import Menu from "../components/Products/Menu";
import { useGlobalContext } from "../context/context";
import { useParams } from "react-router-dom";

function Products() {
    const { products } = useGlobalContext();
    const { cate } = useParams();

    const filterProducts = products.filter(
        ({ category }) =>
            category.category.toLowerCase().replace(" ", "") === cate
    );

    const allBrands = [
        "All",
        ...new Set(filterProducts?.map((item) => item.brand?.brand)),
    ];
    const [menuItems, setMenuItems] = useState(filterProducts);
    const [brands, setBrands] = useState(allBrands);

    const filterItems = (brand) => {
        if (brand === "All") {
            setMenuItems(filterProducts);
            return;
        }

        const newItems = filterProducts.filter((item) => {
            return item.brand?.brand === brand;
        });
        setMenuItems(newItems);
    };

    return (
        <div className="w-full flex flex-wrap md:w-4/5 md:mx-auto mt-7 justify-between mb-12">
            <Filter brands={brands} filterItems={filterItems} />
            <Menu items={menuItems} />
        </div>
    );
}

export default Products;
