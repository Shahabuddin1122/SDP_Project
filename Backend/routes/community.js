const express = require('express');
const http = require('http')
const multer = require('multer'); 
const path = require('path');
//const {Server} = require('socket.io')
const cors = require('cors')
const cloudinary = require('../cloudinary');
const router = express.Router();
const app=express()
app.use(cors())
const Community = require('../Model/CommunitySchema');
const Seller = require('../Model/SellerSchema');
const Buyer = require('../Model/BuyerSchema');
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    },
});
const upload = multer({ storage: storage });

const io= require('socket.io')(8090,{
    cors: {
        origin: 'http://localhost:5173',
    }
});
let users = []

io.on("connection",(socket) =>{
    console.log('User Connected ',socket.id)
    socket.on('addUser',userId =>{
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            const user = {userId,socketId: socket.id};
            users.push(user)
            io.emit('getUsers', users);
            console.log(user)
        }
        console.log(users)
        
    });
    socket.on('sendCommunity',({senderId,message,attachment,date})=>{
        const sender = users.find(user => user.userId === senderId);
        io.emit('communityMessage', { senderId, message, attachment, date });
    });






    socket.on('sendMessage_seller',({senderId,receiverId,message,conversationId})=>{
        
        const receiver = users.find(user => user.userId === receiverId);
        const sender = users.find(user => user.userId === senderId);
        console.log("SENDER",sender);
        console.log("Receiver",receiver);
        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage_seller',{
                senderId,
                message,
                conversationId,
                receiverId
            });
        }
        else if(sender) {
            io.to(sender.socketId).emit('getMessage_seller',{
                senderId,
                message,
                conversationId,
                receiverId
            });
        }
        
    });
    socket.on('disconnect',()=>{
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers',users);
    })
})




router.post('/', upload.single('img'),async (req,res)=>{
    try {

        const userData= req.body;
        async function run(img) {
            try {
              const response = await cloudinary.uploader.upload(img);
              return response.url;
            } catch (error) {
              console.error('Error uploading to Cloudinary:', error);
              return null;
            }
        }
        if(req.file?.path){
            run(req.file.path)
            .then( async (imgpath)=>{
                const date_T = new Date();
                console.log(imgpath)
                const newCommunity = new Community({
                    ...userData,
                    attachment:imgpath,
                    date:date_T
                });
                const value= await newCommunity.save();
                console.log(value)
                res.status(200).json(value);
            })
            .catch((err)=>{
                console.log(err);
                res.status(500).send(err);
            })
        }
        else {
            const date_T = new Date();
            const newCommunity = new Community({
                ...userData,
                date:date_T
            });
            const value= await newCommunity.save();
            res.status(200).send(value);
        }
        
    } catch (error) {
        console.log(error,"Error")
    }
})
router.post('/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      // Find the community by ID
      const community = await Community.findById(id);
  
      if (!community) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      if(community.likes >=1) {
        community.likes += 1;
      }
      else {
        community.likes = 1;
      }
      
  
      // Save the updated community to the database
      await community.save();
  
      return res.status(200).json({ message: 'Like updated successfully', community });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const community = await Community.find();
        
        const messageData = await Promise.all(community.map(async (message) => {
            const seller = await Seller.findOne({ _id: message.senderId });
            const buyer = await Buyer.findOne({ _id: message.senderId });
            console.log(seller)
            const user = seller
                ? { id: seller.id, pic: seller.img, email: seller.email, name: seller.name, tag: "seller" }
                : buyer
                ? { id: buyer.id, pic: buyer.img, email: buyer.email, name: buyer.name, tag: "buyer" }
                : null;

            if (user) {
                return {
                    user,
                    id: message._id,
                    message: message.message,
                    attachment: message.attachment,
                    date: message.date,
                    like: message.likes || 0,
                };
            } else {
                console.error("Seller and Buyer are both null");
                return null;
            }
        }));

        const result = messageData.filter((item) => item !== null);
        res.send(result);
    } catch (error) {
        console.log(error, "Error");
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;