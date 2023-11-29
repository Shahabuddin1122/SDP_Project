import React, { useEffect, useState,useRef } from "react";
import Style from "./Messaging.module.css";
import Message from "./Components/messagebox.jsx";
import Message2 from "./Components/messagebox_2.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

/*
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000")
*/
const Messaging = (props) => {
  const [socket,setsocket] = useState(null);
  const [conversation,setconversation] = useState();
  const [messages,setmessages] = useState({ messagesCopy: [] });
  const [message,setmessage] = useState();
  const [conversationId,setconversationId]= useState();
  const [receiver,setreceiver] = useState();
  const [name,setname] = useState();
  const [UserId,setUser] = useState(sessionStorage.getItem("seller_id"));
  const [userName,setuserName] = useState();
  const [userEmail,setuserEmail] = useState();
  const id = "651c5377783c0719018cd17f"
  const messageref = useRef(null);
  useEffect(()=>{
    setsocket(io("http://localhost:8080"))
    console.log(UserId)
  },[])
  useEffect(()=>{
    
    socket?.emit('addUser',UserId)
    socket?.on('getUsers',users =>{
      console.log('Seller_activeUsers:  ',users)
    })
    axios.get(`https://heritage-u8vo.onrender.com/seller_profile/${UserId}`)
    .then((res)=>{
      socket?.on('getMessage',data => {
        console.log("GETMESSAGE: ",res.data)
        setmessages((prevMessages) => {
          const messagesCopy = [...prevMessages.messagesCopy];
          messagesCopy.push({
            user: { email: res.data.email, name: res.data.name, tag: 'buyer' },
            message: data.message
          });
          console.log("Hook :",messagesCopy);
          return {
            ...prevMessages,
            messagesCopy:messagesCopy
          };
        }); 
      })
      socket?.on('getMessage_seller',data => {
        console.log("GETMESSAGE: ",res.data)
        setmessages((prevMessages) => {
          const messagesCopy = [...prevMessages.messagesCopy];
          messagesCopy.push({
            user: { email: res.data.email, name: res.data.name, tag: 'seller' },
            message: data.message
          });
          console.log("Hook :",messagesCopy);
          return {
            ...prevMessages,
            messagesCopy:messagesCopy
          };
        }); 
      })
    })
    .catch((err)=>{
      console.error(err)
    })
    
  },[socket])

  const [isLeftHovered, setIsLeftHovered] = useState(false);
  useEffect(()=>{
    axios.get(`https://heritage-u8vo.onrender.com/message/conversation_seller/${UserId}`)
    .then((res)=>{
      console.log(res.data)
      const mappedUser = res.data.map((order, index) => ({
        User_ID: order.user.id,
        name: order.user.fullName,
        email: order.user.email,
        img:order.user.image,
        conversation:order.conversationId
      }));
      setconversation(mappedUser)
      console.log("MAP: ", mappedUser)
    })
    .catch((err)=>{
      console.error(err);
    })
  },[])
  useEffect(()=>{
    messageref?.current?.scrollIntoView({behavior:'smooth'})
  },[messages])
  useEffect(()=>{
    axios.get(`https://heritage-u8vo.onrender.com/seller_profile/${UserId}`)
    .then((res)=>{
      console.log(res.data.name)
      setuserName(res.data.name)
      setuserEmail(res.data.email)
    })
    .catch((err)=>{
      console.error(err)
    })
  },[])

  const handleLeftHover = () => {
    setIsLeftHovered(true);
  };

  const handleLeftHoverOut = () => {
    setIsLeftHovered(false);
  };
  const MessageChange = (e)=>{
    const {value} = e.target;
    setmessage(value)
  }
  const ConBegin = (id,name,rec)=>{
    axios.get(`https://heritage-u8vo.onrender.com/message/${id}`)
    .then((res)=>{
      console.log(res.data)
      setconversationId(id);
      
      setmessages({messagesCopy:res.data})
      setname(name);
      setreceiver(rec)
    })
    .catch((err)=>{
      console.error(err);
    })
  }
  const Sendmessage = ()=>{
    console.log("REC ",receiver)
    socket?.emit('sendMessage_seller', {
      senderId:UserId,
      receiverId:receiver,
      conversationId,
      message
    });
    axios.post('https://heritage-u8vo.onrender.com/message', {
    conversationId,
    senderId:UserId,
    message
    })
    .then(response => {
      console.log(response.data);
      setmessage('')
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <>
      <div className={Style.container}>
        <div className={Style.top}>
          <div
            className={Style.right}

          >
            {(name)? (<p>{name}</p>):<div><p style={{
              "font-size": "22px",
              "margin-left": "68px",
              "margin-top": "7px"}}
             >Not selected any message</p></div>}
            <div className={Style.btn}>
              <button onClick={props.closemessage} style={{textAlign: "right"}}>X</button>
            </div>
          </div>
          
        </div>
        <div className={Style.middle}>
          <div
            className={Style.left}
            onMouseEnter={handleLeftHover}
            onMouseLeave={handleLeftHoverOut}
            style={{
              width: isLeftHovered ? "37%" : "17%", // Increase the width of left div when hovered
            }}
          >
            {(conversation && conversation.length > 0 )? (
              conversation.map((order, index) => (
                <div key={index} style={{
                      border: "1px solid #999DEE",
                      overflow: "hidden"
                  }}  >
                  <div className={Style.image}  onClick={()=>ConBegin(order.conversation,order.name,order.User_ID)}>
                    <img src={order.img} alt="" />
                    <p>{order.name}</p>
                  </div>
                </div>
              ))
            ):<div><h1>No Conversation</h1></div>}












          </div>
          <div
            className={Style.right}
            style={{
              width: isLeftHovered ? "63%" : "83%", // Decrease the width of right div when left is hovered
            }}
          >
                <div className={Style.up}>
                {messages? (messages.messagesCopy.map((message, index) => (
                  <div key={index}>
                    {message.message ? (
                      message.user.tag === 'seller' ? (
                        <Message2 text={message.message} />
                      ) : (
                        <Message text={message.message} />
                      )
                    ) : (
                      <div>
                        <p style={{
                          "font-size": "22px"
                        }}>Not selected any message</p>
                      </div>
                    )}
                  </div>
                ))
                ): (<><p style={{
                    "fontSize": "1.5em",
                    "textAlign": "center"
                  }} >Loading..........</p></>)}
                  <div ref={messageref}></div>


                  {/*
                  <Message text={"Hello"} />
                  <Message2 text={"Hi"} />
                  <Message2 text={"Hi"} />
                  <Message text={"Hinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"} />
                  <Message2 text={"Hinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"} />
                  <Message text={"Hinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"} />
                  <Message2 text={"Hinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"} />
                  <Message text={"Hinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"} />
                  <Message2 text={"Hinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"} />
                  */}
                </div>
                <div className={Style.down}>
                  <input 
                      type="text"
                      placeholder="Write message"
                      value={message}
                      onChange={MessageChange}
                  />
                  <button type="submit" onClick={()=>Sendmessage() }>Send</button>
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messaging;
