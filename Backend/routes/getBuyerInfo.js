const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const Sells = require("../Model/SellsSchema");
const Seller = require("../Model/SellerSchema");
const Order = require("../Model/OrderSchema");
const Buyer = require("../Model/BuyerSchema");
const Cart = require("../Model/CartSchema")

router.get("/:id", async(req, res)=>{
    const id = req.params.id;
    // console.log(id);
    try {
        const buyer = await Buyer.findById(id);
        // console.log(buyer);
        // const products = await Order.find({orderStatus: {$eq: 'cart'}}).populate('product.productId');
        const cartProducts = await Cart.find({buyerId:id}).populate("productId");
        // console.log(cartProducts);
        res.json({buyer, cartProducts});
    } catch (error) {
        console.log(error);
    }
});
router.post("/:id",async(req, res)=>{
    const id = req.params.id;
    // console.log(req.body);
    const { product, buyerId, totalPrice } = req.body;
    // const { _id } = req.body;
    try {
        // const order = await Order.findById(_id);
        // // console.log(order);
        // order.orderStatus = 'pending';
        // const savedData = await order.save();
        // // console.log(savedData);
        // res.send(true);
        const order = new Order({
            product: product,
            buyerId: buyerId,
            sellerId: new ObjectId("652abef997985bc50914d046"),
            date: new Date(),
            totalPrice: totalPrice,
            orderStatus: 'pending'
        });
        const savedData = await order.save();
        // console.log("saved data");
        // console.log(savedData,"shohan");
        res.status(200).json({message:true, orderId:savedData._id});

    } catch (error) {
        console.log(error);
    }
});

router.put("/:id", async (req, res) => {
    const cartItemId = req.params.id;
    
    try {
        const validId = new mongoose.Types.ObjectId(cartItemId);
        const deletedCart = await Cart.findOneAndDelete({ productId: validId });
        if (deletedCart) {
            res.status(200).json({ message: 'Item removed from the cart.' });
        } else {
            res.status(404).json({ message: 'Item not found in the cart.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.delete("/:id", async(req, res)=>{
//     const id = req.params;
//     try {
//         const deletedCart = await Cart.deleteMany({buyerId: id});
//         console.log(deletedCart);
//         if(deletedCart.deletedCount > 0){
//             res.status(200).json({message:true});
//         }
//         else{
//             res.status(500);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });
module.exports = router;