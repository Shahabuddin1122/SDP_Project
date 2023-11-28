// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import style from "./SellerProductListing.module.css"
// import nakshiKathaImage from '../images/nakshi_katha(1).jpg'
import { SellerCard } from "./Components/Card";
import LoginNav from "./Components/LoginNav";
import Footer from "./Components/Footer";
import { Link } from "react-router-dom";
// import Button from "./Components/Button";
// import Messaging from "./Messaging_buyer";

export default function SellerProductListing() {

    const [productCount, setCount] = useState(0)
    const [products, setProducts] = useState([])

   
    const sellerId = sessionStorage.getItem("seller_id");

    console.log(sellerId);


    useEffect(() => {
        axios.get(`https://heritage-u8vo.onrender.com/seller_product_list/${sellerId}`)
            .then((response) => {
                // console.log(response.data);
                setProducts(response.data);
                setCount(response.data.length);
                // console.log("from product:" + sessionStorage.getItem("uid"));
            })
    }, [])
    return (
        <>
            <LoginNav />
            <div className={style.container}>
                <div className={style['hero-section']}>
                    <h1>Handicraft Products</h1>
                    <p>You can sell traditional handicraft items from various categories.</p>
                </div>
                <div className={style['filter-and-products']}>
                    <div className={style['product-list']}>
                        <div className={style['sort-and-filter']}>
                            <p>{`${productCount} Products`}</p>
                            {/* <button>Filter</button>
                            <button>Sort by</button> */}
                        </div>
                        <div className={style['product-cards']}>
                            {products.map((product, index) => {
                                const { _id, productName, district, division, price, storedQuantity, Product_img1 } = product;
                                
                                return (
                                    
                                    <Link to={`/SellerIndividualProduct/${_id}`} key={_id}>
                                        <SellerCard
                                            // image={nakshiKathaImage}
                                            image={Product_img1}
                                            rating={4}
                                            productName={productName}
                                            location={`${district}, ${division}`}
                                            price={`${price} Tk`}
                                            quantity={storedQuantity}

                                        />
                                    </Link>
                                );
                            })}

                        </div>
                        {/* <Button text="Load more" /> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
