import { useState, useEffect } from 'react';
// import { useCallback } from "react";
import axios from "axios";
import Footer from "./Components/Footer";
import CraftForm from "./Components/CraftForm.jsx"
import Form from "./Components/Form";
import styles from "./BuyerProfile.module.css";
import { useNavigate } from "react-router-dom";

const BuyerProfile = () => {

  
  const [data, setData] = useState({});
  const buyerId = sessionStorage.getItem("buyer_id");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://heritage-u8vo.onrender.com/buyer_profile/${buyerId}`)
      .then((response) => {
        setData(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, [buyerId]);

  

  const handleChange = ()=>{
    navigate('/pic_change');
}


  return (

    <>
    <CraftForm />
    <div className={styles.buyerProfile}>
      
      <div className={styles.border} />
      
      <div className={styles.border1} />
      <div className={styles.pageHeader}>
          <div className={styles.pageTitle}>
            <h1
            style={
              {fontSize: '2em'}
            }
            >
            Your Profile</h1>
          </div>
      </div>

      <Form />
      
      <div className={styles.pictureName}>
        <input
          className={styles.name}
          value={data.email}
          type="email"
        />
        <img
          className={styles.picture}
          alt="./images/avatar.jpg"
          src={data.img}
          // src="./images/ellipse-909@2x.png"
        />
        <button className={styles.pictureNameInner} onClick={handleChange}> + Change photo</button>
      </div>
      
      
    </div>
    <Footer />
    </>
    
  );
};

export default BuyerProfile;
