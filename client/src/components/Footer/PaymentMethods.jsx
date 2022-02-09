import React from "react";
import ATM from "../../resources/paymentMethods/atmchain-atm-logo-3D8D06421B-seeklogo.com.png";
import masterCard from "../../resources/paymentMethods/mastercard-logo-38C4789CCA-seeklogo.com.png";
import momo from "../../resources/paymentMethods/momo-logo-ED8A3A0DF2-seeklogo.com.png";
import paypal from "../../resources/paymentMethods/paypal-logo-CA814C6B42-seeklogo.com.png";
import visa from "../../resources/paymentMethods/visa-logo-BDDD51C62D-seeklogo.com.png";
import zaloPay from "../../resources/paymentMethods/zalopay-logo-643ADC36A4-seeklogo.com.png";

function PaymentMethods() {
    const payments = [ATM, masterCard, momo, paypal, visa, zaloPay];

    return (
        <div className="px-2 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0 mr-1 md:mr-2 lg:mr-4">
            <h5 className="text-xl font-bold mb-6">Payment Methods</h5>
            <div className="grid grid-cols-3 gap-2">
                {payments.map((payment, index) => (
                    <button
                        key={index}
                        type="button"
                        className="btn bg-transparent w-18 h-10 rounded border-2 border-gray-400 items-center"
                    >
                        <img
                            src={payment}
                            alt="ATM"
                            className="object-center object-contain h-9"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PaymentMethods;
