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
        const buyerInfoResponse = await axios.get(
          `https://heritage-u8vo.onrender.com/get-buyer-info/${id}`
        );
        // console.log(buyerInfoResponse.data.buyer, "shovo");
        setBuyer(buyerInfoResponse.data.buyer);

        if (id) {
          const ordersResponse = await axios.get(
            `https://heritage-u8vo.onrender.com/api/orders/${id}`
          );
          const sortedOrders = ordersResponse.data.orders.sort((a, b) => {
            // Convert date strings to Date objects for proper comparison
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            // Sort in descending order (from new to old)
            return dateB - dateA;
          });
          console.log(sortedOrders);
          setBuyerProducts(sortedOrders);
          // Calculate total price if needed
          // setTotalPrice(calculateTotalPrice(sortedOrders));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleButtonClick = async (order) => {
    // navigate("/Checkout");
    // delete all the products from the cart
    const deleteCart = async () => {
      try {
        const deleteResponse = await axios.delete(
          `https://heritage-u8vo.onrender.com/delete-cart/${id}`
        );
        console.log(deleteResponse);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    };
    // reorder & update the cart
    const reorder = async () => {
      try {
        const cartResponse = await axios.post(
          `https://heritage-u8vo.onrender.com/reorder/${id}`,
          order
        );
        console.log(cartResponse.data.cart, "shovo");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    await deleteCart();
    await reorder();
    navigate("/Checkout");
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
                  {/* Left side - Order ID, Time, and Total Price */}
                  <div style={styles.orderDetails}>
                  <p style={styles.orderId}>Order ID: {order._id}</p>
                  <p style={styles.orderTime}>Date: {order.date}</p>
                  <p style={{ ...styles.orderTotal, color: 'green' }}>
                    Total Bill: {order.totalPrice} Taka
                  </p>
                </div>

                  {/* Right side - Table for product details */}
                  <table style={styles.productTable}>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.product.map((product) => (
                        <tr
                          key={product.productId._id}
                          style={styles.productTableRow}
                        >
                          <td style={styles.productTableCell}>
                            <img
                              src={product.productId.Product_img1}
                              alt={product.productId.productName}
                              style={styles.productImage}
                            />
                          </td>
                          <td style={styles.productTableCell}>
                            {product.productId.productName}
                          </td>
                          <td style={styles.productTableCell}>
                            {product.quantity}
                          </td>
                          <td style={styles.productTableCell}>
                            {product.productId.price} Taka
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Reorder Button */}
                  <button
                    style={{
                      ...styles.reorderButton,
                      ...(hoveredButton === order._id
                        ? styles.reorderButtonHover
                        : {}),
                    }}
                    onClick={() => {
                      handleButtonClick(order);
                    }}
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
};

const styles = {
  container: {
    padding: "30px", // Increased padding
    border: "1px solid #e0e0e0",
    marginBottom: "30px", // Increased margin
    maxWidth: "1024px", // Increased max width
    margin: "0 auto",
  },
  heading: {
    color: "#333",
    marginBottom: "30px", // Increased margin
    textAlign: "center",
  },
  orderContainer: {
    marginBottom: "30px", // Increased margin
  },
  cart: {
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Increased box shadow
    padding: "20px", // Increased padding
    borderRadius: "12px", // Increased border radius
    marginBottom: "20px", // Increased margin for each cart
    display: "flex",
    justifyContent: "space-between", // Align items in the flex container
  },
  orderId: {
    fontWeight: "bold",
    marginBottom: "15px", // Increased margin
  },
  productTableCell: {
    padding: "15px", // Add padding to create a gap
  },
  productContainer: {
    display: "flex",
    flexDirection: "column", // Vertical arrangement
    marginBottom: "20px", // Increased margin
  },
  productName: {
    fontWeight: "bold",
    fontSize: "18px", // Increased font size
    marginBottom: "8px", // Increased margin between name and price
  },
  productPrice: {
    color: "#333",
    fontSize: "16px", // Increased font size
  },
  productImage: {
    maxWidth: "80px", // Adjust the maximum width
    maxHeight: "80px", // Adjust the maximum height
    borderRadius: "8px", // Increased border radius
    marginTop: "15px", // Increased margin
  },
  orderDetails: {
    marginBottom: "15px",
  },
  orderTime: {
    marginBottom: "8px",
  },
  orderTotal: {
    marginBottom: "8px",
  },
  productItem: {
    marginBottom: "20px",
  },
  reorderButton: {
    backgroundColor: "#7f33b5",
    color: "white",
    padding: "12px 20px", // Rectangular shape
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
    width: "150px", // Fixed width
    height: "40px", // Fixed height
    transition: "background-color 0.3s", // Transition for a smooth hover effect
  },
  reorderButtonHover: {
    backgroundColor: "#5c009e", // Darker color on hover
  },
};

export default Order_History;
