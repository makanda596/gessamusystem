import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [image, setImage] = useState(null); // Make sure to initialize as null

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
      const formData = new FormData();
      formData.append('image', image); // Append the file to FormData

      try {
        const res = await axios.post('http://localhost:5000/images/oneImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data for file uploads
          },
        });
        console.log(res);
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
