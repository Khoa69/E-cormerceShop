import React from "react";
import InboxIcon from "@mui/icons-material/Inbox";

function OrderList({ orders, setCurOrder, curOrder }) {
    return (
        <div className="p-4 flex-1 mr-5 h-150 overflow-y-auto">
            {orders === [] ? (
                <p>You don't have order 📦</p>
            ) : (
                orders.map((order) => (
                    <div
                        className={`shadow-lg p-5 w-full rounded-md flex mb-3 hover:bg-gray-100 ${
                            order === curOrder ? "bg-gray-200" : ""
                        }`}
                        key={order.orderId}
                    >
                        <InboxIcon className="mr-4" />
                        <div className="grid grid-cols-3 w-full">
                            <div>{order.dateOrder}</div>
                            <div className="capitalize">{order.status}</div>
                            <button
                                className="bg-green-dark rounded-md text-white-semiLight font-semibold"
                                onClick={() => setCurOrder(order)}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default OrderList;
