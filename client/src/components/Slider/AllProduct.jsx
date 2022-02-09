import React from "react";
import { useGlobalContext } from "../../context/context";
import SliderComponent from "./SliderComponent";

function AllProduct() {
    const { products, categories } = useGlobalContext();

    const filterProducts = (cate) => {
        return products.filter(({ category }) => category.category === cate);
    };

    return (
        <div className="w-full md:w-4/5 md:mx-auto">
            {categories.map(({ category, index }) => (
                <SliderComponent
                    products={filterProducts(category)}
                    category={category}
                    key={index}
                />
            ))}
        </div>
    );
}

export default AllProduct;
