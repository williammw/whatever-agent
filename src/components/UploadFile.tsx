import React, { useState, useEffect } from 'react';
import useApiClient from '../hooks/useApiClient';
const UploadFile = () => {
  const [file, setFile] = useState(null);
  const apiClient = useApiClient();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/upload-image-r2/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;