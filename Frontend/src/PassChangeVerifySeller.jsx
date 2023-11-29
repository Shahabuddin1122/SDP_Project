import { useEffect, useState } from "react";
import style from './Authentication.module.css'
import Button from './Components/Button.jsx'
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const PassChangeVerifySeller = (props)=>{
    const [code,setcode] = useState("");
    const closemodel = props.closemodel;
    const data1 = props.data1;
    const email = props.mail;
    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        return ()=>{
            document.body.style.overflowY = "scroll";
        }
    },[])
    
    localStorage.setItem('email', email);

    useEffect(() => {
        console.log("auth page:", email);
    }, [email]);

    const navigate = useNavigate();
    const changeCode = (event)=>{
        setcode(event.target.value);
    }
    const codesubmit = async (event)=>{
        event.preventDefault();
        try {
            console.log("React_auth: "+ data1);
            console.log("React_auth: "+ code);
            
            if(code == data1){
 
                    console.log('code matching successful');
                    alert("You are authentic");
                    navigate('/forgotpass_seller');
                
            }
            else {
                closemodel();
                alert("Wrong Code given");
            }
            
        } catch (error) {
            console.error('Error:', error);
            console.error('Registration failed(catch at Auth)');
        }
        
    }
    return (
        <>
            <div className={style.back}>
                <div className={style.container}>
                    <button className={style.bt} onClick={closemodel}>X</button>
                    <div className={style.inner}>
                        <div className={style.image}>
                            <img src="https://res.cloudinary.com/dkotituzn/image/upload/v1701181973/oi3hbp6e9isxhlgmg5nc.png" alt="" />
                        </div>
                        <h2>User Authentication</h2>
                        <p>We have send verification code to your gmail</p>
                        <form onSubmit={codesubmit}>
                            <div className={style.box}>
                                <input 
                                    type="text"
                                    placeholder="Authentication Code"
                                    onChange={changeCode}
                                    value={code}
                                        />
                            </div>
                            <Button text="Submit" type="submit"/>
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PassChangeVerifySeller;