const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const app = express();

dotenv.config({ path: './config.env' });
require('./Database/conn');
const cloudinary = require('./cloudinary')

const Buyer = require('./Model/BuyerSchema');
const Products = require('./Model/ProductsSchema');
const Order = require('./Model/OrderSchema');
const Seller = require('./Model/SellerSchema');
const Reviews = require('./Model/ProductReviewSchema');
const Wishlist = require('./Model/WishlistSchema');
const Notifications = require('./Model/NotificationSchema');

const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended: true, limit: '100mb'}));

const Sells = require('./Model/SellsSchema');





const registerRouter = require('./routes/register');
app.use("/register",registerRouter);


const registerSellerRouter = require('./routes/register_seller');
app.use("/register_seller",registerSellerRouter);


const loginRouter = require('./routes/login');
app.use("/login",loginRouter);


const sellerLoginRouter = require('./routes/seller_login');
app.use("/seller_login", sellerLoginRouter);


const verifyRouter = require('./routes/verify');
app.use("/verify", verifyRouter);


const orderSellerRouter = require('./routes/orderSeller');
app.use("/order_seller", orderSellerRouter);


const practiceRouter = require('./routes/practice');
app.use("/practice", practiceRouter);


const countCustomerRouter = require('./routes/countCustomer');
app.use("/count_customer", countCustomerRouter);

const count_price = require('./routes/count_price_customer');
app.use("/count_price_customer", count_price);

const productListingRouter = require('./routes/productListing');
app.use("/product-listing", productListingRouter);


const buyerProfileRouter = require('./routes/buyer_profile');
app.use("/buyer_profile", buyerProfileRouter);

const sellerProfileRouter = require('./routes/seller_profile');
app.use("/seller_profile", sellerProfileRouter);

const changePass = require('./routes/forgotpass');
app.use("/forgotpass", changePass);

const knowNavSellerRouter = require('./routes/Know_nav_seller');
app.use("/know_nav_seller", knowNavSellerRouter);

const Message = require('./routes/message');
app.use("/message", Message);

const verifyRouter2 = require('./routes/verify2');
app.use("/verify2", verifyRouter2);

const matchmail = require('./routes/matchemail');
app.use("/matchemail", matchmail);

const matchmail2 = require('./routes/matchemailseller');
app.use("/matchemailseller", matchmail2);

const changePass2 = require('./routes/forgotpass_seller');
app.use("/forgotpass_seller", changePass2);

const addProduct = require('./routes/addproduct');
app.use("/addproduct", addProduct);

const sellerList = require('./routes/seller_product_list');
app.use("/seller_product_list", sellerList);

//----APIs for Review----
//code for add review for product
app.post('/add/review', async (req, res) => {
  try {
    const { reviewDescription, productId } = req.body;

    // Check if the productId exists in your "Products" model.
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create a new review object
    const newReview = new Reviews({
      reviewDescription,
      product: productId, // Use the "products" reference as specified in your schema
    });

    // Save the review to the database
    await newReview.save();

    res.json({ review: newReview });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//show all buyer
app.get('/buyers', async (req, res) => {
  try {
    // Find all Buyers in the "Buyers" model
    const Buyers = await Buyer.find();

    res.json({ Buyers });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});


//get review using product ID
app.get('/reviews/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find reviews that are associated with the given product ID
    const reviews = await Reviews.find({ product: productId });

    if (reviews.length === 0) 
    {
      res.json({ reviews: 0 });
    } 
    else 
    {
      res.json({ reviews });
    }
    } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//show all reviews
app.get('/reviews', async (req, res) => {
  try {
    // Find all reviews in the "Reviews" model
    const reviews = await Reviews.find();

    res.json({ reviews });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//delete all reviews
app.delete('/reviews/delete', async (req, res) => {
  try {
    // Delete all reviews in the "Reviews" model
    const result = await Reviews.deleteMany();

    res.json({ message: `Deleted ${result.deletedCount} reviews` });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//delete review using review ID
app.delete('/review/delete/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Check if the review exists
    const review = await Reviews.findById(reviewId);

    if (!review) {
      return res.json({ message: 'Review not found' });
    }

    // Delete the review
    await Reviews.findByIdAndDelete(reviewId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});


//-------Wishlist APIs-------
//whistlist create
app.post('/create/wishlist', async (req, res) => {
  try {
    const { buyerid, productid } = req.body;

    // Create a new wishlist entry
    const newWishlistItem = new Wishlist({
      buyerID : buyerid,
      productID : productid
    });

    // Save the wishlist item to the database
    await newWishlistItem.save();

    res.json({ wishlistItem: newWishlistItem });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//wishlist get using buyer id
app.get('/wishlist/:buyerID', async (req, res) => {
  try {
    const buyerid = req.params.buyerID;

    // Find wishlist items that belong to the given buyerID
    const wishlistItems = await Wishlist.find({ buyerID: buyerid }).populate('productID');

    if (wishlistItems.length === 0) 
    {
      res.json({ wishlistItems: 0 });
    } 
    else 
    {
      res.json({ wishlistItems });
    }

  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//delete wishlist using buyer id
app.delete('/delete/wishlist/:buyerID', async (req, res) => {
  try {
    const buyerid = req.params.buyerID;
    // Delete all wishlist items that belong to the given buyerID
    const result = await Wishlist.deleteMany({ buyerID: buyerid });

    res.json({ message: 'Cleared items from the wishlist' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});


//-----Notification APIs-----
//create notification using id
app.post('/add/notifications', async (req, res) => {
  try {
    const { userID, notificationDescription } = req.body;

    // Create a new notification object
    const newNotification = new Notifications({
      userID,
      notificationDescription
    });

    // Save the notification to the database
    await newNotification.save();

    res.status(201).json({ notification: newNotification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//view notification using user ID
app.get('/get/notifications/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Find notifications that belong to the given userID
    const notifications = await Notifications.find({ userID });

    if (notifications.length === 0) 
    {
      res.status(200).json({ notifications: 0 });
    } 
    else 
    {
      res.status(200).json({ notifications });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});

//delete notification of a user
app.delete('/delete/notifications/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Delete all notifications that belong to the given userID
    const result = await Notifications.deleteMany({ userID });

    res.json({ message: 'Delete notifications' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server Error' });
  }
});






const checkoutRouter = require('./routes/checkout');
app.use("/checkout", checkoutRouter);


const getBuyerInfoRouter = require('./routes/getBuyerInfo');
app.use("/get-buyer-info", getBuyerInfoRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}/`);
});
