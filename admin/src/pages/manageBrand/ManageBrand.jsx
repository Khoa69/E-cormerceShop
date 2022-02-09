import React, { useState } from "react";
import { useGlobalContext } from "../../context/context";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./manageBrand.css";
import axios from "axios";
import { useAlert } from "react-alert";
import ProductSubMenu from "../../components/subMenu/ProductSubMenu";
import TextField from "@mui/material/TextField";
import Login from "../login/LogIn";

function ManageBrand() {
    const alert = useAlert();

    const { brands, checkLogin } = useGlobalContext();

    const [newBrand, setNewBrand] = useState("");

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/doubleK/api/brand/${id}`, {
            headers: {
                accept: "application/json",
                Authorization: document?.cookie
                    .split("; ")
                    .find((token) => token.includes("doubleKToken"))
                    .split("=")[1],
            },
        });
        alert.success("Brand deleted!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (brands.find((brand) => brand?.brand.toLowerCase() === newBrand)) {
            alert.error(`${newBrand} already exist!!!`);
        } else {
            await axios
                .post(
                    "http://localhost:8080/doubleK/api/brand/save",
                    {
                        brand: newBrand,
                    },
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: document?.cookie
                                .split("; ")
                                .find((token) => token.includes("doubleKToken"))
                                .split("=")[1],
                        },
                    }
                )
                .then(setNewBrand(""))
                .then(() => alert.success("Brand created!"))
                .catch((e) => console.log(e));
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "brand", headerName: "Brand", width: 750 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <DeleteOutline
                            className="brandDelete"
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
        <div className="brand">
            <ProductSubMenu subMenuName="Brand" />
            <form onSubmit={handleSubmit} className="newBrandForm">
                <TextField
                    label="New brand"
                    variant="outlined"
                    value={newBrand}
                    className="newBrandInput"
                    onChange={(e) => setNewBrand(e.target.value)}
                />
                <button className="newBrandButton" type="submit">
                    Add Brand
                </button>
            </form>
            <DataGrid
                rows={brands}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row.id}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}

export default ManageBrand;
