import React from "react";
import { Link } from "react-router-dom";
import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { useAlert } from "react-alert";
import ProductSubMenu from "../../components/subMenu/ProductSubMenu";
import Login from "../login/LogIn";

function ProductList() {
    const alert = useAlert();

    const { laptops, formatNumber, checkLogin } = useGlobalContext();

    const handleDelete = async (id) => {
        await axios
            .delete(`http://localhost:8080/doubleK/api/product/sortDelete/${id}`, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then(() => alert.success("Product deleted!"))
            .catch((error) => alert.error(error.response.data.message));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "productName",
            headerName: "Product",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img
                            className="productListImg"
                            // src={params.row.image}
                            src={`http://127.0.0.1:8887/images/${
                                params.row.imagelist[
                                    params.row.imagelist.length - 1
                                ]?.path
                            }`}
                            alt=""
                        />
                        {params.row.productName}
                    </div>
                );
            },
        },
        {
            field: "category",
            headerName: "Category",
            width: 200,
            renderCell: (params) => {
                return <div>{params.row?.category?.category}</div>;
            },
        },
        { field: "quantity", headerName: "Quantity", width: 200 },
        {
            field: "price",
            headerName: "Price",
            width: 160,
            renderCell: (params) => {
                return <div>{formatNumber(params.row.price)}</div>;
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row.id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="productList">
            <ProductSubMenu subMenuName="Products" />
            <DataGrid
                rows={laptops}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row.id}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}

export default ProductList;
