const express = require('express');
const http = require('http')
const { format } = require('date-fns');
//const {Server} = require('socket.io')
const cors = require('cors')
const router = express.Router();
const app=express()
app.use(cors())
const Notification = require('../Model/NotificationSchema')
const Seller = require('../Model/SellerSchema');
const Buyer = require('../Model/BuyerSchema');
const io= require('socket.io')(8085,{
    cors: {
        origin: 'http://localhost:5173',
    }
});
let users = []
io.on("connection",(socket) =>{
    console.log('User Connected for notification',socket.id)
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
    socket.on('sendNotification',({senderId,receiverId,message,conversationId})=>{
        
        const receiver = users.find(user => user.userId === receiverId);
        const sender = users.find(user => user.userId === senderId);
        console.log("SENDER",sender);
        console.log("Receiver",receiver);
        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage',{
                senderId,
                message,
                conversationId,
                receiverId
            });
        }
        else if(sender) {
            io.to(sender.socketId).emit('getMessage',{
                senderId,
                message,
                conversationId,
                receiverId
            });
        }
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

// useEffect(()=>{
//     axios.post(`https://heritage-u8vo.onrender.com//notifications`,{
//       senderId: user,
//       receiverId: user,
//       notificationDescription: 'Changed your Profile'
//     })
//   },[])
router.post('/', async (req, res) => {
    try {
      const { senderId,receiverId, notificationDescription } = req.body;
  
      // Create a new notification object
      const date = new Date();
      const formattedDate = date.toDateString();
      const newNotification = new Notification({
        senderId,
        receiverId,
        notificationDescription,
        date:formattedDate
      });
  
      // Save the notification to the database
      await newNotification.save();
  
      res.status(201).json({ notification: newNotification });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/:userID', async (req, res) => {
    try {
      const receiverId = req.params.userID;
      console.log(receiverId)
      // Find notifications that belong to the given userID
      const notifications = await Notification.find({ receiverId });
      //console.log(notifications)
      if (notifications.length === 0) 
      {
        res.status(200).json({ notifications: 0 });
      } 
      else 
      {
            const NotificationData = Promise.all(notifications.map(async (message) =>{
                const sender = await Buyer.findById(message.senderId) || await Seller.findById(message.senderId);
                const receiver = await Seller.findById(message.receiverId) || await Buyer.findById(message.receiverId);

                return {
                    senderName:sender.name,
                    senderPic:sender.img,
                    receiverName: receiver.name,
                    receiverPic: receiver.img,
                    notification: message.notificationDescription,
                    date:message.date 
                }
                
            }))
            res.send(await NotificationData)
      }
    } catch (error) {
      console.error(error);
      res.json({ message: 'Server Error' });
    }
});

//delete notification of a user
router.delete('/:userID', async (req, res) => {
    try {
      const receiverId = req.params.userID;
  
      // Delete all notifications that belong to the given userID
      const result = await Notification.deleteMany({ receiverId });
  
      res.json({ message: 'Delete notifications' });
    } catch (error) {
      console.error(error);
      res.json({ message: 'Server Error' });
    }
  });

module.exports = router;