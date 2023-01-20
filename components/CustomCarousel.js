import React from "react";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
// import dynamic from "next/dynamic";






  

export default function CustomCarousel({relatedProducts }) {
  let settings = {
    // dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 300,

        }
      }
    ]

  };

  return (
    
    <Slider  {...settings}>
    {relatedProducts.map((product)=>{
        return (<div key= {product.id} >
          <ProductCard   productname={product.title} price={product.price} productid={product.id} product={product} marginRight={"10px"}/>
        </div>)
      })}
   </Slider>
    
  );







}


// export default dynamic(() => Promise.resolve(CustomCarousel), { ssr: false });
