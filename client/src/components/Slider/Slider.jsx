import React from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useGlobalContext } from "../../context/context";

function Slider() {
    const { products } = useGlobalContext();

    const productSlide = products.slice(0, 10);

    return (
        <div className="bg-gray-200">
            <div className="slide-container w-full md:w-4/5 md:mx-auto">
                <Slide>
                    {productSlide.map((laptop, index) => (
                        <Link
                            to={`/product/${laptop.id}`}
                            className="each-slide h-75 flex bg-gray-200"
                            key={index}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(${`http://127.0.0.1:8887/images/${
                                        laptop?.imagelist[
                                            laptop?.imagelist.length - 1
                                        ]?.path
                                    }`})`,
                                }}
                                className="h-75 w-1/2 ml-60 bg-no-repeat bg-center bg-contain"
                            ></div>
                            <div className="my-auto">
                                <h1 className="text-gray-500 text-4xl capitalize mb-2">
                                    {laptop.productName}
                                </h1>
                                <p>{laptop.price}</p>
                            </div>
                        </Link>
                    ))}
                </Slide>
            </div>
        </div>
    );
}

export default Slider;
