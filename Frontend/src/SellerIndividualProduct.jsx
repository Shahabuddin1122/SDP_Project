import  { useEffect, useState } from "react";
import {  useParams } from "react-router";
import axios from "axios";
import style from "./SellerIndividualProduct.module.css"
import nakshikathaImage from '../images/nakshi_katha(1).jpg'
import LoginNav from "./Components/LoginNav.jsx";
import Footer from "./Components/Footer.jsx";
// import { ShowStar } from "./Components/RatingStars.jsx";
// import { Link } from "react-router-dom";
import {  useSelector } from 'react-redux';
import Notification from "./Notification.jsx";
// import Messaging from "./Messaging_buyer";


export default function SellerIndividualProduct() {
    const { id } = useParams();
    let [product, setProduct] = useState({})
    const [updateAmount, setUpdateAmount] = useState(0)
    const notification = useSelector(state => state.toggle)

    const sellerId = sessionStorage.getItem("seller_id");

    useEffect(() => {
        axios.get(`https://heritage-u8vo.onrender.com/seller_product_list/${sellerId}/${id}`)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
            })
    }, []);

    const handleUpdateAmountChange = (e) => {
        setUpdateAmount(parseInt(e.target.value, 10) || 0); 
    };

    const handleUpdateQuantity = (operation) => {
        console.log(id)
        console.log(updateAmount)
        console.log(operation)
        if (updateAmount > 0) {
            axios.post(`https://heritage-u8vo.onrender.com/update_product/${id}`, {
                updateAmount,
                operation,
            })
            .then((response) => {
                console.log(response.data);
                window.location.reload(); 
                alert('Item amount has been updated');
            })
            .catch((error) => {
                console.log(error)
                if(error.message == 'Request failed with status code 400')
                {
                    alert('Cannot delete more than available quantity');
                }
                else
                {
                    console.error('Error updating product quantity:', error);
                }
            });
        } else {
            alert('Please enter a valid positive number.');
        }
    };


    const { productName, district, division, price, description, Product_img1, Product_img2, Product_img3, storedQuantity, category, color } = product

    // console.log(product);
    return (
        <>
            <LoginNav />
            {notification.toggle && <Notification/>}
            <div className={style.container}>
                <div className={style['product-wrapper']}>
                        <div className={style['product-pictures']}>
                            <div className={style['one-picture']}>
                                <img src={Product_img1 ? Product_img1 : nakshikathaImage} alt="" />
                            </div>
                            <div className={style['one-picture']}>
                                <img src={Product_img2 ? Product_img2 : nakshikathaImage} alt="" />
                            </div>
                            <div className={style['one-picture']}>
                                <img src={Product_img3 ? Product_img3 : nakshikathaImage} alt="" />
                            </div>
                        </div>
                        <div className={style['product-info-box']}>
                            <div className={style['basic-info']}>

                                <h1>{productName}</h1>
                                <p>{`${district}, ${division}`}</p>
                                <p><b>Product in stock:</b>{` ${storedQuantity}`}</p>
                                <p><b>Category:</b>{` ${category}`}</p>
                                <p><b>Available colors:</b>{` ${color}`}</p>
                                {/* <p>5 star</p> */}
                                {/* <ShowStar rating={3} sz={35} /> */}
                                <p><b>Price:</b> {`${price} Tk`}</p>
                                
                            </div>
                            <br />
                            <div className={style['description-container']}>
                                <p><h2><b>Description</b></h2>
                                    <div className={style.description}>
                                    {description}
                                    </div>
                                </p>
                            </div>
                            
                            <div className={style['update-quantity-container']}>
                                <p>
                                    Want to update the amount of this product or want to delete some of this product? Write the amount you want to add or delete:
                                </p>
                                <div>
                                 <input className={style.input}
                                    type="number"
                                    placeholder="Enter amount"
                                    value={updateAmount}
                                    onChange={handleUpdateAmountChange}
                                 />
                                <button className={style.button} onClick={() => handleUpdateQuantity('add')}>Add</button>
                                <button className={style.button} onClick={() => handleUpdateQuantity('delete')}>Delete</button>
                                </div>
                            </div>
                        </div>
                    <div className={style['product-description']}>
                        
                        
                    </div>
                </div>
            
            </div>
            <Footer/>
        </>
    );
}