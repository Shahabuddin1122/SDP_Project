/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";
import axios from "axios";
import Navbar from "./Components/Navbar";
import CraftForm from "./Components/CraftForm";
import Footer from "./Components/Footer";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Messaging from "./Messaging_buyer";

const Checkout = () => {
  const [messageset, setmessagesetter] = useState(false);
  const [isDownloadButtonEnabled, setDownloadButtonEnabled] = useState(false);
  const [orderId, setOrderId] = useState("");

  const callbackmessage_land = (data) => {
    console.log("Land ", data);
    setmessagesetter(data);
  };
  const closemessage = () => {
    setmessagesetter(false);
  };
  const DownloadBill = () => {
    
    const doc = new jsPDF();
    let yPos = 20;

    // Add background image
    const backgroundImage = "https://res.cloudinary.com/dkotituzn/image/upload/v1701192960/h1k78gbncbykmf3cavnf.png"; // Replace with the path to your background image
    const bgWidth = doc.internal.pageSize.getWidth();
    const bgHeight = doc.internal.pageSize.getHeight();
    doc.addImage(backgroundImage, "PNG", 0, 0, bgWidth, bgHeight);

    // Add image
    const imgData =
      "https://res.cloudinary.com/dkotituzn/image/upload/v1701194070/fldbsyxtmr09s0zjz67i.png";
    const imgWidth = 50;
    const imgHeight = 20;
    const imgX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
    doc.addImage(imgData, "PNG", imgX, yPos, imgWidth, imgHeight);

    // Adjust the yPos after adding the image
    yPos += imgHeight + 10;

    // Add Title and Subtitle
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#00f7ff"); // Set text color to blue
    doc.setFontSize(26);
    doc.text("Heritage Craft Connect", 105, yPos, null, null, "center");
    doc.setFontSize(18);
    doc.setTextColor("#707070"); // Set text color to grey
    yPos += 10;
    doc.text("Product Bill", 105, yPos, null, null, "center");
    doc.setFont("helvetica", "normal");
    yPos += 20;

    //Date and Time
    const now = new Date();
    const date = `Date: ${now.toLocaleDateString()}`;
    const time = `Time: ${now.toLocaleTimeString()}`;
    const order_id = `Order ID: ${orderId}`;

    doc.setFontSize(14);
    doc.setTextColor("#707070"); // Set text color to grey
    doc.text(15, yPos, date);
    yPos += 10;
    doc.text(15, yPos, time);
    yPos += 10;
    doc.text(15, yPos, order_id);
    yPos += 20;

    // Add buyer information
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#4285F4"); // Set text color to blue
    doc.text(15, yPos, "Buyer Information");
    doc.setFont("helvetica", "normal");
    yPos += 10;
    doc.setTextColor("#707070"); // Set text color to grey
    doc.text(15, yPos, `Name: ${buyer.name}`);
    doc.text(150, yPos, `Area: ${buyer.area}`);
    yPos += 10;
    doc.text(15, yPos, `Email: ${buyer.email}`);
    doc.text(150, yPos, `District: ${buyer.district}`);
    yPos += 10;
    doc.text(15, yPos, `Phone: ${buyer.mobileNumber}`);
    doc.text(150, yPos, `Division: ${buyer.division}`);
    yPos += 20;

    // Add buyer products
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#4285F4"); // Set text color to blue
    doc.text(15, yPos, "Buyer Products");
    doc.setFont("helvetica", "normal");
    yPos += 10;

    doc.autoTable({
      startY: yPos,
      head: [["Product Name", "Quantity", "Price"]],
      body: buyerProducts.map((item) => [
        item.productId.productName,
        item.quantity,
        item.productId.price,
      ]),
      styles: {
        fontSize: 14,
      },
    });

    // Adjust the yPos after adding the table
    yPos = doc.lastAutoTable.finalY + 10;
    // Add sub-total and delivery charge in blue-bordered rectangles with smaller text
    const blueRectWidth = 45;
    const blueRectHeight = 10;

    // Sub-total
    doc.setDrawColor("#4285F4"); // Set border color to blue
    doc.rect(145, yPos, blueRectWidth, blueRectHeight);

    doc.setFontSize(10);
    doc.setTextColor("#046e08"); // Set text color to blue
    doc.text(145, yPos + 7, `Sub Total: ${totalPrice} TK`);

    // Delivery charge
    yPos += 10;
    doc.setDrawColor("#4285F4"); // Set border color to blue
    doc.rect(145, yPos, blueRectWidth, blueRectHeight);

    doc.setFontSize(10);
    doc.setTextColor("#046e08"); // Set text color to blue
    doc.text(145, yPos + 7, `Delivery Charge: ${60} TK`);

    // Total bill
    yPos += 10;
    doc.setDrawColor("#4285F4"); // Set border color to blue
    doc.rect(145, yPos, blueRectWidth, blueRectHeight);

    doc.setFontSize(10);
    doc.setTextColor("#046e08"); // Set text color to blue
    doc.text(145, yPos + 7, `Total Bill: ${totalPrice + 60} TK`);

    // Save the PDF
    doc.save("Bill.pdf");
  };

  const [buyer, setBuyer] = useState({});
  // const [products, setProducts] = useState({});
  const [buyerProducts, setBuyerProducts] = useState([]);
  const [buyerProducts1, setBuyerProducts1] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  const id = sessionStorage.getItem("buyer_id");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`https://heritage-u8vo.onrender.com/get-buyer-info/${id}`).then((response) => {
      // console.log(response.data.products);
      setBuyer(response.data.buyer);
      if (response.data.cartProducts) {
        // setProducts(response.data.products[0]);
        // const extractedProducts = response.data.products.map(item => item.product);
        setBuyerProducts(response.data.cartProducts);
        // console.log(response.data.cartProducts);
      }
    });
  }, []);

  let total = 0;
  buyerProducts.forEach((p) => {
    total += p.productId.price * p.quantity;
  });
  useEffect(() => {
    console.log(total);
    setTotalPrice(total);
  }, [total]);

  // const buyerProducts = extractedProducts[0];
  // console.log(buyerProducts[0]);
  const updateProduct = () => {
    let product = [];
    let total = 0;
    // const order = {}
    buyerProducts.forEach((p) => {
      product.push({ productId: p.productId._id, quantity: p.quantity });
      total += p.productId.price * p.quantity;
    });
    const orderData = {
      product: product,
      buyerId: id,
      totalPrice: total,
    };
    // console.log("a");
    // console.log(orderData);
    const saveData = async () => {
      const response = await axios
        .post(`https://heritage-u8vo.onrender.com/get-buyer-info/${id}`, orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert("Order Done");
          console.log(response);
          setOrderId(response.data.orderId);
          return response.status;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const deleteData = async () => {
      const response = await axios.delete(
        `https://heritage-u8vo.onrender.com/get-buyer-info/${id}`
      );
      return response.status;
    };
    if (saveData() === 200) {
      navigate("/confirmation");
    }
    setDownloadButtonEnabled(true);
  };
  const handleIncreaseQuantity = (productId) => {
    const updatedProducts = buyerProducts.map((item) => {
      if (item.productId._id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setBuyerProducts(updatedProducts);
  };
  const handleDecreaseQuantity = (productId) => {
    const updatedProducts = buyerProducts.map((item) => {
      if (item.productId._id === productId) {
        const newQuantity =
          item.quantity > 1 ? item.quantity - 1 : item.quantity;
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setBuyerProducts(updatedProducts);
  };
  const removeItem = async (productId) => {
    const updatedProducts = buyerProducts.filter(
      (item) => item.productId._id !== productId
    );
    const response = await axios.put(
      `https://heritage-u8vo.onrender.com/get-buyer-info/${productId}`
    );
    console.log(response);
    setBuyerProducts(updatedProducts);
  };

  return (
    <>
      {id ? <CraftForm callback2={callbackmessage_land} /> : <Navbar />}

      {buyerProducts.length ? (
        <div className={styles.checkout}>
          <div className={styles.contactInfoFrame} id="contact_info">
            <div className={styles.contactInformation}>Contact Information</div>
            <div className={styles.emailAddress}>
              <span>Email Address</span>
              <span className={styles.span}>*</span>
            </div>
            <div className={styles.fullName}>
              <span>Full Name</span>
              <span className={styles.span}>*</span>
            </div>
            <input
              className={styles.inputEmail}
              name="email_input"
              value={buyer.email}
              placeholder="Email address"
              type="text"
            />
            
            <input
              className={styles.inputName}
              name="name_input"
              value={buyer.name}
              placeholder="Name"
              type="text"
            />
            <div className={styles.phone}>
              <span>Phone</span>
              <span className={styles.span}>*</span>
            </div>
            <input
              className={styles.inputEmail1}
              name="phone_input"
              value={buyer.mobileNumber}
              placeholder="Phone number"
              type="text"
            />
          </div>
          <div className={styles.shippingAddressFrame} id="Shipping Address">
            <input
              className={styles.inputStreet}
              name="input_street"
              value={buyer.area}
              placeholder="Area"
              type="text"
            />
            <div className={styles.area}>Area*</div>
            <div className={styles.area}>
              <span>Area</span>
              <span className={styles.span}>*</span>
            </div>
            <div className={styles.district}>
              <span>{`District `}</span>
              <span className={styles.span}>*</span>
            </div>
            <input
              className={styles.inputDistrict}
              name="input_district"
              value={buyer.district}
              placeholder="District"
              type="text"
            />
            <div className={styles.division}>
              <span>{`Division `}</span>
              <span className={styles.span}>*</span>
            </div>
            <input
              className={styles.inputDivision}
              name="input_division"
              value={buyer.division}
              placeholder="Division"
              type="text"
            />
            <div className={styles.shippingAddress}>Shipping Address</div>
          </div>
          <div className={styles.policyText}>
            <span>{`Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our `}</span>
            <span className={styles.privacyPolicy}>privacy policy</span>
            <span>.</span>
          </div>
          <button className={styles.placeOrderButton} onClick={updateProduct}>
            <img
              className={styles.iconarrowRight}
              alt=""
              src="https://res.cloudinary.com/dkotituzn/image/upload/v1701192517/xconraqld104bnfvnvmj.svg"
            />
            <div className={styles.getStarted}>Place order</div>
            <img
              className={styles.iconarrowRight}
              alt=""
              src="https://res.cloudinary.com/dkotituzn/image/upload/v1701192517/xconraqld104bnfvnvmj.svg"
            />
          </button>
          {/* <Button
                    text="Place order"
                    onClick = {updateProduct}
                /> */}
          <div className={styles.selectedItems} id="items">
            {buyerProducts &&
              buyerProducts.map((item) => {
                const { productId, quantity } = item;
                // setTotalPrice(totalPrice += parseFloat(productId.price)*parseFloat(quantity));
                return (
                  <div key={productId._id} className={styles.product2}>
                    <div className={styles.product2Child} />
                    <img
                      className={styles.tablercurrencyTakaIcon}
                      alt=""
                      src="https://res.cloudinary.com/dkotituzn/image/upload/v1701192451/pnqqexutx4t9ir0j3qyb.svg"
                    />
                    <img
                      className={styles.product2Item}
                      alt=""
                      src={productId.Product_img1}
                    />
                    <button
                      className={styles.trash}
                      id="cancel_button"
                      onClick={() => {
                        removeItem(productId._id);
                      }}
                    >
                      <img
                        className={styles.trashChild}
                        alt=""
                        src="https://res.cloudinary.com/dkotituzn/image/upload/v1701192354/elue2k0o5dleioacpye3.svg"
                      />
                      <img
                        className={styles.trashItem}
                        alt=""
                        src="https://res.cloudinary.com/dkotituzn/image/upload/v1701192354/elue2k0o5dleioacpye3.svg"
                      />
                      <img
                        className={styles.trashInner}
                        alt=""
                        src="https://res.cloudinary.com/dkotituzn/image/upload/v1701191710/vrlj3drajzs0e01nnmwb.svg"
                      />
                      <div className={styles.ellipseDiv} />
                    </button>
                    <div className={styles.div}>{productId.price}</div>
                    <img
                      className={styles.jumpTimeDuotoneLineIcon}
                      alt=""
                      src="https://res.cloudinary.com/dkotituzn/image/upload/v1701191486/mwpybfxqvg7o7lhyd7dh.svg"
                    />
                    <div className={styles.gazipurdhaka}>
                      <p
                        className={styles.blankLine}
                      >{`${productId.district}, ${productId.division}`}</p>
                      <p className={styles.blankLine}>&nbsp;</p>
                      <p className={styles.blankLine}>&nbsp;</p>
                      <p className={styles.blankLine}>&nbsp;</p>
                      <p className={styles.blankLine}>&nbsp;</p>
                      <p className={styles.blankLine}>&nbsp;</p>
                      <p className={styles.blankLine}>&nbsp;</p>
                    </div>
                    <b className={styles.benaroshiSaree}>
                      {productId.productName}
                    </b>
                    <div className={styles.component71}>
                      <button
                        className={styles.minus}
                        id="minus_button"
                        onClick={() => handleDecreaseQuantity(productId._id)}
                      />
                      <div className={styles.count}>{quantity}</div>
                      <button
                        className={styles.plus}
                        id="plus_button"
                        onClick={() => handleIncreaseQuantity(productId._id)}
                      />
                      <img
                        className={styles.component71Child}
                        alt=""
                        src="https://res.cloudinary.com/dkotituzn/image/upload/v1701192603/xpkumfquat05umex00cw.svg"
                      />
                      <img
                        className={styles.path7Copy6}
                        alt=""
                        src="https://res.cloudinary.com/dkotituzn/image/upload/v1701192744/vzivazbufdhhovqgjzdr.svg"
                      />
                    </div>
                  </div>
                );
              })}
            
          </div>
          <div className={styles.selectedItems1}>Selected Items</div>
          <div className={styles.checkoutFrame}>
            <div className={styles.checkout1}>Checkout</div>
            
            <div className={styles.content}>
              <div className={styles.divider}>
                <div className={styles.divider1} />
              </div>
              <div className={styles.or}>Welcome</div>
              <div className={styles.divider}>
                <div className={styles.divider1} />
              </div>
            </div>
          </div>

          <div className={styles.fields} id="total_cost">
            <div className={styles.totalField}>
              <div className={styles.content1}>
                <div className={styles.titleamount}>
                  <div className={styles.label1}>Sub Total</div>
                  <div className={styles.totalBill1}>{`${totalPrice}`}</div>
                  <div className={styles.label2}>Delivery Charge</div>
                  <div className={styles.totalBill2}>{`${60}`}</div>
                  <div className={styles.label}>Total</div>
                  <div className={styles.totalBill}>{`${
                    totalPrice + 60
                  } `}</div>
                </div>
              </div>
            </div>
            <button
              style={{
                backgroundColor: "#9594f2",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "90px", // Adjust the spacing from the Total
              }}
              onClick={DownloadBill}
              disabled={!isDownloadButtonEnabled}
            >
              Download Bill
            </button>
          </div>
          <div className={styles.tk}>tk</div>
          <div className={styles.tk1}>tk</div>
          <div className={styles.tk2}>tk</div>
        </div>
      ) : (
        <div className={styles.checkout}>
          <p>There are no items in the list.</p>
        </div>
      )}

      {messageset && <Messaging closemessage={closemessage} />}
      <Footer />
    </>
  );
};

export default Checkout;
