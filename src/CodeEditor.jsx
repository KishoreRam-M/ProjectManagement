import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  FiSave,
  FiClipboard,
  FiDownload,
  FiRefreshCw,
  FiCode,
  FiPlay,
} from "react-icons/fi";
import api from "./Api/axiosInstace";

const LOCAL_STORAGE_KEY = "saved_code";

const languageMap = {
  python: 71,
  java: 62,
  c: 50,
  cpp: 54,
};

const CodeEditor = ({ c }) => {
  const [filename, setFilename] = useState("Main.js");
  const [code, setCode] = useState("// Start coding...");
  const [language, setLanguage] = useState("java");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [editorInstance, setEditorInstance] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (c) {
      setCode(c);
      console.log("Initial code prop:", c);
    }
  }, [c]);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const response = await api.get("/files/list");
      if (Array.isArray(response.data)) {
        setFileList(response.data);
      } else {
        setFileList([]);
      }
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  const saveLocally = async (filename1, filecontent) => {
    try {
      const arr = Array.isArray(fileList) ? fileList : [];

      if (!arr.includes(filename1)) {
        const payload = { filename: filename1, content: filecontent };
        const response = await api.post("/files/create", payload);
        console.log("File created:", response.data);
        fetchFileList();
      } else {
        const response = await api.put("/files/update", {
          filename: filename1,
          content: filecontent,
        });
        console.log("File updated:", response.data);
      }
      setMessage("File saved successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving file:", error);
      setMessage("Failed to save file.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "code.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetEditor = () => {
    setCode("// Start coding...");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const prettifyCode = () => {
    if (editorInstance) {
      editorInstance.getAction("editor.action.formatDocument").run();
    }
  };

  const runCode = async () => {
    if (!code.trim()) {
      setMessage("Please enter code before running.");
      return;
    }

    setRunning(true);
    setOutput("Running...");
    setMessage("");

    try {
      const payload = {
        code,
        language,
        versionIndex: "4",
      };

      const { data } = await api.post("/jdoodle/compile", payload);

      if (data.error) {
        setOutput(`Error: ${data.error}`);
      } else if (data.output) {
        setOutput(data.output);
      } else {
        // fallback for unexpected response
        setOutput(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error("Run code error:", error);
      setOutput("Failed to run code.");
      setMessage("Error running code.");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="bg-gray-800 p-3 border-b border-gray-700 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold select-none">⚡ Code Editor</h1>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Filename"
            className="px-2 py-1 rounded text-black max-w-[140px]"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 py-1 rounded text-black"
          >
            {Object.keys(languageMap).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-2 py-1 rounded text-black"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
          </select>

          <button
            title="Save"
            onClick={() => saveLocally(filename, code)}
            className="btn-icon"
          >
            <FiSave size={20} />
          </button>
          <button title="Copy" onClick={copyCode} className="btn-icon">
            <FiClipboard size={20} />
          </button>
          <button title="Download" onClick={downloadCode} className="btn-icon">
            <FiDownload size={20} />
          </button>
          <button title="Reset" onClick={resetEditor} className="btn-icon">
            <FiRefreshCw size={20} />
          </button>
          <button title="Format" onClick={prettifyCode} className="btn-icon">
            <FiCode size={20} />
          </button>
          <button
            title="Run"
            onClick={runCode}
            disabled={running}
            className="btn-icon disabled:opacity-50"
          >
            <FiPlay size={20} />
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <Editor
          height="70vh"
          language={language}
          theme={theme}
          value={code}
          onMount={(editor, monaco) => {
            setEditorInstance(editor);
            window.monaco = monaco;
          }}
          onChange={(value) => {
            setCode(value);
            localStorage.setItem(LOCAL_STORAGE_KEY, value);
          }}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            automaticLayout: true,
          }}
        />
      </main>

      <section className="bg-black text-green-400 p-4 font-mono min-h-[15vh] border-t border-gray-700 overflow-auto">
        <h2 className="text-white font-bold mb-1 select-none">Output:</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </section>

      {message && (
        <div className="text-center py-2 text-yellow-300 font-medium select-none">
          {message}
        </div>
      )}

      <style>{`
        .btn-icon {
          background: #2563eb;
          padding: 6px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
          cursor: pointer;
          color: white;
        }
        .btn-icon:hover:not(:disabled) {
          background: #1d4ed8;
        }
        .btn-icon:disabled {
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
