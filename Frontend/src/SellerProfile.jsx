import { useState, useEffect } from 'react';
// import { useCallback } from "react";
import axios from "axios";
import Footer from "./Components/Footer";
import LoginNav from "./Components/LoginNav"
import SellerForm from "./Components/SellerForm";
import styles from "./SellerProfile.module.css";

const SellerProfile = () => {

  
  const [data, setData] = useState({});
  const sellerId = sessionStorage.getItem("seller_id");

  useEffect(() => {
    axios.get(`https://heritage-u8vo.onrender.com/seller_profile/${sellerId}`)
      .then((response) => {
        setData(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, [sellerId]);


  return (

    <>
    <LoginNav />
    <div className={styles.buyerProfile}>
      
      <div className={styles.border} />
      
      <div className={styles.border1} />
      <div className={styles.pageHeader}>
          <div className={styles.pageTitle}>
            <h1 style={
              {fontSize: '2em'}
            }>Your Profile</h1>
          </div>
      </div>

      <SellerForm />
      
      <div className={styles.pictureName}>
        <input
          className={styles.name}
          value={data.email}
          type="email"
        />
        
        {/* <i className="fas fa-user"></i> */}
        <img
          className={styles.picture}
          alt=""
          src={data.img}
        />
        <button className={styles.pictureNameInner}> + Change photo</button>
      </div>
      
      
    </div>
    <Footer />
    </>
    
  );
};

export default SellerProfile;