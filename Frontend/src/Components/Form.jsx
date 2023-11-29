import { useState, useEffect } from 'react';
import axios from "axios";
import styles from "./Form.module.css";
import Button from './Button';
import PassChangeVerify from '../PassChangeVerify';



const EditableInput = ({ defaultValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const user = sessionStorage.getItem('buyer_id');
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleSave = () => {
    // Send the updated data to the server
    onSave(value);
    setIsEditing(false);
    axios.post(`https://heritage-u8vo.onrender.com/notifications`,{
      senderId: user,
      receiverId: user,
      notificationDescription: ' Changed your Profile'
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.error(err);
    })
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
        />
        
        { <button onClick={handleSave} className={styles.edit}>Save</button> }
        </div>
      ) : (
       <div>
        <div
          className={styles.inputValue}
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
  const buyerId = sessionStorage.getItem("buyer_id");
  const [showPassword, setShowPassword] = useState(false);

  const [auth, setAuth] = useState(false);
  const [code1, setCode] = useState(0);

  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    axios.get(`https://heritage-u8vo.onrender.com/buyer_profile/${buyerId}`)
      .then((response) => {
        setData(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, [buyerId]);

  const email = data.email;


  const handleSaveData = (fieldName, updatedValue) => {

    const newData = { [fieldName]: updatedValue };
    

    setIsSaving(true);

    axios.put(`https://heritage-u8vo.onrender.com/buyer_profile/${buyerId}`, newData)
      .then((response) => {
        setIsSaving(false);
        setData(response.data);
      })
      .catch((error) => {
        setIsSaving(false);
        console.error(error);
      });
  };

const closemodel = () => {
    setAuth(false);
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

          console.log(email);
            const verify_code = await axios.post(`https://heritage-u8vo.onrender.com/verify2/${email}`, {
                
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCode(verify_code.data.data);
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
            if (verify_code.status !== 200) {
                alert('Error sending verification code');
                closemodel();
            }
        } catch (error) {
            console.error('Error:', error);
            console.error('Registration failed(catch at registration)');
        }
    };

  return (

    <>
    {auth && <PassChangeVerify closemodel={closemodel} data1={code1} mail={email} />}
    <div className={styles.form}>
      <div className={styles.changePassButton}>
        <Button 
          text="Change Password"
           type='submit'
          change={()=>{
            
            setAuth(true);
            console.log('Password change initiated');

            handleSubmit({ preventDefault: () => {} }); 
          }
          }

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
