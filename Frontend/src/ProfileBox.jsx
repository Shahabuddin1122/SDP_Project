// import React, {useRef} from "react";
import {useState, useEffect} from "react";
import styles from "./ProfileBox.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfileBox = (props) => {

  const [data, setData] = useState({});
  const [messagebox,setmessagebox] = useState(false);
  const sellerId = sessionStorage.getItem("seller_id");
  const navigate = useNavigate();
  const callbackmessage = () => {
    setmessagebox(true);
    props.callback(true)
  }
  useEffect(() => {
    axios.get(`https://heritage-u8vo.onrender.com/seller_profile/${sellerId}`)
      .then((response) => {
        setData(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, [sellerId]);

  const handleChange = ()=>{
      navigate('/AddAProductPage');
  }

  const handleChange2 = ()=>{
    navigate('/sellerProductListing');
}
const handleChange3 = ()=>{
  navigate('/Order_Seller_List');
}

  const handleSignOut = () => {
    // Clear sessionStorage when the "Sign Out" button is clicked
    sessionStorage.clear();
    // navigate('/become_seller');
    navigate('/');
  };

  return (
    
    <div className={styles.buyerProfileDropdown}>
      {/* <button className={styles.b}onClick={closemodel}>X</button> */}
      <div className={styles.border} />
      <Link to={`/seller_profile`} className={styles.header}>
        <img className={styles.pictureIcon} alt="https://res.cloudinary.com/dkotituzn/image/upload/v1701183215/teoixr5thophrnzexjec.jpg" src={data.img} />
        </Link>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.welcome}>
        Welcome to the realm of dedicated artisans – together, we'll uncover
        the distinctive charm of your craft creations
        </div>
      
      <button className={styles.cart} onClick={handleChange}>
        <div className={styles.cartChild} />
        <img
          className={styles.iconShoppingBag}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183415/oi6uokgzgxzki9gjeqaz.svg"
        />
        <div className={styles.myCart}>Add Products</div>
      </button>
      <button className={styles.wishlist} onClick={handleChange2}>
        <div className={styles.cartChild} />
        <img
          className={styles.iconActionHeartLoveLikeR}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183417/q6k3htiadqnpiuuedbnd.svg"
        />
        <div className={styles.wishlist1}>My Products</div>
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
      <button className={styles.notification} onClick={handleChange3}>
        <div className={styles.cartChild} />
        <img className={styles.iconBell} alt="" src="https://res.cloudinary.com/dkotituzn/image/upload/v1701184053/v6xcycbsiueuzchjs4vy.svg" />
        <div className={styles.notification1}>My Orders</div>
      </button>
      <button className={styles.myOrders}>
        <div className={styles.myOrdersChild} />
        <img
          className={styles.iconNavIconListA}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701183415/zdmzzvftlkwe0u3cezvz.svg"
        />
        <div className={styles.myOrders1}>Notification</div>
      </button>
      {/* <button className={styles.track}>
        <div className={styles.trackChild} />
        <img className={styles.iconZoomPan} alt="" src="./images/-icon-zoom-pan.svg" />
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
    
  );
};

export default ProfileBox;
