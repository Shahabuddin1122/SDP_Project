import React,{useState} from "react";
import Style from "./message_pic.module.css"
import axios from "axios";
const message = ({user,post,name,text,pic,attachment,time,id,like})=>{
    const [isLiked, setIsLiked] = useState(false);
    const increaseLike = () => {
      setIsLiked(true);  // Set state to true when liked
      
      if(!isLiked){
          axios.post(`https://heritage-u8vo.onrender.com/community/${id}`)
            .then((res) => {
              console.log("Updated");
            })
            .catch((err) => {
              console.log(err);
        });
        axios.post(`https://heritage-u8vo.onrender.com/notifications`,{
            senderId: user,
            receiverId: post,
            notificationDescription: ' Liked your Post'
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.error(err);
        })
      }
      else {
          setIsLiked(false)
      }
    };
    
    return (
        <>
                <div className={Style.another}>
                    <div className={Style.round}>
                        <img src={pic} alt="" />
                    </div>
                    <div className={Style.anotherone}>
                        <div className={Style.text}>
                            <p>{name}</p>
                            <h5>{time}</h5>
                        </div>

                        <div className={Style.box}>
                            <p>{text}</p>
                        </div>
                        <div className={Style.inner_pic}>
                            <img src={attachment} alt="" />
                        </div>
                        <div style={{color:"#8b8b8b"}}>
                                {isLiked?<p>{like} likes including you</p>:<p>{like} likes</p>}
                        </div>
                        
                        <div className={Style.like}>
                           <i
                            className={`fa-regular fa-thumbs-up ${isLiked ? Style.liked : ''}`}
                            style={{ color: isLiked ? 'blue' : '#795AAC' }}
                            onClick={increaseLike}
                            ></i>
                            <i class="fa-solid fa-reply" style={{color: "#795AAC"}}></i>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default message;