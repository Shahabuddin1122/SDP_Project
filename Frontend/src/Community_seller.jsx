import React, { useEffect,useRef,useState } from "react";
import axios from "axios";
import style from "./Community_home.module.css"
import Navbar from "./Components/Navbar";
import CraftForm from "./Components/CraftForm";
import Footer from "./Components/Footer";
import Message from "./Components/messagebox";
import Message_pic from "./Components/Message_pic";
import Message_txt from "./Components/Message_txt.jsx";
import { useDispatch, useSelector } from 'react-redux';
import Notification from "./Notification.jsx";
import { get_community_data } from "./Actions/community.jsx";
import { io } from "socket.io-client";
import LoginNav from "./Components/LoginNav.jsx"


const Community_home = ()=>{
    const messageref = useRef(null);
    const [socket,setsocket] = useState(null);
    const inputRef = useRef(null)
    const [message,setmessage] = useState();
    const [messageset,setmessagesetter] = useState(false);
    const buyerId = sessionStorage.getItem("seller_id");
    const notification = useSelector(state => state.toggle)
    const {isLoading,error,data} = useSelector(state => state.communityValue)
    console.log(data)
    const [value,setvalue]=useState({ valueCopy: [] });
    const [img,setimg] = useState("")

    useEffect(()=>{
        setsocket(io("http://localhost:8090"))
        console.log(buyerId)
    },[])
    useEffect(()=>{
        socket?.emit('addUser',buyerId)
        socket?.on('getUsers',users =>{
            console.log('active: ',users)
        })
        socket?.on('communityMessage', ({ senderId, message, attachment, date }) => {
            console.log('Received community message:', { senderId, message, attachment, date });
            axios.get(`https://heritage-u8vo.onrender.com/seller_profile/${senderId}`)
            .then((res)=>{
                console.log("DATA: ",value.valueCopy);
                setvalue((prevMessages) => {
                    const valueCopy = [...prevMessages.valueCopy];
                    valueCopy.push({
                        user: { email: res.data.email, name: res.data.name,pic:res.data.img, tag: 'buyer' },
                        message: message,
                        attachment: attachment,
                        date: date
                    });
                    console.log("Hook :",valueCopy);
                    return {
                      ...prevMessages,
                      valueCopy:valueCopy
                    };
                });
                console.log("AFTER: ",value.valueCopy);
            })
            .catch((err)=>{
                console.log("Socket Error",err);
            })
          });
    },[socket])
    useEffect(()=>{
         axios.get(`https://heritage-u8vo.onrender.com/community`)
        .then((res)=>{
            console.log("S: ",res.data)
            setvalue({valueCopy:res.data})
        })
        .catch((err)=>{console.error(err)})
    },[socket])






    const handleChange2 = (e) => {
        const files = e.target.files[0];
        console.log("IMAGE: ",files)
        setimg(files);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setmessage(value);
        console.log("Message: ",value)
    };
    const imageClick = ()=>{
        inputRef.current.click();
    }
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(get_community_data())
    },[])
    useEffect(()=>{
        messageref?.current?.scrollIntoView({behavior:'smooth'})
      },[value.valueCopy])
    const formDataToSend = new FormData();
    const HandleSubmit = async ()=>{
        formDataToSend.append('senderId',buyerId);
        formDataToSend.append('message',message);
        formDataToSend.append('img',img);
        setmessage("")
        setimg(null)
        axios.post(`https://heritage-u8vo.onrender.com/notifications`,{
            senderId: buyerId,
            receiverId: buyerId,
            notificationDescription: ' Posted on community'
          })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.error(err);
        })
        const response = await axios.post('https://heritage-u8vo.onrender.com/community', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if(response.status === 200) {
            console.log("Success");
            socket?.emit('sendCommunity',{
                senderId:response.data.senderId,
                message:response.data.message,
                attachment:response.data.attachment,
                date:response.data.date
            })
        }
        else {
            console.log("err");
        }
        
    }
    const callbackmessage_land = (data)=>{
        console.log("Land ", data);
        setmessagesetter(data);
      }
    return (
        <>
            <LoginNav callback2 = {callbackmessage_land} />
            {notification.toggle && <Notification/>}
            <div className={style.container}>
                <div className={style.down} >
                    <div onClick={imageClick}className={style.imgClick}>
                        <input
                            name="img"
                            className={style.imgbox}
                            type="file"
                            ref={inputRef}
                            onChange={handleChange2}
                        />
                        <div className={style.image}>
                            {img? <img src={URL.createObjectURL(img)} alt=''  />          :<i className="fa-solid fa-circle-plus" style={{ transform: "translate(80%, 105%)",color:"#999DEE" }}></i>}
                        </div>
                    </div>
                    <input
                        name="message"
                        placeholder="What's on your mind?"
                        type="text"
                        value={message}
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={HandleSubmit}>Upload</button>
                </div>
                <div className={style.up}>
                    {isLoading && <h1>Loading.............</h1>}
                    {/* <div ref={messageref}></div> */}
                    {Array.isArray(value.valueCopy) ? (
                    value.valueCopy.slice().reverse().map((value) => (
                        value.attachment ? (
                        <div key={value.id}>
                            <Message_pic user={buyerId} post={value.user.id} name={value.user.name} pic={value.user.pic} attachment={value.attachment} text={value.message} time={value.date} id={value.id} like={value.like} />
                        </div>
                        ) : (
                        <Message_txt user={buyerId} post={value.user.id} name={value.user.name} pic={value.user.pic} text={value.message} time={value.date} id={value.id} like={value.like}/>
                        )
                    ))
                    ) : (
                    <p>No Notification</p>
                    )}

                        
                </div>

            </div>
            <Footer/>
        
        </>
    )
}
export default Community_home;
