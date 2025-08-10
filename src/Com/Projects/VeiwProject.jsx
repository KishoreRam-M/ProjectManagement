import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../../CodeEditor';
import api from '../../Api/axiosInstace';


function ViewProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [ code , setCode ]= useState(null);

  const getProject = async () => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const getFiles = async () => {
    try {
      const response = await api.get('/files/list');
      setFiles(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const uploadFile = async (selectedFile) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      await getFiles();
    } catch (error) {
      console.log('Error uploading the file', error);
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (file) => {
    try {
      const response = await api.delete('/files/delete', {
        params: { filename: file },
      });
      setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
      console.log('File deleted:', response.data);
    } catch (error) {
      console.error('Error deleting the file:', error);
    }
  };

  useEffect(() => {
    getProject();
    getFiles();
  }, [projectId]);


  const readFile = async (filename)=> {
    const resposne =  await api.get('files/read',
      {
        params:{filename:filename}
      }
    );
    console.log(resposne.data)
    setCode(resposne.data);
    

  }



  return (
    <div className="min-h-screen bg-base p-4 sm:p-6 font-sans">
      {/* Header */}
      <div className="bg-elevated rounded-2xl p-6 mb-6 border-2 border-default">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">{project?.name || ''}</h1>
            <div className="flex items-center mt-2 text-secondary">
              <div className="w-6 h-6 bg-white rounded-full mr-3"></div>
              <span className="text-base sm:text-lg">{project?.description || ''}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="w-20 h-8 bg-muted rounded hover:bg-muted/80 transition"
              aria-label="Edit project"
            >
              Edit
            </button>
            <button
              className="w-20 h-8 bg-muted rounded hover:bg-muted/80 transition"
              aria-label="Share project"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Files */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-elevated rounded-xl border border-default flex flex-col">
            <div className="p-4 border-b border-default rounded-t-xl bg-elevated">
              <h3 className="text-2xl font-bold text-primary">Files:</h3>
            </div>
            <div className="p-4 overflow-y-auto max-h-[350px] sm:max-h-[450px]">
              {files.length === 0 ? (
                <p className="text-secondary">No files uploaded yet.</p>
              ) : (
                files.map((file) => (
                  <div
                    key={file}
                    className="flex items-center justify-between py-2 border-b border-default last:border-none"
                  >
                    <span className="text-lg text-primary truncate max-w-[70%]"> <button onClick={(e)=>readFile(file)}>  {file} </button></span>
                    <button
                      className="w-7 h-7 bg-muted rounded cursor-pointer flex items-center justify-center hover:bg-red-600 transition"
                      onClick={() => deleteFile(file)}
                      title={`Delete ${file}`}
                      aria-label={`Delete ${file}`}
                    >
                      D
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Upload button inside files panel for smaller screens */}
            <div className="p-4 border-t border-default flex justify-end sm:hidden">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) =>
                  e.target.files.length && uploadFile(e.target.files[0])
                }
              />
              <button
                className="bg-gradient-to-b from-blue-500 to-blue-700 px-5 py-2 rounded-xl border border-default flex items-center gap-2"
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
              >
                <span className="text-white font-bold text-base">
                  {uploading ? 'Uploading...' : 'Upload'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Code Editor */}
        <div className="lg:col-span-8 flex flex-col">
          <CodeEditor c={code}/>
        </div>

        {/* Upload button on large screens */}
        <div className="hidden sm:flex justify-end mt-4 lg:col-span-8">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) =>
              e.target.files.length && uploadFile(e.target.files[0])
            }
          />
          <button
            className="bg-gradient-to-b from-blue-500 to-blue-700 px-6 py-3 rounded-xl border border-default flex items-center gap-3"
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
          >
            <span className="text-white text-xl font-bold">
              {uploading ? 'Uploading...' : 'Upload'}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Components Panel */}
        <div className="bg-elevated rounded-xl border-2 border-default p-6">
          <h3 className="text-2xl font-bold text-primary mb-4">Components</h3>
          <div className="bg-muted rounded-xl p-6">
            <h4 className="text-xl text-primary mb-4">Issue Tracker</h4>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-input rounded-lg p-4">
                <span className="text-primary text-lg">Zen mode timer</span>
              </div>
              <div className="bg-input rounded-lg p-4">
                <span className="text-primary text-lg">High</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-input rounded-lg p-4">
                <span className="text-primary text-lg">07/02/2027</span>
              </div>
              <div className="bg-input rounded-lg p-4">
                <span className="text-primary text-lg">UX feature</span>
              </div>
            </div>

            <div className="bg-input rounded-lg p-4 mb-6">
              <span className="text-primary text-lg">
                Allow users to set deep work intervals (Pomodoro-style).
              </span>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-4 rounded-full border border-base hover:opacity-90 transition">
              <span className="text-white text-xl">+ Create Issue</span>
            </button>
          </div>
        </div>

        {/* Details Panel */}
        <div className="bg-elevated rounded-xl border-2 border-default p-6">
          <h3 className="text-2xl font-bold text-primary mb-4">Details</h3>
          <div className="space-y-4 mb-6">
            <p className="text-primary text-lg">Category : Project management tool</p>
            <p className="text-primary text-lg">Owner : kishore ram</p>
            <p className="text-primary text-lg">Tags:</p>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-2 rounded-full text-white">
                react
              </span>
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-2 rounded-full text-white">
                Spring
              </span>
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-2 rounded-full text-white">
                Hibernate
              </span>
            </div>

            <p className="text-primary text-lg">Team Members:</p>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-input rounded-full flex items-center justify-center border border-base">
                <span className="text-white text-lg font-bold">K</span>
              </div>
              <div className="w-12 h-12 bg-input rounded-full flex items-center justify-center border border-base">
                <span className="text-white text-lg font-bold">T</span>
              </div>
              <div className="w-12 h-12 bg-input rounded-full flex items-center justify-center border border-base">
                <span className="text-white text-lg font-bold">M</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-bold text-primary mb-4">Issues:</h3>
        <div className="bg-elevated rounded-xl border-2 border-default p-6">
          <div className="space-y-4 text-primary text-lg leading-relaxed">
            <p>
              101, Add customizable Zen Mode timer, UX/Feature, High, Allow
              users to set deep work intervals (Pomodoro-style).
            </p>
            <p>
              102, Introduce AI-driven daily planner, AI Enhancement, Medium,
              Smartly schedule tasks based on context and workload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProject;
