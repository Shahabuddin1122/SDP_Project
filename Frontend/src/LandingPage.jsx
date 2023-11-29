// import React, {useRef} from "react";
import Navbar from "./Components/Navbar.jsx"
import CraftForm from "./Components/CraftForm";
import Footer from "./Components/Footer.jsx"
import styles from "./LandingPage.module.css"
// import Button from "./Components/Button.jsx"
import JoinCommunity from "./Components/JoinCommunity";
import Community from "./Components/Community";
import KnowAboutCrafts from "./Components/KnowAboutCrafts";
import NewArrival from "./Components/NewArrival";
import Category from "./Components/Category";
import GoToProduct from "./Components/GoToProduct";
import BuyerProfileBox from "./BuyerProfileBox.jsx";
import { useState } from "react";
import Messaging from "./Messaging_buyer";
import { useDispatch, useSelector } from 'react-redux';
import Notification from "./Notification.jsx";
const LandingPageFinal = () => {
  const [messageset,setmessagesetter] = useState(false);
  const buyerId = sessionStorage.getItem("buyer_id");
  const notification = useSelector(state => state.toggle)
  const callbackmessage_land = (data)=>{
    console.log("Land ", data);
    setmessagesetter(data);
  }
  const closemessage = ()=>{
    setmessagesetter(false)
  }

    return (

      <>
      {buyerId ? <CraftForm  callback2 = {callbackmessage_land}/> : <Navbar />}
      {/* messageset && <Messaging />*/}
      {/* <Navbar /> */}
      {notification.toggle && <Notification/>}
      <div className={styles.landingPageFinal}>
        
       
        
        
        <GoToProduct />
        <div className={styles.productsHeading}>
          <div className={styles.productsHeadingChild} />
          <b className={styles.enjoyOurFeatured}>Enjoy Our Featured Products</b>
        </div>
        <Category />
        <NewArrival />
        <KnowAboutCrafts />
        <Community />
        <JoinCommunity />
        {/* <div className={styles.footer}>
          <Footer />
        </div> */}
      </div>
      {messageset && <Messaging closemessage={closemessage}/>}
      <Footer />
      </>
    );
  };
  
  export default LandingPageFinal;