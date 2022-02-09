import React, { useState } from "react";
import Popup from "reactjs-popup";
import CropFreeIcon from "@mui/icons-material/CropFree";
import CloseIcon from "@mui/icons-material/Close";
import "reactjs-popup/dist/index.css";
import OtpInput from "react-otp-input";
import { useAlert } from "react-alert";

function Otp({ openOtp, setOpenOtp, creditCardBuy, otp }) {
    const closeModel = () => setOpenOtp(false);
    const alert = useAlert();

    const [otpInput, setOtpInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(otpInput);
        console.log(otp);

        if (parseInt(otpInput) === otp) {
            creditCardBuy();
        } else {
            alert.error("Invalid OTP!");
        }
    };

    return (
        <Popup
            trigger={<CropFreeIcon className="cursor-pointer float-right" />}
            open={openOtp}
            onClose={closeModel}
            modal
            nested
            position="center center"
            className="rounded-xl"
        >
            {(close) => (
                <div className="modal text-xs h-64 rounded-xl py-16">
                    <div
                        className="close cursor-pointer absolute block py-2 px-1 w-10 h-10 text-center leading-4 -right-3 -top-3 text-2xl bg-green-dark rounded-full border-2 border-green-dark"
                        onClick={close}
                    >
                        <CloseIcon />
                    </div>
                    <form onSubmit={handleSubmit} className="w-4/5 mx-auto">
                        <OtpInput
                            value={otpInput}
                            onChange={(newValue) => setOtpInput(newValue)}
                            numInputs={6}
                            separator={<span>&nbsp;</span>}
                            isInputNum
                            containerStyle="w-full justify-between mb-10"
                            inputStyle={{
                                padding: "1.2rem",
                                "border-radius": "0.75rem",
                                border: "2px solid gray",
                                "font-size": "1.5rem",
                                width: "4rem",
                                height: "4rem",
                            }}
                            hasErrored
                        />
                        <button
                            type="submit"
                            className="w-full mx-auto h-10 bg-green-dark rounded-md"
                        >
                            Check otp
                        </button>
                    </form>
                </div>
            )}
        </Popup>
    );
}

export default Otp;