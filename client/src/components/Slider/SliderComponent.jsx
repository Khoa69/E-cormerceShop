import React from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGlobalContext } from "../../context/context";

function SliderComponent({ products, category }) {
    const { formatNumber } = useGlobalContext();

    const settings = {
        dots: false,
        infinite: products.length > 3,
        speed: 500,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full md:w-4/5 md:mx-auto mt-8 mb-8">
            <h2 className="text-2xl font-semibold">{category}</h2>
            <Slider {...settings}>
                {products.map((product, index) => (
                    <Link
                        to={`/product/${product.id}`}
                        key={index}
                        className="w-9"
                    >
                        <Card
                            sx={{ maxWidth: 345, height: 400 }}
                            className="p-4"
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={`http://127.0.0.1:8887/images/${
                                        product?.imagelist[
                                            product?.imagelist.length - 1
                                        ]?.path
                                    }`}
                                    alt={product.productName}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                        sx={{ height: 120 }}
                                        className="text-2xl"
                                    >
                                        {product.productName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ height: 50 }}
                                        className="absolute right-3 bottom-0"
                                    >
                                        {formatNumber(product.price)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                ))}
            </Slider>
        </div>
    );
}

export default SliderComponent;
