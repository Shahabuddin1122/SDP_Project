import React from "react";
import { useNavigate } from "react-router-dom";
import Card from './Components/Card.jsx'
import Know_Nav from "./Components/Know_Nav.jsx"
import Style from './Become_seller.module.css'
import Button from "./Components/Button.jsx";
import Footer from "./Components/Footer.jsx";
const Become_seller = ()=>{
    const navigate= useNavigate();
    const btn = ()=>{
        navigate('/seller_reg');
    }
    return (
        <>
            <Know_Nav/>
            <div className={Style.upper}>
                <div className={Style.image}>
                    <img src={"https://res.cloudinary.com/dkotituzn/image/upload/v1701188742/x4bdhs73ebhtswvaqgdf.png"}  alt="" />
                    <div className={Style.text}>
                        <h4>Craft your Dreams,Share your <br/> Passion:Become a Seller <br /> Today! </h4>
                        <p>Sell Your HandCrafted Items with us!</p>
                    </div>
                </div>
            </div>
            <div className={Style.box}>
                <div className={Style.inside}>
                    <i class="fa-solid fa-truck-fast"></i>
                    <p>Low Cost of doing Business</p>
                </div>
                <div className={Style.inside}>
                    <i class="fa-solid fa-address-card"></i>
                    <p>Free Registration</p>
                </div>
                <div className={Style.inside}>
                    <i class="fa-solid fa-phone"></i>
                    <p>Connecting with Potential Buyers</p>
                </div>
                <div className={Style.inside}>
                    <i class="fa-solid fa-lock"></i>
                    <p>Secure & Regular Payment</p>
                </div>
                
            </div>
            <div className={Style.register}>
                <div className={Style.left}>
                    <p>Crafting Dreams? We've got <br />the platform for you</p>
                </div>
                <div className={Style.right}>
                    <Button text={'Register Now'} change={btn} />
                </div>
            </div>
            <div className={Style.steps}>
                <div className={Style.text}>
                    <h2>5 Simple Steps to Become a Seller</h2>
                </div>
                <div className={Style.inner}>
                    <div className={Style.divide}>
                        <div className={Style.image}>
                            <i class="fa-solid fa-file-pen"></i>
                        </div>
                        <div className={Style.text}>
                            <h2>Create an Account</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis doloribus vel assumenda nulla magni tenetur.</p>
                        </div>
                    </div>
                    <div className={Style.divide}>
                        <div className={Style.image}>
                            <i class="fa-solid fa-user-plus"></i>
                        </div>
                        <div className={Style.text}>
                            <h2>Add Profile Information</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis doloribus vel assumenda nulla magni tenetur.</p>
                        </div>
                    </div>
                    <div className={Style.divide}>
                        <div className={Style.image}>
                        <i class="fa-solid fa-address-book"></i>
                        </div>
                        <div className={Style.text}>
                            <h2>Add Address & Payment Information</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis doloribus vel assumenda nulla magni tenetur.</p>
                        </div>
                    </div>
                    <div className={Style.divide}>
                        <div className={Style.image}>
                            <i class="fa-solid fa-cart-plus"></i>
                        </div>
                        <div className={Style.text}>
                            <h2>Add Products</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis doloribus vel assumenda nulla magni tenetur.</p>
                        </div>
                    </div>
                    <div className={Style.divide}>
                        <div className={Style.image}>
                            <i class="fa-solid fa-file-shield"></i>
                        </div>
                        <div className={Style.text}>
                            <h2>Tract Shipping & Receive Payment </h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis doloribus vel assumenda nulla magni tenetur.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Style.line}></div>
            <div className={Style.review}>
                <div className={Style.text}>
                    <h2>Inspirational Seller Narratives</h2>
                </div>
                <div className={Style.inner}>
                    <div className={Style.card}>
                        <i class="fa-solid fa-quote-left"></i>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum dolores et, commodi beatae voluptate soluta eos nam ut. Nam, harum.</p>
                        <h3>Shahabuddin Akhon</h3>
                        <h5>Artisan</h5>
                    </div>
                    <div className={Style.card}>
                        <i class="fa-solid fa-quote-left"></i>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum dolores et, commodi beatae voluptate soluta eos nam ut. Nam, harum.</p>
                        <h3>Shahabuddin Akhon</h3>
                        <h5>Artisan</h5>
                    </div>
                    <div className={Style.card}>
                        <i class="fa-solid fa-quote-left"></i>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum dolores et, commodi beatae voluptate soluta eos nam ut. Nam, harum.</p>
                        <h3>Shahabuddin Akhon</h3>
                        <h5>Artisan</h5>
                    </div>
                    <div className={Style.card}>
                        <i class="fa-solid fa-quote-left"></i>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum dolores et, commodi beatae voluptate soluta eos nam ut. Nam, harum.</p>
                        <h3>Shahabuddin Akhon</h3>
                        <h5>Artisan</h5>
                    </div>
                </div>
            </div>
            <div className={Style.line}></div>
            <Footer/>
        
        </>
    );
}
export default Become_seller;