import React, { useEffect, useState } from "react";
import style from './Authentication.module.css'
import Button from './Components/Button.jsx'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Authentication = (props) => {
    
    const [code, setCode] = useState("");
    const closemodel = props.closemodel;
    const data1 = props.data1;
    const formDataToSend = props.formDataToSend;
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        }
    }, [])
    useEffect(() => {
        // Perform actions when formDataToSend changes
        // You can log it or do something else here
        console.log("formDataToSend in Authentication:", formDataToSend);
        
    }, [formDataToSend]);
    
    const changeCode = (event) => {
        setCode(event.target.value);
    }

    const codesubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("React_auth: " + data1);
            console.log("React_auth: " + code);
            for (const pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            if (code == data1) {
                const response = await axios.post('https://heritage-u8vo.onrender.com/register', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response.status);

                if (response.status === 201) {
                    console.log('Registration successful');
                    alert("Registration Successful");
                    navigate('/login');
                }
                else if(response.status === 400){
                    closemodel();
                    alert("User with this email already exists");
                    
                }
                else {
                    console.error('Registration failed');
                }
            } else {
                closemodel();
                alert("Wrong Code given");
            }
        } catch (error) {
            console.error('Error:', error);
            console.error('Registration failed(catch at Auth)');
        }
    }

    return (
        <div className={style.back}>
            <div className={style.container}>
                <button className={style.bt} onClick={closemodel}>X</button>
                <div className={style.inner}>
                    <div className={style.image}>
                        <img src="../images/384165997_332969559130939_1111385360839973004_n.png" alt="" />
                    </div>
                    <h2>User Authentication</h2>
                    <p>We have sent a verification code to your email</p>
                    <form onSubmit={codesubmit}>
                        <div className={style.box}>
                            <input
                                type="text"
                                placeholder="Authentication Code"
                                onChange={changeCode}
                                value={code}
                            />
                        </div>
                        <Button text="Submit" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Authentication;
