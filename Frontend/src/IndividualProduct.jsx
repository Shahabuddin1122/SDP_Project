import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import style from "./IndividualProduct.module.css"
import CraftForm from "./Components/CraftForm";
import fillerImage from '/images/image_filler.png'
import Button from "./Components/Button";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ShowStar } from "./Components/RatingStars";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Notification from "./Notification.jsx";
import Messaging from "./Messaging_buyer";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


export default function IndividualProduct() {
    const [messageset, setmessagesetter] = useState(false);
    const { id } = useParams();
    const buyerId = sessionStorage.getItem("buyer_id");
    let [product, setProduct] = useState({})
    const [seller, setSeller] = useState({});
    const [reviewDescription, setReviewData] = useState();
    const [reviews, setreview] = useState([]);
    const [amount, setAmount] = useState(1)
    const notification = useSelector(state => state.toggle)
    const navigate = useNavigate();

    const [wishlistButton, setWishlistButton] = useState(<FaRegHeart size={30} color="var(--accent-color)" />);

    const [imageDiv, setImage] = useState('');
    const handleChange = (e) => {
        setReviewData(e.target.value);
    };
    const callbackmessage_land = (data) => {
        console.log("Land ", data);
        setmessagesetter(data);
    }
    const closemessage = () => {
        setmessagesetter(false)
    }
    function setvalue() {
        const DataofForm = {
            'reviewDescription': reviewDescription,
            'productId': id,
            'buyerId': buyerId
        };
        return DataofForm;
    }

    function setWishlist() {
        const productData = {
            'buyerid': buyerId,
            'productid': id
        };
        return productData;
    }
    useEffect(() => {
        axios.get(`https://heritage-u8vo.onrender.com/product-listing/${id}`)
            .then((response) => {
                console.log("The data is", response.data);
                setProduct(response.data[0].productId);
                setSeller(response.data[0].sellerId);
                setImage(response.data[0].productId.Product_img1?response.data[0].productId.Product_img1:fillerImage);
            })

        axios.get(`https://heritage-u8vo.onrender.com/reviews/${id}`)
            .then((response) => {
                console.log("The reviews are:", response.data.reviews);
                if (response.data.reviews != 0) {
                    
                    setreview(response.data.reviews);
                }
            })
    }, []);

    const handleChat = () => {
        const { _id: SellerId } = seller;

        axios.post('https://heritage-u8vo.onrender.com/message/conversation', {
            receiverId: SellerId,
            senderId: buyerId
        })
            .then(response => {
                console.log(response.data);
                setmessage('')
            })
            .catch(error => {
                console.error(error);
            });
        axios.post(`https://heritage-u8vo.onrender.com/notifications`, {
            senderId: buyerId,
            receiverId: SellerId,
            notificationDescription: ' Messaged you'
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })

    }
    const routeChange = () => {
        if (product) {
            // const buyerId = sessionStorage.getItem("buyer_id");
            product = {
                ...product,
                amount,
                buyerId
            }
            // const saveData = async () => {
            //     const savedData = await axios.post(`https://heritage-u8vo.onrender.com/checkout`, product, {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //     });
            //     // console.log("Already added to cart data", savedData);
            //     return savedData;
            // }
            axios.post(`https://heritage-u8vo.onrender.com/checkout`, product, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(savedData => {
                    console.log("Already added to cart data", savedData);
                    alert(savedData.data.message);
                })
                .catch(err => console.log(err))
            // saveData().then(savedData => {

            // })

            // alert("Data added to cart");
            // navigate(`/checkout`);
        }
    }

    const decrease = () => {
        if (amount !== 1) {
            setAmount(amount - 1)
        }
        else {
            setAmount(1)
        }
    }
    const increase = () => {
        setAmount(amount + 1)
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const reviewData = setvalue();
        console.log(reviewData);
        axios.post('https://heritage-u8vo.onrender.com/add/review', reviewData)
            .then((response) => {
                //console.log(response.data);
                window.location.reload();
            })
    }

    const addToWishlist = async () => {
        const wishlistData = setWishlist();
        axios.post('https://heritage-u8vo.onrender.com/create/wishlist', wishlistData)
            .then((response) => {
                alert('Product added to wishlist successfully');
                setWishlistButton(<FaHeart size={30} color="var(--accent-color)" />);
                console.log(response.data);
            })
    }

    const { productName, district, division, price, description, Product_img1, Product_img2, Product_img3 } = product
    return (
        <>
            {/* <Navbar/> */}
            {buyerId ? <CraftForm callback2={callbackmessage_land} /> : <Navbar />}
            {notification.toggle && <Notification />}
            <div className={style.container}>
                {/* <div>navbar</div> */}
                <div className={style['product-wrapper']}>
                    <div className={style.product}>
                        <div className={style['product-picture']}>
                            <div className={style['one-picture']}>
                                <img src={imageDiv} alt="" />
                            </div>
                            <div className={style['more-pictures']}>
                                {Product_img1 &&

                                    <div className={style['image-gallary']}
                                        onClick={() => setImage(Product_img1)}
                                        style={imageDiv === Product_img1 ? { border: '5px solid var(--accent-color)' } : {}}>
                                        <img src={Product_img1} alt="" />
                                    </div>
                                }
                                {Product_img2 &&

                                    <div className={style['image-gallary']}
                                        onClick={() => setImage(Product_img2)}
                                        style={imageDiv === Product_img2 ? { border: '5px solid var(--accent-color)' } : {}}>
                                        <img src={Product_img2} alt="" />
                                    </div>
                                }
                                {Product_img3 &&

                                    <div className={style['image-gallary']}
                                        onClick={() => setImage(Product_img3)}
                                        style={imageDiv === Product_img3 ? { border: '5px solid var(--accent-color)' } : {}}>
                                        <img src={Product_img3} alt="" />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={style['product-info']}>
                            <div className={style['basic-info']}>

                                <h1>{productName}</h1>
                                <p style={{
                                    fontSize: '1.25em',
                                    fontWeight: '700'
                                }}>{`${district}, ${division}`}</p>
                                <div className={style['seller-info']}>
                                    <p>{seller.name}</p>
                                    {/* <a href="#">Chat with seller</a> */}
                                    <Link onClick={handleChat}>Chat with seller</Link>
                                </div>
                                {/* <p>5 star</p> */}
                                <ShowStar rating={4} sz={35} />
                                <p>{`${price} Tk`}</p>
                                <p></p>
                                <button onClick={addToWishlist} type="button" className={style.wishlist}>
                                    {/* <FaRegHeart size={30} color="var(--accent-color)" /> */}
                                    {/* <FaHeart size={30} color="var(--accent-color)"/> */}
                                    {wishlistButton}
                                    Wishlist
                                </button>
                            </div>
                            <br />
                            <div className={style['buttons-link']}>
                                <div className={style.buttons}>
                                    <div className={style.quantity}>
                                        <button className={style['cart-button']} onClick={decrease}>-</button>
                                        {/* <Button text="-" /> */}
                                        <p>{amount}</p>
                                        {/* <Button text="+" /> */}
                                        <button className={style['cart-button']} onClick={increase}>+</button>
                                    </div>
                                    <Button text="Add to cart" change={routeChange} />
                                </div>
                                {/* <a href="#">To learn more about this handicraft</a> */}
                            </div>
                        </div>
                    </div>
                    <div className={style['product-description']}>
                        <h2 style={{
                            fontSize: '2em',
                            fontWeight: '700'
                        }}>Description</h2>
                        <div className={style.description}>
                            {description}
                        </div>
                    </div>
                </div>
                <h2 style={{
                    fontSize: '2em',
                    fontWeight: '700'
                }}>Reviews</h2>
                <br /> <br />

                {reviews.map((review) => (
                    <article>
                        <div class="flex items-center mb-4 space-x-4">
                            <img class="w-10 h-10 rounded-full" src={review.buyer? review.buyer.img:"/anonymous.png"} alt=""></img>
                            <div class="space-y-1 font-medium dark:text-white">
                                <p>{review.buyer? review.buyer.name :'Anonymous'} </p>
                            </div>
                        </div>
                        <p class="mb-2 text-gray-500 dark:text-gray-400">{review.reviewDescription}</p>
                        <br />
                    </article>
                ))}
                <br /><br />
                {buyerId &&

                    <form onSubmit={handleReviewSubmit}>
                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label for="comment" class="sr-only">Your comment</label>
                                <textarea name="reviewDescription" id="comment" onChange={handleChange} rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a Review..." required></textarea>
                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                {/* <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Post Review
                            </button> */}
                                <Button type="submit" text="Post Review" />
                            </div>
                        </div>
                    </form>
                }

            </div>
            {messageset && <Messaging closemessage={closemessage} />}
            <Footer />
        </>
    );
}