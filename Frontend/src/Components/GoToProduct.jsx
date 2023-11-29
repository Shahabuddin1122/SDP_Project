import styles from "./GoToProduct.module.css";
// import { Link } from "react-router-dom";
// import Button from './Button.jsx';
import Button from "./Button";
import {useNavigate} from 'react-router-dom';

const GoToProduct = () => {
  const navigate= useNavigate();

  return (
    <div className={styles.sliderSection}>
      <div className={styles.imagePlaceholder}>
        <img className={styles.picture1Icon} alt="" src="https://res.cloudinary.com/dkotituzn/image/upload/v1701160121/wfcfrfxw3filqrxnti72.png" />
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
              <h5>Crafting Dreams,<br></br> Connecting Hearts.</h5>
            
          <div className={styles.keepYourEveryday}>
            Explore our curated collection of heritage-rich and innovative
            crafts, <br></br> lovingly crafted by skilled artisans from around the country.
          </div>
          <div className={styles.marqueeContainer}>
          <p className={styles.marqueeText}>
          Preserve,Promote,Prosper: Join the Craft Revolution!!
          </p>
          </div>
          {/* <div className={styles.scrollingText}>
          Preserve,Promote,Prosper: Join the Craft Revolution!!
        </div> */}
        </div>


        
        {/* </div> */}

        {/* <marquee behavior="scrol" direction="5">
                        <p style="color: #f7452d; font-weight: 600; font-size: 16px; padding-top: 3px; margin: 0;">BD Creation offers quality products, competitive prices and on-time delivery.</p>
                    </marquee> */}
        {/* <Link to={`/product-listing`} className={styles.button}> */}
          <div className={styles.getStarted}>
          <Button 
          text="See Collection"
          change={()=>navigate('/product-listing')}
          />
            {/* See Collection */}
          </div>
          {/* <img
            className={styles.iconarrowRight1}
            alt=""
            src="./images/iconarrowright6.svg"
          /> */}
        {/* </Link> */}
      </div>
    </div>
  );
};

export default GoToProduct;
