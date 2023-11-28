// import React from "react";
import { useState, useEffect, useRef } from 'react';
import Style from "./Navbar_seller.module.css";
import { Link } from 'react-router-dom';
import axios from "axios";
// import Button from './Button.jsx';
// import { Link } from "react-router-dom";
import ProfileBox from '../ProfileBox';
import { useDispatch, useSelector } from 'react-redux';
import notification  from '../Actions/notification'
const Navbar = (props) =>{

    const [data, setData] = useState({});
    const [mess_hook,setmess_hook] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sellerId = sessionStorage.getItem("seller_id");
    const overlayRef = useRef(null);
    const value = useSelector(state => state.toggle)
    const dispatch = useDispatch();
    const level_message = (data)=>{
      setmess_hook(true);
      console.log("Profile ", data); 
      toggleModal();
      props.callback2(data)
    }
  useEffect(() => {
    axios.get(`https://heritage-u8vo.onrender.com/seller_profile/${sellerId}`)
      .then((response) => {
        console.log(response.data._id)
        setData(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, [sellerId]);

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

  const [isProductMenuOpen, setProductMenuOpen] = useState(false);

  const toggleProductMenu = () => {
    setProductMenuOpen(!isProductMenuOpen);
  };

    
    return (

        <>
        <div className={Style.navbar}> {/* Use CSS module class name */}
            <div className={Style.upper}>
                <div className={Style.left}>
                    <h4 style={{ margin: '1px' }}></h4>
                </div>
                <div className={Style.right}>
                {/* <div className={Style.profile}> */}
                    <button className={Style.picture} onClick={toggleModal}>
                        <i class="fas fa-user"></i>
                        <p>{data.name}</p>
                    </button>
                    {/* <div className={Style.profile}>
                        <img src="./images/icons8-male-user-50.png" alt="" onClick={openmodel} />
                        </div> */}
                    <div className={Style.icons} onClick={notificationTogg} >
                        <i className="fa-regular fa-bell"></i>
                        <p>Notifications</p>
                    </div>
                    <div className={Style.icons}>
                        <i className="fa-solid fa-cart-plus"></i>
                        <p>Cart</p>
                    </div>
                </div>
            </div>
            <div className={Style.lower}>
                <div className={Style.left}>
                    <Link to={`/home_seller`}><img src="https://res.cloudinary.com/dkotituzn/image/upload/v1701181973/oi3hbp6e9isxhlgmg5nc.png" alt="" /></Link>
                </div>
                <div className={Style.middle}>
                    <nav className={Style.navbar}>
                    <ul className={Style['nav-list']}>
                        <Link to={`/home_seller`}><li className={Style['nav-item']}>Home</li></Link>
                        <li className={Style['nav-item']} onMouseEnter={toggleProductMenu} onMouseLeave={toggleProductMenu}>
                        Product
                        {isProductMenuOpen && (
                        <ul className={Style['dropdown-menu']}>
                        <Link to={`/sellerProductListing`}><li className={Style['dropdown-item']}>View Product</li></Link>
                        <Link to={`/AddAProductPage`}><li className={Style['dropdown-item']}>Add Product</li></Link>
                        <Link to={`/Add_Know`}><li className={Style['dropdown-item']}>Add Craft</li></Link>
                        </ul>
                        )}
                        </li>
                        <Link to={`/Community_seller`} ><li className={Style['nav-item']}>Community</li></Link>
                        <li className={Style['nav-item']}>Orderlist</li>
                    </ul>
                    </nav>
                </div>
                <div className={Style.right}>
                    <input type="text" className={Style.search} placeholder="Search..." />
                    <i className="fa fa-search icon"></i>
                </div>
            </div>
        </div>

        {isModalOpen && (
                <div className={Style.overlay} onClick={handleOverlayClick} ref={overlayRef}>
                 <ProfileBox callback={level_message} />
                </div>
            )}
        </>

        



        
    );
}
export default Navbar;