import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { useAlert } from "react-alert";
import { useGlobalContext } from "../../context/context";

function OrderDetail({ order }) {
    const alert = useAlert();

    const { formatNumber } = useGlobalContext();

    const total = order.orderDetails
        ? order?.orderDetails.reduce(
              (total, { price, quantity }) => total + price,
              0
          )
        : 0;

    const handleCancelOrder = async () => {
        const data = {
            shipperID: order.shipper?.id,
            checked: 2,
            status: "cancel",
        };

        await axios
            .put(
                `http://localhost:8080/doubleK/api/order/${order.orderId}`,
                data,
                {
                    headers: {
                        accept: "application/json",
                        Authorization: document?.cookie
                            ?.split("; ")
                            .find((token) => token.includes("doubleKToken"))
                            .split("=")[1],
                    },
                }
            )
            .then((response) => alert.success("Cancel success!"))
            .then(() => window.location.reload())
            .catch((error) => alert.error("Error"));
    };

    const columns = [
        {
            field: "productName",
            headerName: "Product",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="flex">
                        <img
                            className="w-7 h-7 mt-2 rounded-sm mr-2 object-cover"
                            src={
                                params.row.product?.imagelist[0]?.path
                                    ? `http://127.0.0.1:8887/images/${params.row.product?.imagelist[0]?.path}`
                                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                            }
                            alt=""
                        />
                        {params.row.product.productName}
                    </div>
                );
            },
        },
        {
            field: "price",
            headerName: "Price",
            width: 120,
            renderCell: (params) => {
                return <div>{formatNumber(params.row.product.price)}</div>;
            },
        },
        { field: "quantity", headerName: "Quantity", width: 150 },
        {
            field: "total",
            headerName: "Total",
            width: 170,
            renderCell: (params) => {
                return (
                    <div>
                        {formatNumber(
                            params.row.product.price * params.row.quantity
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ flex: 2 }} className="p-4">
            <div className="shadow-md p-4 mb-4 flex">
                <div className="grid grid-cols-2 w-4/5">
                    <div className="text-gray-500">
                        <p>Date order: {order?.dateOrder}</p>
                        <p>Date received: {order?.dateReceived}</p>
                        <p>Total: {formatNumber(total)}</p>
                    </div>
                    <div className="text-gray-500">
                        <p>Status: {order?.status}</p>
                        <p>Shipper: {order?.shipper?.username}</p>
                        <p>Payment: {order.checked ? "Credit card" : "COD"}</p>
                    </div>
                </div>
                {!(order.checked === 2 || order.status === "shipped") && (
                    <div>
                        <button
                            className="bg-red-400 text-white-semiLight p-2 rounded"
                            onClick={handleCancelOrder}
                        >
                            Cancel order
                        </button>
                    </div>
                )}
            </div>
            <div className="h-80">
                {order.orderDetails && (
                    <DataGrid
                        rows={order.orderDetails}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                        getRowId={(row) => row.id}
                    />
                )}
            </div>
        </div>
    );
}

export default OrderDetail;
