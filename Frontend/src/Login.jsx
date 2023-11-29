import React, { useState } from 'react';
import Checkbox from './Components/Checkbox';
import style from './login.module.css';
import {useNavigate} from 'react-router-dom';
import Button from './Components/Button';


const LogIn = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [id,setid] = useState("");
    const navigate= useNavigate();

    const changeEmail = (event) =>{
        setEmail(event.target.value);
        console.log(event.target.value);
    }
    const changePassword = (event) =>{
        setPassword(event.target.value);
        console.log(event.target.value);
    }

    const formSubmit = async (event) => {
        event.preventDefault();
      
        try {
          const response = await fetch('https://heritage-u8vo.onrender.com/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          
          if (response.ok) {
            // User is authenticated, you can redirect or perform other actions here
            const data = await response.json();
            setid(data.id);
            sessionStorage.setItem("buyer_id",data.id);
            //console.log("using hook: "+id);
            console.log('Login successful');
            alert('Login successful');
            navigate('/product-listing'); 
          } else {
            // Authentication failed
            alert('Login failed');
            console.log('Login failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };
      

    return (
        <div className={style.container}>
            
            <div className={style['body-wrapper']}>
                <div className={style.wrapper}>
                    <div className={style.title}>
                        <div className={style.heading}>
                            <div className={style.logo}>
                                <img src="https://res.cloudinary.com/dkotituzn/image/upload/v1701181973/oi3hbp6e9isxhlgmg5nc.png" alt="Logo" />
                            </div>
                            <h2 className={`${style['text-color']} ${style['font-family-header']} ${style['text-alignment']}`}>Welcome</h2>
                            <span className={`${style['text-color']} ${style['text-alignment']}`}>
                                To keep connected with us please Login
                            </span>
                        </div>
                        <p className={`${style['text-color']} ${style['text-alignment']}`}>Not have any account?</p>
                        {/* <button className={style.button} onClick={()=>navigate(`registration`)}>Sign up</button> */}
                        <Button 
                            text="Sign up"
                            change={()=>navigate('/registration')}
                        />
                    </div>
                    <form onSubmit={formSubmit} className={style.input}>
                        <h1 className={style['text-alignment']}>User Login</h1>
                        <div className={style.textboxes}>
                            <input
                                type="text"
                                placeholder="Enter your Email"
                                onChange={changeEmail}
                                value={email}
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                onChange={changePassword}
                                value={password}
                            />
                            { /*<Checkbox name="Remember me"/> */}
                         </div>
                        <div className={style.buttons}>
                            {/* <button type='submit' className={style.button}>Log in</button> */}
                            <Button
                                type='submit'
                                text='Log in'
                            />
                            {/* <button className={style.button}>Forget password</button> */}
                            <Button 
                                text="Forget password" 
                                change={()=>navigate('/sendmail')}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
