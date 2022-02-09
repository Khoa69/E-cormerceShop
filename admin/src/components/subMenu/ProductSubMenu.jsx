import React from "react";
import { Link } from "react-router-dom";
import "./subMenu.css";

function ProductSubMenu({ subMenuName }) {
    return (
        <div className="subMenu">
            <h1 className="productTitle">{subMenuName}</h1>
            {subMenuName === "Products" && (
                <Link to="/product/newproduct">
                    <button className="addButton">Create Product</button>
                </Link>
            )}
            {subMenuName !== "Products" && (
                <Link to="/products">
                    <button className="addButton">Manage Products</button>
                </Link>
            )}
            <Link to="/product/managecategory">
                <button className="addButton">Manage Category</button>
            </Link>
            <Link to="/product/managebrand">
                <button className="addButton">Manage Brand</button>
            </Link>
            <Link to="/product/managepromotion">
                <button className="addButton">Manage Promotion</button>
            </Link>
            {subMenuName === "Promotion" && (
                <Link to="/product/newpromotion">
                    <button className="addButton">New promotion</button>
                </Link>
            )}
        </div>
    );
}

export default ProductSubMenu;
