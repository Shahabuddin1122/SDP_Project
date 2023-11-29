import React,{useEffect, useRef,useState} from "react";
import axios from "axios";
import style from "./Add_Know.module.css"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Input_box from "./Components/Input_box";
import Button from "./Components/Button"
import LoginNav from "./Components/LoginNav"
const Add_Know = ()=>{
    const inputRef = useRef(null)
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const [img,setimg] = useState("")
    const [img1,setimg1] = useState("")
    const [img2,setimg2] = useState("")
    const [prp,setDataToSend] = useState("")

    const imagebase64 = async (file)=>{
        const reader= new FileReader()
        await reader.readAsDataURL(file)
        const data = new Promise((resolve,reject)=>{
            reader.onload = ()=> resolve(reader.result)
            reader.onerror = (err)=> reject(err)
        })
        return data
    }
    const uploadImage = async (file)=>{
        const formdata = new FormData();
        formdata.append("Files",file)
        formdata.append("upload_preset","Know_Nav");
        axios.post("https://api.cloudinary.com/v1_1/dkotituzn/image/upload",formdata)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    const handleChange = async (e) => {
        const files = e.target.files[0];
        const image = await imagebase64(files)
        //console.log(image)
        setimg(files);
        //setData((prevData) => ({ ...prevData, Hero_img: image }))
    };
    const handleChange1 = async (e) => {
        const files = e.target.files[0];
        const image = await imagebase64(files)
        //console.log(image)
        setimg1(files);
        //setData((prevData) => ({ ...prevData, Making: image }))
    };
    const handleChange2 = async (e) => {
        const files = e.target.files[0];
        const image = await imagebase64(files)
        //console.log(image)
        setimg2(files);
        //setData((prevData) => ({ ...prevData, Front: image }))
    };
    const imageClick = ()=>{
        inputRef.current.click();
    }
    const imageClick1 = ()=>{
        inputRef1.current.click();
    }
    const imageClick2 = ()=>{
        inputRef2.current.click();
    }
    const [data, setData] = useState({
        Product_Type: '',
        Product_Division: '',
        Product_District: '',
        Artisan_Title: '',
        Artisan_Description: '',
        Artisan_History: '',
        How_it_made: '' /*,
        Hero_img: '',
        Making: '',
        Front: ''
        */
    });
    
    const callback1 = (data) => {
    setData((prevData) => ({ ...prevData, Product_Type: data }));
    };

    const callback2 = (data) => {
    setData((prevData) => ({ ...prevData, Product_Division: data }));
    };

    const callback3 = (data) => {
    setData((prevData) => ({ ...prevData, Product_District: data }));
    };

    const callback4 = (data) => {
    setData((prevData) => ({ ...prevData, Artisan_Title: data }));
    };
    const ChangeHandle = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    };






    const DataToSend = new FormData();
    const StoreDatabase = async () => {
        try {
            const id = sessionStorage.getItem("seller_id");
            DataToSend.append('SellerId',id);
            DataToSend.append('Product_Type',data.Product_Type);
            DataToSend.append('Product_District',data.Product_District);
            DataToSend.append('Product_Division',data.Product_Division);
            DataToSend.append('Artisan_Title',data.Artisan_Title);
            DataToSend.append('Artisan_Description',data.Artisan_Description);
            DataToSend.append('Artisan_History',data.Artisan_History);
            DataToSend.append('How_it_made',data.How_it_made);
            DataToSend.append('Hero_img',img);
            DataToSend.append('Making',img1);
            DataToSend.append('Front',img2);
            setDataToSend(DataToSend);
            for (const [key, value] of prp.entries()) {
                console.log(key + ": " + value);
              }
          const config = {
            method: 'post',
            url: 'https://heritage-u8vo.onrender.com/know_nav_seller',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: prp, // No need to use JSON.stringify() with Axios
          };
      
          // Send the request using Axios
          const response = await axios(config);

      
          if (response.status == 200) {
            alert('Data stored successfully');
            // You can perform additional actions after data is successfully stored
          } else {
            console.error('Failed to store data');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
      





    return (
        <>  
            <LoginNav />
            <div className={style.top}>
                <h1>Add your Artistry Product</h1>
                <p>Here you can add artistry by District</p>
            </div>
            <div className={style.main}>
                <div className={style.left}>
                    <div className={style.text}>
                        <h3>PRODUCT DETAILS</h3>
                        <p>Add product details from here</p>
                    </div>
                    <div className={style.form}>
                        <Input_box name="Product Type" placeholder="i.e Handmade Craft" callback={callback1}/>
                        <Input_box name="Product Division" placeholder="i.e Dhaka" callback={callback2}/>
                        <Input_box name="Product District" placeholder="i.e Gazipur" callback={callback3}/>
                        <Input_box name="Artisan Title" placeholder="Write here" callback={callback4}/>
                        <div className={style.type}>
                            <p>Artisan Description<span>*</span></p>
                            <textarea 
                                name="Artisan_Description"
                                placeholder=" Write here" 
                                value={data.Artisan_Description}
                                className={style.resize}
                                onChange={ChangeHandle}
                            />
                        </div>
                        <div className={style.type}>
                            <p>Artisan History<span>*</span></p>
                            <textarea 
                                name="Artisan_History"
                                value={data.Artisan_History}
                                placeholder=" Write here" 
                                className={style.resize}
                                onChange={ChangeHandle}
                            />
                        </div>
                        <div className={style.type}>
                            <p>How it is made</p>
                            <textarea 
                                name="How_it_made"
                                value={data.How_it_made}
                                placeholder=" Write here" 
                                className={style.resize}
                                onChange={ChangeHandle}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.text}>
                        <h3>PRODUCT IMAGE</h3>
                        <p>Here you upload images of product.You are allowed to upload atleast 3 images for a product</p>
                    </div>
                    <div className={style.image}>
                        <div className={style.inner}>







                            <div className={style.up} onClick={imageClick}>
                                <input
                                    name="img"
                                    className={style.imgbox}
                                    type="file"
                                    ref={inputRef}
                                    
                                    onChange={handleChange}
                                />
                                <div className={style.pic}>
                                    {img? <img src={URL.createObjectURL(img)} alt=''  />  :<><p>Hero Picture</p><i class="fa-solid fa-circle-plus"></i></>}
                                </div>
                            </div>







                            <div className={style.down}>
                                <div className={style.left2} onClick={imageClick1}>
                                    <input
                                        name="img"
                                        className={style.imgbox}
                                        type="file"
                                        ref={inputRef1}
                                        
                                        onChange={handleChange1}
                                    />
                                    <div className={style.pic}>
                                        {img1? <img src={URL.createObjectURL(img1)} alt=''  />  :<><p>Product Making</p><i class="fa-solid fa-circle-plus"></i></>}
                                    </div>
                                </div>
                                <div className={style.right2} onClick={imageClick2}>
                                    <input
                                        name="img"
                                        className={style.imgbox}
                                        type="file"
                                        ref={inputRef2}
                                        
                                        onChange={handleChange2}
                                    />
                                    <div className={style.pic}>
                                        {img2? <img src={URL.createObjectURL(img2)} alt=''  />  :<><p>Front View</p><i class="fa-solid fa-circle-plus"></i></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.note}>
                        <h2>Note</h2>
                        <p>Image can be uploaded in any dimension but recommend to upload 512x512 & size must be less than 250MB</p>
                    </div>
                    <div className={style.button}>
                        <button type="submit" onClick={StoreDatabase}>Add</button>
                    </div>
                </div>
            </div>

            <Footer/>
        
        </>
    )
}
export default Add_Know;