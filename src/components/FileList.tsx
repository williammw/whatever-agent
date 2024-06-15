import React, { useState, useEffect } from 'react';
import useApiClient from '../hooks/useApiClient';


const FileList = () => {
  const [files, setFiles] = useState([]);
  const apiClient = useApiClient();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await apiClient.get('/list-objects/');
        setFiles(response.data.objects || []); // Ensure `response.data.objects` is correctly handled
      } catch (error) {
        console.error('Error fetching files', error);
      }
    };

    fetchFiles();
  }, [apiClient]);

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.filename}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;