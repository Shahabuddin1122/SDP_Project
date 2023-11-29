// import React from "react";
import { useState, useEffect, useRef } from 'react';
import Style from "./CraftsForm.module.css";
import axios from "axios";
// import Button from './Button.jsx';
import { Link } from "react-router-dom";
import BuyerProfileBox from '../BuyerProfileBox';
import {FaSearch} from 'react-icons/fa'
import LanguageSwitcher from './LanguageSwitcher';
import Message from './messagebox';
import { useDispatch, useSelector } from 'react-redux';
import notification  from '../Actions/notification'

const CraftForm = (props) =>{

    const [data, setData] = useState({});
    const [mess_hook,setmess_hook] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buyerId = sessionStorage.getItem("buyer_id");
    const overlayRef = useRef(null);
    const value = useSelector(state => state.toggle)
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');

    const changeSearchText = (e)=>{
        const {searchTextCallback} = props;
        setSearchText(e.target.value);
        // console.log(searchText);
        searchTextCallback(e.target.value);
    }

    const level_message = (data)=>{
        setmess_hook(true);
        console.log("Profile ", data); 
        toggleModal();
        props.callback2(data)
    }

    useEffect(() => {
        axios.get(`https://heritage-u8vo.onrender.com/buyer_profile/${buyerId}`)
        .then((response) => {
            setData(response.data);
            
        })
        .catch((error) => {
            console.error(error);
        });
    }, [buyerId]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);

        if (!isModalOpen) {
            document.body.style.overflow = 'auto';
        }
        // document.body.style.overflow = isModalOpen ? 'auto' : 'hidden';
    };
    const notificationTogg = ()=>{
        dispatch(notification())
        console.log("TOGGLE: ",value.toggle)
    }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      toggleModal();
    }
  };

    
    return (

        <>
            <div className={Style.navbar}>
                <div className={Style.upper}>
                    <div className={Style.left}>
                        <Link to={`/become_seller`} className={Style.link}>Become a Seller</Link>
                    </div>
                    <div className={Style.right}>
                    {/* <Link to={`/login`} className={Style.link}> Login</Link> */}
                        {/* <Button text="Logged in"/> */}
                        <LanguageSwitcher />
                        <button className={Style.icons} onClick={toggleModal}>
                            <i class="fas fa-user"></i>
                            <p>{data.name}</p>
                        </button>
                        <button className={Style.icons} onClick={notificationTogg}>
                            <i class="fa-regular fa-bell"></i>
                            <p>Notifications</p>
                        </button>
                        <div className={Style.icons}>
                            <i class="fa-solid fa-cart-plus"></i>
                            <Link to={`/checkout`}><p>Cart</p></Link>
                        </div>

                    </div>
                </div>
                <div className={Style.lower}>
                    <div className={Style.left}>
                    <Link to={`/product-listing`}><img src="https://res.cloudinary.com/dkotituzn/image/upload/v1701181973/oi3hbp6e9isxhlgmg5nc.png" alt="" /></Link>
                    </div>
                    <div className={Style.middle}>
                        <Link to={`/`} className={Style.link}> Home</Link>
                        <Link to={`/product-listing`} className={Style.link}> Product</Link>
                        <Link to={`/Community`} className={Style.link}> Community</Link>
                        <Link to={`/know-the-craft`} className={Style.link}> Know about craft</Link>
                        {/* <button onClick={scrollToCommunity}>Community</button> */}
                        {/* <button className={Style.link} onClick="document.getElementById('middle').scrollIntoView();"> Community</button> */}
                        {/*<Link to={`/community`} className={Style.link}> Community</Link>*/}
                        {/* <a href="#">Know about craft</a> */}
                    </div>
                    <div className={Style.right}>
                        <input type="text" className={Style.search} value={searchText} placeholder="Search..." onChange={changeSearchText}></input>
                        {/* <i className="fa fa-search icon"></i>    */}
                        <button onClick={props.searchCallback}><FaSearch/></button>
                    </div> 
                </div>
            </div>
            {isModalOpen && (
                <div className={Style.overlay} onClick={handleOverlayClick} ref={overlayRef}>
                 {value? (<BuyerProfileBox callback={level_message} />):(<p></p>)}
                </div>
            )}

        </>
    );
}
export default CraftForm;