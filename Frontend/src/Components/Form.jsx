// import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
// import { useCallback } from "react";
import axios from "axios";
import styles from "./Form.module.css";
// import {useNavigate} from 'react-router-dom';
import Button from './Button';
import PassChangeVerify from '../PassChangeVerify';


// eslint-disable-next-line react/prop-types
const EditableInput = ({ defaultValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // const handleBlur = () => {
  //   setIsEditing(false);
  // };

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleSave = () => {
    // Send the updated data to the server
    onSave(value);
    setIsEditing(false);
    window.location.reload();
  };

  return (
    <div className={styles.inputContainer}>
      {isEditing ? (
        <div>
        <input
          className={styles.input}
          value={value}
          onChange={handleChange}
          // onBlur={handleBlur}
        />
        
        { <button onClick={handleSave} className={styles.edit}>Save</button> }
        </div>
      ) : (
       <div>
        <div
          className={styles.inputValue}
          // onDoubleClick={handleDoubleClick}
        >
          {value}
        </div>
        <button onClick={handleDoubleClick} className={styles.edit}>
            Edit
           
          </button>
       
        </div>
      )}
    </div>
  );
};



const Form = () => {

  const [data, setData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  // const navigate= useNavigate();
  const buyerId = sessionStorage.getItem("buyer_id");
  const [showPassword, setShowPassword] = useState(false);
  // const [data, setData] = useState({ password: '' });

  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    axios.get(`http://localhost:3000/buyer_profile/${buyerId}`)
      .then((response) => {
        // console.log(response.data.email)
        setData(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, [buyerId]);

  const mail = data.email;


  const handleSaveData = (fieldName, updatedValue) => {
    // Send the updated data to the server
    const newData = { [fieldName]: updatedValue };
    

    setIsSaving(true);

    axios.put(`http://localhost:3000/buyer_profile/${buyerId}`, newData)
    // axios.put(`http://localhost:3000/buyer_profile`, newData)
      .then((response) => {
        setIsSaving(false);
        setData(response.data);
      })
      .catch((error) => {
        setIsSaving(false);
        console.error(error);
      });
  };


  return (

    <>
    { auth && <PassChangeVerify closemodel={closemodel} data1={code1} formData={formData}/>}
    <div className={styles.form}>
      <div className={styles.changePassButton}>
        <Button 
          text="Change Password" type='submit'
          // change={()=>navigate('/registration')}
      />
      </div>
      <div className={styles.information}>
        <div className={styles.password}>
          <h3>Password</h3>
          <div className={styles.rectangleParent}>
            <input
              className={styles.input}
              value={data.password}
              type={showPassword ? 'text' : 'password'}
              // type="password"
              // defaultValue="******"
            />

          <button className={styles.group} onClick={togglePasswordVisibility}>
            {showPassword ? (
              <i className="fas fa-eye"></i> 
              ) : (
              <i className="fas fa-eye-slash"></i> 
              )}
          </button>

          </div>
        </div>


        <div className={styles.division}>
          <h3>Division</h3>
          <div className={styles.rectangleGroup}>
             
             <EditableInput
              className={styles.divi}
              defaultValue={data.division}
              onSave={(updatedValue) => handleSaveData('division', updatedValue)}
            />
          </div>
        </div>


        <div className={styles.address}>
          <h3>District</h3>
          <div className={styles.rectangleContainer}>
            
            <EditableInput
              className={styles.khulna}
              defaultValue={data.district}
              onSave={(updatedValue) => handleSaveData('district', updatedValue)}
            />
          </div>
        </div>


        <div className={styles.area}>
          <h3>Area</h3>
          <div className={styles.groupDiv}>

            <EditableInput
              className={styles.frameInput}
              defaultValue={data.area}
              onSave={(updatedValue) => handleSaveData('area', updatedValue)}
            />
          </div>
        </div>


        <div className={styles.mobile}>
          <h3>Mobile Number</h3>
          <div className={styles.groupDiv}>

            <EditableInput
              className={styles.oyiboke}
              defaultValue={data.mobileNumber}
              onSave={(updatedValue) => handleSaveData('mobileNumber', updatedValue)}
            />
          </div>
        </div>


        <div className={styles.firstName}>
          <h3>Name</h3>
          <div className={styles.rectangleGroup}>

            <EditableInput
              className={styles.emmanuel}
              defaultValue={data.name}
              onSave={(updatedValue) => handleSaveData('name', updatedValue)}
            />
          </div>
        </div>


      </div>
    </div>
    </>
  );
};

export default Form;
