import { useState } from 'react';
import axios from "axios";
import styles from "./SendMail.module.css";
// import {useNavigate} from 'react-router-dom';
import PassChangeVerifySeller from './PassChangeVerifySeller';

const SendMailSeller = () => {
    
  const [auth, setAuth] = useState(false); // State for controlling the authentication page
  const [code1, setCode] = useState(0);
  // const [formData, setFormData] = useState({});
  const [email, setEmail] = useState("");
  // const navigate = useNavigate();

  const closemodel = () => {
    setAuth(false);
};

console.log(email);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      alert('Please enter your email.');
      return;
    }
    
    axios.post(`https://heritage-u8vo.onrender.com/matchemailseller`, { email }) // Send the email value in the request
      .then((response) => {
        // console.log("mail sent to backend");
        // if (response.data.status === "Success") {
            // setFormData({ email });
        
            setAuth(true);
            // console.log('Password change initiated');
            setCode(response.data.data);
            // console.log(code1);
      
                  if (response.status !== 200) {
                      alert('Error sending verification code');
                      closemodel();
                  }
              //  else {
              //     // console.error('Error:', error);
              //     console.log('password change failed(catch at registration)');
              // }
        } 
        // else {
        //   alert("password change failed else part");
        // }
      // }
      )
      .catch((err) => {
        // if (err.response.data.status == "User does not exist.") {
          alert("User does not exist.");
          // console.log("response nai");
          console.error('Error:', err);
        // } else {
        //   console.error("OTP already sent to the email address");
        // }
      });
  };




  return (
    <>
     {auth && <PassChangeVerifySeller closemodel={closemodel} data1={code1} mail={email} />}
    
    <div className={styles.forgotpass}>
      <div className={styles.newPassword}>{`Forgot Password? `}</div>
      <div className={styles.newPasswordInput}>{`Provide Your Email Here. The verification code will be sent to your
        E-mail, please check it. `}</div>
        
      <form onSubmit={handleSubmit}>
      <input
        className={styles.reTypePasswordInput}
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-required="true"
      />
      
      <button className={styles.verifyButton} id="change_pass_button" type='submit'>
        <div className={styles.button}>Submit</div>
      </button>
      </form>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <img className={styles.groupItem} alt="" src="https://res.cloudinary.com/dkotituzn/image/upload/v1701193936/qgxprqtbdiulv7bpbz06.jpg" />
        <img
          className={styles.screenshot202309081712032}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701181973/oi3hbp6e9isxhlgmg5nc.png"
        />
      </div>
    </div>
    </>
  );
};

export default SendMailSeller;
