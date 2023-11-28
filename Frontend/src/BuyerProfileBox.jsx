/* eslint-disable react/no-unescaped-entities */
// import React, {useState, useEffect} from "react";
import { useState, useEffect } from "react";
import styles from "./BuyerProfileBox.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import notification  from './Actions/notification'

const BuyerProfileBox = (props) => {

  const [data, setData] = useState({});
  const [messagebox,setmessagebox] = useState(false);
  const buyerId = sessionStorage.getItem("buyer_id");
  const value = useSelector(state => state.toggle)
  const dispatch = useDispatch();
  console.log(props.value); 
  const navigate = useNavigate();
  const callbackmessage = () => {
    setmessagebox(true);
    props.callback(true)
  }
  

  useEffect(() => {
    axios.get(`https://heritage-u8vo.onrender.com/buyer_profile/${buyerId}`)
      .then((response) => {
        setData(response.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, [buyerId]);

  const notificationTogg = ()=>{
    dispatch(notification())
    console.log("TOGGLE: ",value.toggle)
  }
  const handleSignOut = () => {
    // Clear sessionStorage when the "Sign Out" button is clicked
    sessionStorage.clear();
    navigate('/');
  };

  const handleButtonClick = () => {
    navigate('/Order_History');
  };


  return (
    <>
    <div className={styles.buyerProfileDropdown}>
      {/* <button className={styles.b}onClick={closemodel}>X</button> */}
      <div className={styles.border} />
      <Link to={`/buyer_profile`} className={styles.header}>
        <img className={styles.pictureIcon} alt="https://res.cloudinary.com/dkotituzn/image/upload/v1701183215/teoixr5thophrnzexjec.jpg" src={data.img} />
      </Link>
      <div className={styles.name}>{data.name}</div>
      <div className={styles.welcome}>
        Welcome to the world of passionate craft enthusiasts – let us embark on
        a journey of discovering your unique preferences in crafts
      </div>
      <button className={styles.cart} onClick={()=>{navigate('/checkout')}}>
        <div className={styles.cartChild} />
        <img
          className={styles.iconShoppingBag}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183418/ymmrk4xjhgjk5sxzbfqe.svg"
        />
        <div className={styles.myCart}>My Cart</div>
      </button>
      {/* </Link> */}
      <button className={styles.wishlist}>
        <div className={styles.cartChild} />
        <img
          className={styles.iconActionHeartLoveLikeR}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183413/jsef2kyvwqnihrvhgtzq.svg"
        />
        <div className={styles.wishlist1}><Link to={`/Wishlist`}>Wishlist</Link></div>
      </button>
      <button className={styles.chat}>
        <div className={styles.cartChild} />
        <img
          className={styles.iconCommunicationBubbleTex}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183415/rhxbei5gsuphrac0uv0e.svg"
        />
        <div className={styles.messages} onClick={callbackmessage}>Messages</div>
      </button>
      <button className={styles.notification}>
        <div className={styles.cartChild} />
        <img className={styles.iconBell} alt="" src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183415/zdmzzvftlkwe0u3cezvz.svg" />
        <div className={styles.notification1} onClick={notificationTogg} >Notification</div>
      </button>
      <button className={styles.myOrders}onClick={handleButtonClick}>
        <div className={styles.myOrdersChild} />
        <img
          className={styles.iconNavIconListA}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183416/ognqnlkwk5qkbf8jmjcw.svg"
        />
        <div className={styles.myOrders1} >My Orders</div>
      </button>
      {/* <button className={styles.track}>
        <div className={styles.trackChild} />
        <img className={styles.iconZoomPan} alt="" src="/images/-icon-zoom-pan.svg" />
        <div className={styles.trackingOrders}>Tracking Orders</div>
      </button> */}
      <button className={styles.track}>
        <div className={styles.trackChild} />
        <img
          className={styles.iconPeopleCommunity}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183417/ycnikb4vzllfjfqxrbpz.svg"
        />
        <div className={styles.trackingOrders}>Go to Craft Community</div>
      </button>
      <button className={styles.community} onClick={handleSignOut}>
        <div className={styles.myOrdersChild} />
        <img className={styles.iconPeopleCommunity} alt="" src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183415/ojo6zscjn3upjokcme32.svg" />
        <div className={styles.goToCraft}>Sign Out</div>
      </button>
    </div>
    </>

  );
};

export default BuyerProfileBox;
