import styles from "./NewArrival.module.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const NewArrival = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://heritage-u8vo.onrender.com/new_arrival')
      .then(response => {
        setProducts(response.data);
        // console.log(products[0]);
      })
      .catch(error => console.error(error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>New Arrivals in Creative Craftsmanship</h2>
      </div>
      <Slider {...settings} className={styles.slider}>
        {products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <Link to={`/product-listing/${product._id}`} className={styles.productButton}>
            <img className={styles.productImage} src={product.Product_img1} alt="picture not available" />
            </Link>
            <div className={styles.productInfo}>
              <p className={styles.productName}>{product.productName}</p>
              <p className={styles.productPrice}>৳ {product.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrival;
