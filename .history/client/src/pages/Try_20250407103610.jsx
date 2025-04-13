import React, { useState } from 'react';
import { postAuthStore } from '../store/image';

const FileUpload = () => {
  const [image, setImage] = useState(null);
  const {postImage,images} = postAuthStore()
  // Handle the file change
  const handleFileChange = (e) => {
    // Get the selected file from the input
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file in state
    }
  };

  // Submit handler for the image (for example, to upload)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      try {
       await postImage(image)
       console.log(images)

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
