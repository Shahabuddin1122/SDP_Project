import { useState, useEffect } from 'react';
// import { useCallback } from "react";
import axios from "axios";
import styles from "./Forgotpass.module.css";
import {useNavigate} from 'react-router-dom';

const Forgotpass = () => {
    
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = localStorage.getItem('email');
  const user = sessionStorage.getItem('buyer_id');
  useEffect(() => {
    console.log("reset pass page:", email);
}, [email]);

  const handleChange = () => {
    navigate('/buyer_profile');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      axios.put(`https://heritage-u8vo.onrender.com/forgotpass/${email}`, { password: newPassword })
          // password: newPassword,
        // )
        .then((response) => {
          if (response.data.Status === "Success") {
            console.log("Password reset successfully.");
            // toast.success("Password reset successfully.");
            navigate("/login");
          } else {
            console.log("Password reset failed:", response.data.Status);
          }
        })
        .catch((error) => {
          console.error("API request failed:", error);
        });

        axios.post(`https://heritage-u8vo.onrender.com/notifications`,{
          senderId: user,
          receiverId: user,
          notificationDescription: ' Changed your Password'
        })
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.error(err);
        })

    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className={styles.forgotpass}>
      <div className={styles.newPassword}>{`New Password : `}</div>
      <input
        className={styles.newPasswordInput}
        name="new_pass_input"
        placeholder="Enter your password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <div className={styles.reTypePassword}>{`Re-type Password : `}</div>
      <input
        className={styles.reTypePasswordInput}
        name="re_type_pass_input"
        placeholder="Re-type Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className={styles.cancleButton} id="cancel_button" onClick={handleChange}>
        <div className={styles.button}>Cancel</div>
      </button>
      <button className={styles.verifyButton} id="change_pass_button" type='submit' onClick={handleSubmit}>
        <div className={styles.button}>Change</div>
      </button>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <img className={styles.groupItem} alt="" src="https://res.cloudinary.com/dkotituzn/image/upload/v1701194595/gmqn1zuptk08or1vx9dr.png" />
        <img
          className={styles.screenshot202309081712032}
          alt=""
          src="https://res.cloudinary.com/dkotituzn/image/upload/v1701181973/oi3hbp6e9isxhlgmg5nc.png"
        />
      </div>
      <div className={styles.forgotpassChild} />
      <div className={styles.credentialInfo}>
        <b className={styles.newCredentials}>NEW CREDENTIALS</b>
        <div className={styles.frame}>
          <div className={styles.frame1}>
            <img className={styles.frameChild} alt="" src="./images/group-9.svg" />
            <img className={styles.frameItem} alt="" src="./images/group-9.svg" />
          </div>
          <div className={styles.passwordMustBeContainer}>
            <span className={styles.passwordMustBeContainer1}>
              <p className={styles.passwordMustBe}>
                Password must be at least 8 characters long.
              </p>
              <p className={styles.passwordMustBe}>
                Password must contain at least one number or special character
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpass;
