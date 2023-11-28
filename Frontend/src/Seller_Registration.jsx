import { useState,useRef } from 'react';
import Authentication from './Auth_seller.jsx';
import axios from 'axios';
import style from './Registration.module.css'; // Import your CSS module
import Button from './Components/Button';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [auth, setAuth] = useState(false);
    const [code1, setcode] = useState(0);
    const [prp,setformDataToSend] = useState("");
    const inputRef = useRef(null)
    const navigate = useNavigate();

    const btn = () => {
        setAuth(true);
    };

    const closemodel = () => {
        setAuth(false);
    };

    const nev = () => {
        navigate('/login');
    };
    const imageClick = ()=>{
        inputRef.current.click();
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        area: '',
        district: '',
        division: '',
        password: '',
        confirmPassword: ''
    });
    const [img,setimg] = useState("")
    const handleChange2 = (e) => {
        const files = e.target.files[0];
        const image = imagebase64(files);
        setimg(files);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const imagebase64 = async (file)=>{
        const reader= new FileReader()
        await reader.readAsDataURL(file)
        const data = new Promise((resolve,reject)=>{
            reader.onload = ()=> resolve(reader.result)
            reader.onerror = (err)=> reject(err)
        })
        return data
    }  
      
      










    const formDataToSend = new FormData();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('mobileNumber', formData.mobileNumber);
            formDataToSend.append('area', formData.area);
            formDataToSend.append('division', formData.division);
            formDataToSend.append('district', formData.district);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('confirmPassword', formData.confirmPassword);
            formDataToSend.append('img', img);
            setformDataToSend(formDataToSend);

            if (formData.email !== '') {
                if (formData.password === formData.confirmPassword) {
                    btn();
                } else {
                    alert('Password mismatched');
                }
            }

            const verify_code = await axios.post('https://heritage-u8vo.onrender.com/verify', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setcode(verify_code.data.data);

            if (verify_code.status !== 200) {
                alert('Error sending verification code');
                closemodel();
            }
        } catch (error) {
            console.error('Error:', error);
            console.error('Registration failed(catch at registration)');
        }
    };

    const divisions = [
        {
            name: 'Dhaka',
            districts: ["Dhaka", "Gazipur", "Tangail", "Narayanganj", "Manikganj", "Munshiganj", "Faridpur"],
        },
        {
            name: 'Chittagong',
            districts: ["Chittagong", "Cox's Bazar", "Feni","Bandarban", "Rangamati", "Khagrachari", "Chandpur","Noakhali", "Lakshmipur"],
        },
        {
            name: 'Rajshahi',
            districts: ["Rajshahi", "Bogra", "Pabna", "Natore", "Joypurhat", "Sirajganj"],
        },
        {
            name: 'Khulna',
            districts: ["Khulna", "Bagerhat", "Jessore", "Satkhira", "Magura", "Narail", "Khustia"],
        },
        {
            name: 'Barishal',
            districts: ["Barishal", "Bhola", "Patuakhali", "Pirojpur", "Jhalokati", "Barguna"],
        },
        {
            name: 'Sylhet',
            districts: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
        },
        {
            name: 'Rangpur',
            districts: ["Rangpur", "Dinajpur", "Kurigram", "Thakurgaon", "Lalmonirhat", "Panchagarh", "Nilphamari"],
        },
        {
            name: 'Mymensingh',
            districts: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
        }
        
    ];
    

    return (
        <>
            {auth && <Authentication closemodel={closemodel} data1={code1} formDataToSend={prp} />}

            <div className={style.middle2}>
                <div className={style.Middle}>
                    <div className={style.left}>
                        <img src="./images/shape.jpg" alt="" />
                        <h1>Welcome</h1>
                        <p>Join our largest Community</p>
                        <p>Already have an account?</p>
                        <Button text="Login" change={nev} />
                    </div>
                    <div className={style.right}>
                        <h2>Seller Register Now!</h2>
                        <p>Fill in the information carefully</p>
                        <form onSubmit={handleSubmit}>
                            <div className={style.form}>
                                <div className={style.leftForm}>
                                    <div>
                                        <input
                                            name="name"
                                            placeholder="Name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name="email"
                                            placeholder="Email"
                                            required
                                            type="text"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name="mobileNumber"
                                            placeholder="Number"
                                            type="text"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name="area"
                                            placeholder="Area"
                                            type="text"
                                            value={formData.area}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className={style.middle} onClick={imageClick}>
                                    <input
                                        name="img"
                                        className={style.imgbox}
                                        type="file"
                                        ref={inputRef}
                                       
                                        onChange={handleChange2}
                                    />
                                    <div className={style.pic}>
                                        {img? <img src={URL.createObjectURL(img)} alt=''  />          :<i className="fa-solid fa-cloud-arrow-up" style={{ transform: "translate(0%, 112%)" }}></i>}
                                    </div>
                                    
                                    
                                    
                                </div>
                                <div className={style.rightForm}>

                                    <div>
                                        <select
                                            name="division"
                                            value={formData.division}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Division</option>
                                            {divisions.map((division) => (
                                                <option key={division.name} value={division.name}>
                                                    {division.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {formData.division && (
                                        <div>
                                            <select
                                                name="district"
                                                value={formData.district}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select District</option>
                                                {divisions.find((div) => div.name === formData.division)?.districts.map(
                                                    (district) => (
                                                        <option key={district} value={district}>
                                                            {district}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    )}

                                    <div>
                                        <input
                                            name="password"
                                            placeholder="Password"
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            type="password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button text="Sign Up" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;
