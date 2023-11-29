import styles from "./OrderListSeller.module.css";
import LoginNav from "./Components/LoginNav.jsx";
import Footer from "./Components/Footer.jsx";
import  { useEffect, useState } from "react";
import axios from "axios";

const OrderListSeller = () => {

    const [orders, setOrders] = useState([]);
  const sellerId = sessionStorage.getItem("seller_id");

  useEffect(() => {
    axios.get(`https://heritage-u8vo.onrender.com/orderlist/${sellerId}`)
      .then((response) => 
      {
        console.log(response.data);
        // response.json();
        setOrders(response.data);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, [sellerId]);

  return (
    <>
    <LoginNav />

    <div className={styles.orderHistoryContainer}>
    <div className={styles.orderHistoryContent}>
        <h1 >Order History</h1>
        <p>Total Customers: {orders.length}</p>
        <div className={styles.lineSpace2}></div>

        {orders.map((order, index) => (
          <div key={order._id} className={styles.orderInfo}>
            <div className={styles.customerInfo}>

              <div>
                <strong>Customer #{index + 1}</strong>
              </div>
              <div className={styles.lineSpace}></div>
              <div><b>Name: </b>{order.buyerId.name}</div>
              <div className={styles.lineSpace}></div>
              <div><b>Email: </b>{order.buyerId.email}</div>
              <div className={styles.lineSpace}></div>
              <div><b>Mobile: </b>{order.buyerId.mobileNumber}</div>
              <div className={styles.lineSpace}></div>
              <div><b>Address: </b>{order.buyerId.area}, {order.buyerId.district}, {order.buyerId.division}</div>
            </div>

            <div className={styles.productInfo}>
            <div className={styles.productHeader}>
                <div>Product No.</div>
                <div>Image</div>
                <div>Name</div>
                <div>Quantity</div>
                <div>Price</div>
              </div>
              {order.product.map((productItem, i) => (
              <div key={productItem._id} className={styles.productRow}>
                <div>{i+1}</div>
                  <div>
                    <img src={productItem.productId.Product_img1} alt={productItem.productId.productName} />
                  </div>
                  <div>{productItem.productId.productName}</div>
                  <div>{productItem.quantity}</div>
                  <div>৳{productItem.productId.price}</div>
                </div>
              ))}
              
                <div className={styles.totalPrice}>
                  <strong>Total Price: ৳{order.totalPrice}</strong>
                </div>
             
                <div className={styles.orderStatus} style={{ backgroundColor: '#999DEE' }}>
                  Order Status: {order.orderStatus}
                </div>

              </div>
              
              
            
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OrderListSeller;
