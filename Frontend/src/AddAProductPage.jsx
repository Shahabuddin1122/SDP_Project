import { useRef,useState} from "react";
import axios from "axios";
import styles from "./AddAProductPage.module.css";
import LoginNav from "./Components/LoginNav";
import Footer from "./Components/Footer";

const AddAProductPage = () => {

    const inputRef = useRef(null)
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const [img,setimg] = useState("")
    const [img1,setimg1] = useState("")
    const [img2,setimg2] = useState("")
    const [prp,setDataToSend] = useState("")

    // const { length, width, height, diameter } = data.size.dimension;

    const imagebase64 = async (file)=>{
        const reader= new FileReader()
        await reader.readAsDataURL(file)
        const data = new Promise((resolve,reject)=>{
            reader.onload = ()=> resolve(reader.result)
            reader.onerror = (err)=> reject(err)
        })
        return data
    }

    

    const categories = [
      "Cap/Hat/Pagri",
      "Mufler/Scurf",
      "Kurta/Punjabi",
      "Fotua/Salware Kameez",
      "Saree",
      "Pant/Pajama",
      "Lungi",
      "Footwear",
      "Bags",
      "Mats and Rugs",
      "Beadsheets and Katha",
      "Flower Vase",
      "Pottery",
      "Utensils",
      "Jewelry",
      "Furniture",
      "Musical Instrument",
      "Painting",
      "Home Decor",
      "WoodBlock Printing",
      "Conch Shell Craft"
  ];

  const others = [
      "XXS",
      "XS",  
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "none",
  ];

    const handleChange = async (e) => {
        const files = e.target.files[0];
        const image = await imagebase64(files)
        console.log(image)
        setimg(files);
        //setData((prevData) => ({ ...prevData, Hero_img: image }))
    };
    const handleChange1 = async (e) => {
        const files = e.target.files[0];
        const image = await imagebase64(files)
        console.log(image)
        setimg1(files);
        //setData((prevData) => ({ ...prevData, Making: image }))
    };
    const handleChange2 = async (e) => {
        const files = e.target.files[0];
        const image = await imagebase64(files)
        console.log(image)
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
        productName: '',
        price: '',
        storedQuantity: '',
        district: '',
        division: '',
        description: '',
        category: '',
        // size: '' ,
        size: {
          dimension: [
            { length: '', width: '', height: '', diameter: '' },
            
          ],
          other: [], // Array to store multiple other sizes
        },
      //   size: {
      //     dimension: {
      //         length: '',
      //         width: '',
      //         height: '',
      //         diameter: '',
      //     },
      //     other: [],
      // },
        color: []
    });

    

  //   const ChangeHandle = (e) => {
  //     const { name, value } = e.target;
  
  //     if (name !== 'length' && name !== 'width' && name !== 'height' && name !== 'diameter' && name !== 'other') {
  //         setData((prevData) => ({ ...prevData, [name]: value }));
  //     } else {
  //         if (name === 'other') {
  //             setData((prevData) => ({
  //                 ...prevData,
  //                 size: {
  //                     ...prevData.size,
  //                     other: [...prevData.size.other, value]
  //                 }
  //             }));
  //         } else {
  //             setData((prevData) => ({
  //                 ...prevData,
  //                 size: {
  //                     ...prevData.size,
  //                     dimention: {
  //                         ...prevData.size.dimention,
  //                         [name]: value
  //                     }
  //                 }
  //             }));
  //         }
  //     }
  // };
  
  const handleColorChange = (e) => {
    const { value } = e.target;
    setData((prevData) => ({ ...prevData, color: [...prevData.color, value] }));
  };

  const handleSizeChange = (e, index, sizeType) => {
    const { name, value } = e.target;
    setData((prevData) => {
      const newSizes = [...prevData.size.dimension];
      newSizes[index][name] = value;
      return { ...prevData, size: { ...prevData.size, dimension: newSizes } };
    });
  };


  const handleOtherSizeChange = (e) => {
    const { value } = e.target;
    setData((prevData) => ({ ...prevData, size: { ...prevData.size, other: [...prevData.size.other, value] } }));
  };
    const ChangeHandle = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const DataToSend = new FormData();
    const StoreDatabase = async () => {
        try {
            const id = sessionStorage.getItem("seller_id");
            DataToSend.append('sellerId',id);
            DataToSend.append('productName',data.productName);
            DataToSend.append('price',data.price);
            DataToSend.append('storedQuantity',data.storedQuantity);
            DataToSend.append('district',data.district);
            DataToSend.append('division',data.division);
            DataToSend.append('description',data.description);
            DataToSend.append('category',data.category);
            // DataToSend.append('size',data.size);
            // DataToSend.append('size.dimention.length', data.size.dimention.length);
            // DataToSend.append('size.dimention.width', data.size.dimention.width);
            // DataToSend.append('size.dimention.height', data.size.dimention.height);
            // DataToSend.append('size.dimention.diameter', data.size.dimention.diameter);
            // if (data.size.other) {
            //   data.size.other.forEach((size) => {
            //       DataToSend.append(`size.other`, size);
            //   });
            // }
            DataToSend.append('color',data.color);
            DataToSend.append('Product_img1',img);
            DataToSend.append('Product_img2',img1);
            DataToSend.append('Product_img3',img2);
            setDataToSend(DataToSend);
            for (const [key, value] of prp.entries()) {
                console.log(key + ": " + value);
              }
          const config = {
            method: 'post',
            url: 'https://heritage-u8vo.onrender.com/addproduct',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: prp, // No need to use JSON.stringify() with Axios
          };
      
          // Send the request using Axios
          const response = await axios(config);

      
          if (response.status == 200) {
            alert('Data stored successfully');
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
    <div className={styles.addAProductPage}>
      <button className={styles.save} type="submit" onClick={StoreDatabase}>
        <div className={styles.button}>Save</div>
      </button>
      <div className={styles.pricing}>
        <div className={styles.price}>
          <div className={styles.formelementstitle}>Label</div>
          <input
            className={styles.input}
            name="price"
            id="price"
            value={data.price}
            placeholder="e.g. 100"
            type="text"
            onChange={ChangeHandle}
          />
        </div>
        <div className={styles.pricing1}>
          <span>Pricing</span>
          <span className={styles.span}>*</span>
        </div>
        <div className={styles.taka}>
          <div className={styles.taka1}>Taka</div>
        </div>
      </div>
      <div className={styles.right}>
                    <div className={styles.text}>
                        <h3>PRODUCT IMAGE</h3>
                        <p>Here you upload images of product.You are allowed to upload atleast 3 images for a product</p>
                    </div>
                    <div className={styles.image}>
                        <div className={styles.inner}>
                           <div className={styles.up} onClick={imageClick}>
                                <input
                                    name="img"
                                    className={styles.imgbox}
                                    type="file"
                                    ref={inputRef}
                                    
                                    onChange={handleChange}
                                />
                                <div className={styles.pic}>
                                    {img? <img src={URL.createObjectURL(img)} alt=''  />  :<><p>Product Image 1</p><i className="fa-solid fa-circle-plus"></i></>}
                                </div>
                            </div>
                            <div className={styles.down}>
                                <div className={styles.left2} onClick={imageClick1}>
                                    <input
                                        name="img"
                                        className={styles.imgbox}
                                        type="file"
                                        ref={inputRef1}
                                        
                                        onChange={handleChange1}
                                    />
                                    <div className={styles.pic}>
                                        {img1? <img src={URL.createObjectURL(img1)} alt=''  />  :<><p>Product Image 2</p><i className="fa-solid fa-circle-plus"></i></>}
                                    </div>
                                </div>
                                <div className={styles.right2} onClick={imageClick2}>
                                    <input
                                        name="img"
                                        className={styles.imgbox}
                                        type="file"
                                        ref={inputRef2}
                                        
                                        onChange={handleChange2}
                                    />
                                    <div className={styles.pic}>
                                        {img2? <img src={URL.createObjectURL(img2)} alt=''  />  :<><p>Product Image 3</p><i className="fa-solid fa-circle-plus"></i></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.note}>
                        <h2>Note</h2>
                        <p>Image can be uploaded in any dimension but recommend to upload 512x512 & size must be less than 250MB</p>
                    </div>
                </div>
      <div className={styles.headerBanner}>
        <img
          className={styles.handicraft768x4321Icon}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701184335/lug3widwpklaochcqw4a.png"
        />
        <div className={styles.header}>
          <b className={styles.productList}>Add a product</b>
          <div className={styles.addYourCrafts}>
            Add your crafts to sell with us
          </div>
        </div>
      </div>
      <div className={styles.stContainer}>
        <div className={styles.description}>
          <div className={styles.description1}>
            <div className={styles.productName}>
              <div className={styles.formelementstitle1}>
                <span>Product name</span>
                <span className={styles.span}>*</span>
              </div>
              <input
                className={styles.input}
                name="productName"
                id="p_name"
                value={data.productName}
                placeholder="e.g. Dhakaia Benarashi Sharee"
                type="text"
                onChange={ChangeHandle}
              />
            </div>
            <div className={styles.productName}>
              <div className={styles.formelementstitle1}>
                <span>Quantity You Want to Add</span>
                <span className={styles.span}>*</span>
              </div>
              <input
                className={styles.input}
                name="storedQuantity"
                id="p_name"
                value={data.storedQuantity}
                placeholder="e.g. 100"
                type="text"
                onChange={ChangeHandle}
              />
            </div>
            <div className={styles.productName}>
              <div className={styles.formelementstitle1}>
                <span>Short description</span>
                <span className={styles.span}>*</span>
              </div>
              <input
                className={styles.input2}
                name="description"
                id="description"
                value={data.description}
                placeholder="Aa"
                type="text"
                onChange={ChangeHandle}
              />
            </div>
            <div className={styles.categories}>
              <div className={styles.categories1}>
                <span>Categories</span>
                <span className={styles.span}>*</span>
              </div>
              <select
                id="categories"
                name="category"
                placeholder=""
                value={data.category}
                onChange={ChangeHandle}
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <b className={styles.description3}>Description</b>
        </div>
        <div className={styles.characteristics}>
          <b className={styles.description3}>
            Characteristics
          </b>
          <div className={styles.color}>
            <div className={styles.productName}>
              <div className={styles.formelementstitle1}>
                Color
              </div>
              <input
                className={styles.input}
                name="color"
                id="color"
                value={data.color}
                placeholder="e.g. Red"
                type="text"
                onChange={ChangeHandle}
                // onChange={handleColorChange}
              />
            </div>
            
          </div>
          
          {/* <div className={styles.color2}>
            <div className={styles.elementsfilterSectiontitle1}>
              <div className={styles.categories2}>Size in Dimensions
              </div>
              <img
                className={styles.iconchevronUp}
                alt=""
                src="./images/iconchevronup3.svg"
              />
            </div>
            
                <div className={styles.elementsswatchesgroupbutton}>
                
                    <div className={styles.hello}>
                      <input
                        className={styles.input}
                        name="length"
                        id="length"
                        value={data.size.dimension.length}
                        placeholder="Length in cm"
                        type="text"
                        onChange={ChangeHandle}
                      />
                    </div>
                  <div className={styles.hello}>
                      <input
                        className={styles.input}
                        name="width"
                        id="width"
                        value={data.size.dimension.width}
                        placeholder="Width in cm"
                        type="text"
                        onChange={ChangeHandle}
                      />
                    </div>
                </div>
            <div className={styles.elementsswatchesbutton}>
              <div className={styles.elementsswatchesgroupbuttonParent}>
                <div className={styles.elementsswatchesgroupbutton}>
                  <div className={styles.hello}>
                      <input
                        className={styles.input}
                        name="height"
                        id="height"
                        value={data.size.dimension.height}
                        placeholder="Height in cm"
                        type="text"
                        onChange={ChangeHandle}
                      />
                  </div>
                  <div className={styles.hello}>
                      <input
                        className={styles.input}
                        name="diameter"
                        id="diameter"
                        value={data.size.dimension.diameter}
                        placeholder="Diameter in cm"
                        type="text"
                        onChange={ChangeHandle}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.color3}>
            <div className={styles.productName}>
              <div className={styles.formelementstitle1}>Other Sizes</div>
              <select
                id="size"
                name="size"
                placeholder=""
                value={data.size}
                onChange={ChangeHandle}
              >
                <option value="" disabled>Select a size</option>
                {others.map((size, index) => (
                <option key={index} value={size}>
                {size}
                </option>
                ))}
              </select>
            </div>
            
          </div> */}
        </div>
        <div className={styles.location}>
          <div className={styles.location1}>
            <div className={styles.productName}>
              <div className={styles.formelementstitle1}>
                <span>Division</span>
                <span className={styles.span}>*</span>
              </div>
              <input
                className={styles.input}
                name="division"
                id="division"
                value={data.division}
                placeholder="e.g. Dhaka"
                type="text"
                onChange={ChangeHandle}
              />
            </div>
            <div className={styles.productName}>
              <div className={styles.formelementstitle1}>
                <span>District</span>
                <span className={styles.span}>*</span>
              </div>
              <input
                className={styles.input}
                name="district"
                id="district"
                value={data.district}
                placeholder="e.g. Faridpur"
                type="text"
                onChange={ChangeHandle}
              />
            </div>
          </div>
          <b className={styles.description2}>Location</b>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  );
};

export default AddAProductPage;
