// src/components/FileUpload.js
import { useState } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
    // Perform further actions like uploading to a server if needed
  };

  return (
    <div className="flex items-center justify-center p-2 bg-gray-800 rounded-lg">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-600 text-white text-sm font-medium mx-2 px-4 py-2 rounded-md"
        >
          <span>{file.name}</span>
          {/* Implement a function to handle file removal */}
          <button className="ml-4">X</button>
        </div>
      ))}
      <label className="cursor-pointer">
        <span className="text-gray-400 hover:text-gray-300">+</span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
      </label>
    </div>
  );
};

export default FileUpload;
