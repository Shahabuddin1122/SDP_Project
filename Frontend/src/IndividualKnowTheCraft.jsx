import axios from "axios";
import style from "./IndividualKnowTheCraft.module.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CraftForm from "./Components/CraftForm";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import Messaging from "./Messaging_buyer";
import Notification from "./Notification.jsx";
export default function IndividualKnowTheCraft() {
    const [messageset, setmessagesetter] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [sellerName, setSellerName] = useState('');
    const buyerId = sessionStorage.getItem("buyer_id");
    const notification = useSelector(state => state.toggle)
    const callbackmessage_land = (data) => {
        console.log("Land ", data);
        setmessagesetter(data);
    }
    const closemessage = () => {
        setmessagesetter(false)
    }
    useEffect(() => {
        axios.get(`https://heritage-u8vo.onrender.com/know-the-craft/${id}`)
            .then(response => {
                // console.log(response);
                // console.log("the data is\n", response.data);
                // console.log(response.data.SellerId)
                setData(response.data);
                const { SellerId } = response.data;
                setSellerName(SellerId.name);
            })
            .catch(error => {
                console.log(error);
            })

    }, []);

    const imageStyle = {
        '--bg-image': `url(${data.Hero_img})`
    }

    return (
        <>
            {buyerId ? <CraftForm  callback2={callbackmessage_land}  /> : <Navbar />}
            {notification.toggle && <Notification/>}
            <div className={style.container}>

                <div className={style['hero-section']} style={imageStyle}>
                    <p className={style.h1}>{data.Artisan_Title}</p>
                    <p className={style.h3}>{`${data.Product_District}, ${data.Product_Division}`}</p>

                    <p className={style.h3}>{sellerName}</p>
                </div>

                <div>
                    <p className={style.h3}>Description</p>
                    <p>{data.Artisan_Description}</p>
                </div>
                <div className={`${style.history} ${style['history-secondary']}`}>
                    <div>
                        <p className={style.h3}>History</p>
                        <p>{data.Artisan_History}</p>
                    </div>
                    <div className={`${style.image} ${style['image-flex-end']}`}>

                        <img src={data.Front_img} alt={`Front image of ${data.Artisan_Title}`} />
                    </div>
                </div>
                <div className={style.history}>
                    <div className={style.image}>

                        <img src={data.Making_img} alt={`Making image of ${data.Artisan_Title}`} />
                    </div>
                    <div>
                        <p className={style.h3}>How it is made</p>
                        <p>{data.How_it_made}</p>
                    </div>
                </div>
            </div>
            {messageset && <Messaging closemessage={closemessage} />}
            <Footer />
        </>
    );
}