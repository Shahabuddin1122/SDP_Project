import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import style from "./KnowTheCraft.module.css"
import { KnowCraftCard } from "./Components/Card";
import Navbar from './Components/Navbar'
import CraftForm from "./Components/CraftForm";
import { Link } from "react-router-dom";
import Button from "./Components/Button.jsx";
import Footer from "./Components/Footer";
import Division from "./Classes/divisionDistrict";
import Messaging from "./Messaging_buyer";
import { useDispatch, useSelector } from 'react-redux';
import Notification from "./Notification.jsx";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

export default function KnowTheCraft() {
    const [messageset, setmessagesetter] = useState(false);
    const [productCount, setCount] = useState(0);

    const perPage = 8;
    const [showCount, setShowCount] = useState(perPage);

    const [products, setProducts] = useState([]);

    const buyerId = sessionStorage.getItem("buyer_id");
    const notification = useSelector(state => state.toggle)
    const [divisionValue, setDivisionValue] = useState('');
    // const [districtValue, setDistrictValue] = useState('');

    const [isDistrictOpen, toggleDistrict] = useState(false);
    const [districtCheckbox, setDistrictCheckbox] = useState([]);
    const [districtValue, setDistrict] = useState([]);

    const [sortBy, setSortBy] = useState('');

    const callbackmessage_land = (data) => {
        console.log("Land ", data);
        setmessagesetter(data);
    }
    const closemessage = () => {
        setmessagesetter(false)
    }



    // searching
    const [searchText, setSearchText] = useState('');
    const handleSearch = (value) => {
        setSearchText(value);
        // console.log("The search value in productlisting is\n", searchText);
    }

    const clearSorting = () => {
        setSortBy('');
    }
    const clearFiltering = () => {
        
        setDistrict([]);
        setDistrictCheckbox([]);
        setDivisionValue('');

    }

    const searching = () => {
        clearFiltering();
        clearSorting();
        axios.get(`https://heritage-u8vo.onrender.com/know-the-craft?search=${searchText}`)
            .then((response) => {
                // console.log("The filtered response is\n", response);
                // console.log("The filtered data is\n", response.data);
                setProducts(response.data);
                setCount(response.data.length);
                setShowCount(perPage);
            })
    }
    useEffect(() => {

        setDistrictCheckbox(new Array(Division.getDistrict(divisionValue).length).fill(false));
        setDistrict([]);
    }, [divisionValue])

    const filtering = () => {
        axios.get(`https://heritage-u8vo.onrender.com/know-the-craft?search=${searchText}&division=${divisionValue}&district=${districtValue}&sort=${sortBy}`)
            .then((response) => {
                // console.log(response.data);
                setProducts(response.data);
                setCount(response.data.length);
                // setShowCount(perPage);
            })
    }

    

    useEffect(()=>{
        // console.log("The sort by is: ", sortBy);
        axios.get(`https://heritage-u8vo.onrender.com/know-the-craft?search=${searchText}&division=${divisionValue}&district=${districtValue}&sort=${sortBy}`)
            .then((response) => {
                // console.log(response.data);
                setProducts(response.data);
                setCount(response.data.length);
                // setShowCount(perPage);
                // console.log("from product:" + sessionStorage.getItem("uid"));
            })
    },[sortBy]);

    useEffect(() => {
        axios.get('https://heritage-u8vo.onrender.com/know-the-craft')
            .then((response) => {
                // console.log(response.data);
                setProducts(response.data);
                setCount(response.data.length);
                setShowCount(perPage);
            })
    }, [])
    return (
        <>
            {buyerId ?
                <CraftForm
                    callback2={callbackmessage_land}
                    searchTextCallback={handleSearch}
                    searchCallback={searching} />
                : <Navbar
                    searchTextCallback={handleSearch}
                    searchCallback={searching}
                />}
            {notification.toggle && <Notification />}
            <div className={style.container}>
                {/* <div>navbar</div> */}
                <div className={style['hero-section']}>
                    <div className={style['hero-heading']}><h1>Find the traditional art and crafts of different districts in Bangladesh</h1></div>
                    {/* <p>Buy the traditional handicraft items from various categories.</p> */}
                    {/* <div className={style['hero-search']}>
                        <input style={{ color: "black" }} type="text" placeholder="Search by district or name of the product" value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button className={style.button}>
                            <i className="fa-solid fa-magnifying-glass fa-lg" style={{ color: "#ffffff", }}></i>
                        </button>
                    </div> */}
                </div>
                {/* <div className={style['division-button']}>
                    {Division.getDivision().map((div,index)=>{
                       return <button className={style.button} key={index}>{div}</button>
                    })}
                </div> */}
                <div className={style['filter-and-products']}>
                    <div className={style['filter']}>
                        <p className={style['filter-heading']}>Filter</p>
                        <select onChange={(e) => setDivisionValue(e.target.value)} value={divisionValue}>
                            <option value="">Select a division</option>
                            {Division.getDivision()?.map(div => {
                                return <option value={div}>{div}</option>
                            })}
                        </select>
                        <div style={{ cursor: "pointer", marginBottom: "5px" }} onClick={() => toggleDistrict(!isDistrictOpen)}>
                            {isDistrictOpen ?
                                <div>
                                    <FaAngleDown style={{ display: "inline" }}/>
                                    <div style={{ display: "inline" }}>District</div>
                                </div>
                                : <div>
                                    <FaAngleRight style={{ display: "inline" }}/>
                                    <div style={{ display: "inline" }}>District</div>
                                </div>}
                        </div>
                        {isDistrictOpen &&

                            <ul className={style['categories-list']}>
                                {Division.getDistrict(divisionValue)?.map((dist, index) => {
                                    const styling = {
                                        cursor: "pointer",
                                        gap: "5px",
                                        margin: "5px 0px"
                                    }
                                    return <li key={index}>
                                        <label style={styling}>
                                            <input type="checkbox" checked={districtCheckbox[index]} onChange={() => {
                                                const updatedCheckbox = [...districtCheckbox];
                                                updatedCheckbox[index] = !districtCheckbox[index];
                                                setDistrictCheckbox(updatedCheckbox);
                                                // console.log(updatedCheckbox);

                                                if (updatedCheckbox[index]) {
                                                    setDistrict(prev => [...prev, dist]);
                                                } else {
                                                    setDistrict(prev => prev.filter(prevDis => prevDis !== dist));
                                                }

                                                // console.log(districtValue);

                                            }} />
                                            {'  ' + dist}
                                        </label>
                                    </li>
                                })}
                            </ul>
                        }
                        {/* <select value={districtValue} onChange={(e) => setDistrictValue(e.target.value)}>
                            <option value="">Select a district</option>
                            {Division.getDistrict(divisionValue)?.map((dist) => {
                                return <option value={dist}>{dist}</option>
                            })}
                        </select> */}
                        <Button
                            text="Apply"
                            change={filtering}
                        />
                    </div>
                    <div className={style['product-list']}>
                        {/* <div style={{
                            fontSize: "2em",
                            fontWeight: "700",
                            width: "100%"
                        }}>
                            Dhaka
                        </div> */}
                        <div className={style['sort-and-filter']}>
                            {/* <p style={{ fontWeight: "700" }}>Faridpur</p> */}
                            <p>{`${productCount} Crafts`}</p>
                            <select value={sortBy} className={style['sort-selection']} onChange={(e)=>{
                                e.preventDefault;
                                setSortBy(e.target.value);
                            }}>
                                <option value="Artisan_Title">Sort</option>
                                <option value="Product_District">District {'(A to Z)'}</option>
                                <option value="-Product_District">District {'(Z to A)'}</option>
                            </select>
                        </div>
                        <div className={style['product-cards']}>
                            {products.slice(0, showCount).map((product, index) => {
                                const { _id, Artisan_Title, Hero_img, Artisan_Description, Product_Division, Product_District } = product;
                                return (
                                    <Link to={`/know-the-craft/${_id}`} key={_id}>
                                        <KnowCraftCard
                                            image={Hero_img}
                                            title={Artisan_Title}
                                            desc={Artisan_Description}
                                            location={`${Product_District}, ${Product_Division}`}
                                        // rating={4}
                                        // productName={productName}
                                        // location={`${district}, ${division}`}
                                        // price={`${price} Tk`}
                                        />
                                    </Link>
                                );
                            })}

                        </div>
                        {showCount < productCount && (
                            <Button text="Load more" change={()=>{
                                setShowCount(prev => prev + perPage);
                            }}/>
                        )}
                    </div>
                </div>
            </div>
            {messageset && <Messaging closemessage={closemessage} />}
            <Footer />
        </>
    );
}