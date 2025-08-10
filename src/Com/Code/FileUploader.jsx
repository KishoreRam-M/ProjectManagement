import React, { useState } from 'react';
import api from '../../Api/axiosInstace';
const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const items = event.dataTransfer.items;
    const fileList = [];

    const traverseFileTree = async (item, path = "") => {
      return new Promise((resolve) => {
        if (item.isFile) {
          item.file((file) => {
            file.relativePath = path + file.name;
            fileList.push(file);
            resolve();
          });
        } else if (item.isDirectory) {
          const dirReader = item.createReader();
          dirReader.readEntries(async (entries) => {
            for (const entry of entries) {
              await traverseFileTree(entry, path + item.name + "/");
            }
            resolve();
          });
        }
      });
    };

    for (let i = 0; i < items.length; i++) {
      const entry = items[i].webkitGetAsEntry();
      if (entry) {
        await traverseFileTree(entry);
      }
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files', file, file.relativePath);
    });

    api
      .post('http://localhost:8080/api/files/upload', formData)
      .then((res) => alert(res.data))
      .catch((err) => alert('Upload failed',err));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      className={`border-2 rounded-xl text-center p-10 transition-colors duration-300 ${
        isDragging
          ? 'bg-gray-800 text-blue-400 border-blue-500'
          : 'bg-gray-900 text-white border-gray-700'
      }`}
    >
      <p className="text-xl font-semibold">🗂️ Drag & Drop Folder or Files Here</p>
      <p className="text-gray-400 mt-2">Only files from your computer are accepted</p>
    </div>
  );
};

export default FileUploader;
