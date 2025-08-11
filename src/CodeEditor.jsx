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
    }
  }, [c]);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const response = await api.get("/files/list");
      if (Array.isArray(response.data)) setFileList(response.data);
      else setFileList([]);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  const saveLocally = async (filename1, filecontent) => {
    try {
      const arr = Array.isArray(fileList) ? fileList : [];

      if (!arr.includes(filename1)) {
        const payload = { filename: filename1, content: filecontent };
        await api.post("/files/create", payload);
        fetchFileList();
      } else {
        await api.put("/files/update", { filename: filename1, content: filecontent });
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
      const payload = { code, language, versionIndex: "4" };
      const { data } = await api.post("/jdoodle/compile", payload);

      if (data.error) {
        setOutput(`Error: ${data.error}`);
        setMessage(data.error);
      } else if (data.output) {
        setOutput(data.output);
      } else {
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
    <div className="min-h-screen bg-[#0F0F1C] flex flex-col p-6 font-sans text-gray-100">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-[#181829] rounded-3xl border border-[#292945] p-4 shadow-md">
        <h1 className="text-2xl font-extrabold select-none bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] bg-clip-text text-transparent">
          ⚡ Code Editor
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Filename"
            className="max-w-[140px] px-3 py-1.5 rounded-xl bg-[#111827] border border-[#334155] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#111827] border border-[#334155] text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
            className="px-3 py-1.5 rounded-xl bg-[#111827] border border-[#334155] text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
          </select>

          {/* Buttons */}
          {[
            { onClick: () => saveLocally(filename, code), title: "Save", icon: <FiSave size={20} /> },
            { onClick: copyCode, title: "Copy", icon: <FiClipboard size={20} /> },
            { onClick: downloadCode, title: "Download", icon: <FiDownload size={20} /> },
            { onClick: resetEditor, title: "Reset", icon: <FiRefreshCw size={20} /> },
            { onClick: prettifyCode, title: "Format", icon: <FiCode size={20} /> },
          ].map(({ onClick, title, icon }) => (
            <button
              key={title}
              onClick={onClick}
              title={title}
              className="btn-icon bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] text-[#0F0F1C]"
            >
              {icon}
            </button>
          ))}

          <button
            title="Run"
            onClick={runCode}
            disabled={running}
            className={`btn-icon bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] text-[#0F0F1C] ${
              running ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            <FiPlay size={20} />
          </button>
        </div>
      </header>

      {/* Editor */}
      <main className="flex-grow mt-6 rounded-2xl overflow-hidden shadow-lg border border-[#292945]">
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
            smoothScrolling: true,
            scrollBeyondLastLine: false,
          }}
        />
      </main>

      {/* Output Section */}
      <section className="mt-6 rounded-2xl border border-[#292945] bg-[#181829] p-4 font-mono min-h-[15vh] text-green-400 shadow-md overflow-auto">
        <h2 className="font-bold mb-1 select-none text-gray-200">Output:</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </section>

      {/* Message */}
      {message && (
        <div className="mt-3 text-center text-yellow-400 font-medium select-none">{message}</div>
      )}

      <style>{`
        .btn-icon {
          padding: 8px 10px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
        }
        .btn-icon:hover:not(:disabled) {
          filter: brightness(1.1);
        }
        .btn-icon:disabled {
          cursor: not-allowed;
        }
        input, select {
          border: none;
        }
        input:focus, select:focus {
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
