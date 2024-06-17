import React, { useState, useEffect } from 'react';
import useApiClient from '../hooks/useApiClient';

const FileList = () => {
  const [files, setFiles] = useState<any[]>([]);
  const apiClient = useApiClient();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await apiClient.get('/list-objects/');
        setFiles(response.data.objects || []);
      } catch (error) {
        console.error('Error fetching files', error);
      }
    };

    fetchFiles();
  }, [apiClient]); // Only run once when apiClient is initialized

  const togglePublicStatus = async (fileId, isPublic) => {
    try {
      await apiClient.post('/toggle-public-status/', { file_id: fileId, is_public: isPublic });
      setFiles(files.map(file => file.id === fileId ? { ...file, is_public: isPublic } : file));
    } catch (error) {
      console.error('Error updating public status', error);
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.filename}</a>
            <button onClick={() => togglePublicStatus(file.id, !file.is_public)}>
              {file.is_public ? 'Make Private' : 'Make Public'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;