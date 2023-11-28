// ProfilePictureChange.js
import { useState, useRef } from 'react';
import styles from './PPchange.module.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ProfilePictureChange = () => {
  const buyerId = sessionStorage.getItem("buyer_id");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate= useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
        // console.log(selectedImage)
      const formData = new FormData();
      formData.append('img', selectedImage);
    //   console.log(formData);
    formData.forEach((value, key) => {
        console.log(key, value);
      });

      // Use Axios to send the image to the backend
      axios.post(`https://heritage-u8vo.onrender.com/changepic/${buyerId}`, formData)
        .then(response => {
          // Handle the response from the server
          console.log('Server response:', response.data);
          alert('Your profile picture has been updated');
          navigate('/buyer_profile');
          // window.location.reload();
        })
        .catch(error => {
          // Handle errors
          console.error('Error uploading image:', error);
        });
    } else {
      console.error('No image selected for upload');
    }
  };

//   const openFileInput = () => {
//     fileInputRef.current.click();
//   };

  return (
    <div className={styles.profilePictureChange}>
      <h1>Profile Picture Change</h1>

      <div className={styles.imageContainer}>
        {selectedImage ? (
          <img src={URL.createObjectURL(selectedImage)} alt="Selected Profile" />
        ) : (
          <div className={styles.placeholder}>Select an Image</div>
        )}
      </div>

      <input
        className={styles.input}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        // className={styles.fileInput}
      />

      {/* <button onClick={openFileInput}>Choose File</button> */}
      <button className={styles.button} onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ProfilePictureChange;
