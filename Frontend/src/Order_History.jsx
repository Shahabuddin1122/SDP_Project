/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styles from "./Order_History.module.css";
import axios from "axios";
import Navbar from "./Components/Navbar";
import CraftForm from "./Components/CraftForm";
import Footer from "./Components/Footer";
import Messaging from "./Messaging_buyer";

const Order_History = () => {
  const [messageset, setmessagesetter] = useState(false);
  const [isHovered, setHover] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const callbackmessage_land = (data) => {
    console.log("Land ", data);
    setmessagesetter(data);
  };
  const closemessage = () => {
    setmessagesetter(false);
  };
  const id = sessionStorage.getItem("buyer_id");
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState({});
  const [buyerProducts, setBuyerProducts] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);

  // Fetch buyer information and cart products on component mount
  // useEffect(() => {

  // }, [id]);

  // Fetch order history when the buyer ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const buyerInfoResponse = await axios.get(`http://localhost:3000/get-buyer-info/${id}`);
        setBuyer(buyerInfoResponse.data.buyer);

        if (id) {
          const ordersResponse = await axios.get(`http://localhost:3000/api/orders/${id}`);
          setBuyerProducts(ordersResponse.data.orders);
          // Calculate total price if needed
          // setTotalPrice(calculateTotalPrice(ordersResponse.data.orders));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  // Function to calculate the total price of the orders
  const calculateTotalPrice = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += order.totalPrice;
    });
    return total;
  };

  return (
    <>
      {id ? (
        <>
          <CraftForm callback2={callbackmessage_land} />
          {/* Display order history here using the buyerProducts state */}
          <div style={styles.container}>
            <h2 style={styles.heading}>Your Order History</h2>
            {buyerProducts.map((order) => (
              <div key={order._id} style={styles.orderContainer}>
                <div style={styles.cart}>
                  <div style={styles.orderDetails}>
                    <p style={styles.orderId}>Order ID: {order._id}</p>
                    <p style={styles.orderTime}>Date: {order.date}</p>
                    <p style={styles.orderTotal}>Total Bill: {order.totalPrice}</p>
                  </div>
                  <div style={styles.productContainer}>
                    {order.product.map((product) => (
                      <div key={product.productId._id} style={styles.productItem}>
                        <p style={styles.productName}>Name: {product.productId.productName}</p>
                        <p style={styles.productPrice}>Price: {product.productId.price} Taka</p>
                        <img
                          src={product.productId.Product_img1}
                          alt={product.productId.productName}
                          style={styles.productImage}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    style={{
                      ...styles.reorderButton,
                      ...(hoveredButton === order._id ? styles.reorderButtonHover : {}),
                    }}
                    onMouseEnter={() => setHoveredButton(order._id)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => handleReorder(order)}
                  >
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Navbar />
      )}

      {messageset && <Messaging closemessage={closemessage} />}
      <Footer />
    </>
  );
}

const styles = {
  container: {
    padding: '30px', // Increased padding
    border: '1px solid #e0e0e0',
    marginBottom: '30px', // Increased margin
    maxWidth: '900px', // Increased max width
    margin: '0 auto',
  },
  heading: {
    color: '#333',
    marginBottom: '30px', // Increased margin
    textAlign: 'center',
  },
  orderContainer: {
    marginBottom: '30px', // Increased margin
  },
  cart: {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased box shadow
    padding: '20px', // Increased padding
    borderRadius: '12px', // Increased border radius
    marginBottom: '20px', // Increased margin for each cart
    display: 'flex',
    justifyContent: 'space-between', // Align items in the flex container
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: '15px', // Increased margin
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'column', // Vertical arrangement
    marginBottom: '20px', // Increased margin
  },
  productName: {
    fontWeight: 'bold',
    fontSize: '18px', // Increased font size
    marginBottom: '8px', // Increased margin between name and price
  },
  productPrice: {
    color: '#333',
    fontSize: '16px', // Increased font size
  },
  productImage: {
    maxWidth: '120px', // Increased max width
    maxHeight: '120px', // Increased max height
    borderRadius: '8px', // Increased border radius
    marginTop: '15px', // Increased margin
  },
  orderDetails: {
    marginBottom: '15px',
  },
  orderTime: {
    marginBottom: '8px',
  },
  orderTotal: {
    marginBottom: '8px',
  },
  productItem: {
    marginBottom: '20px',
  },
  reorderButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 20px', // Rectangular shape
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
    width: '150px', // Fixed width
    height: '40px', // Fixed height
    transition: 'background-color 0.3s', // Transition for a smooth hover effect
  },
  reorderButtonHover: {
    backgroundColor: '#45a049', // Darker color on hover
  },
};


export default Order_History;
