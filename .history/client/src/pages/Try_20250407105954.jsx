import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [image, setImage] = useState();
  // Handle the file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file in state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {

      try {
      const res=  await axios.post('http://localhost:5000/images/oneImage', { image })
       console.log(res.data)

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.log('No image selected');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange} // Update state with the selected file
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
