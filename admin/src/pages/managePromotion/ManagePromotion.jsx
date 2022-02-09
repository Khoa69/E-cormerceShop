import React from "react";
import { useGlobalContext } from "../../context/context";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./managePromotion.css";
import axios from "axios";
import { useAlert } from "react-alert";
import ProductSubMenu from "../../components/subMenu/ProductSubMenu";
import Login from "../login/LogIn";

function ManagePromotion() {
    const alert = useAlert();

    const { promotions, checkLogin } = useGlobalContext();

    const handleDelete = async (id) => {
        await axios
            .delete(`http://localhost:8080/doubleK/api/promotion/${id}`, {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then(() => alert.success("Promotion deleted!"));
    };

    const columns = [
        { field: "promotionId", headerName: "ID", width: 80 },
        { field: "dateBegin", headerName: "Date Begin", width: 150 },
        { field: "dateEnd", headerName: "Date End", width: 150 },
        { field: "saleOff", headerName: "Sale off", width: 150 },
        { field: "content", headerName: "Content", width: 400 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <DeleteOutline
                            className="promotionDelete"
                            onClick={() => handleDelete(params.row.promotionId)}
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
        <div className="promotion">
            <ProductSubMenu subMenuName="Promotion" />
            <DataGrid
                rows={promotions}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row.promotionId}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}

export default ManagePromotion;
