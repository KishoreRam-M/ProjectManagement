import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const LOCAL_STORAGE_KEY = "saved_code";

const languageMap = {
  javascript: 63,
  python: 71,
  java: 62,
  c: 50,
  cpp: 54,
};

const CodeEditor = () => {
  const [filename, setFilename] = useState("main.js");
  const [code, setCode] = useState("// Start coding...");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setCode(saved);
  }, []);

  const saveLocally = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, code);
    setMessage("💾 Code saved locally.");
    setTimeout(() => setMessage(""), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("📋 Code copied to clipboard!");
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
    const model = window.monaco?.editor.getModels()?.[0];
    if (model) {
      window.monaco?.editor.getAction("editor.action.formatDocument")?.run();
    }
  };

  const runCode = async () => {
    const langId = languageMap[language];
    if (!langId) {
      setOutput("❌ Language not supported for execution.");
      return;
    }

    setRunning(true);
    setOutput("⏳ Running...");

    try {
      const { data } = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: code,
          language_id: langId,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // 🔑 Replace this
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const token = data.token;

      const poll = setInterval(async () => {
        const { data: result } = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // 🔑 Replace this
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        if (result.status.id >= 3) {
          clearInterval(poll);
          setRunning(false);

          if (result.stdout) {
            setOutput(atob(result.stdout));
          } else if (result.stderr) {
            setOutput("❌ Error:\n" + atob(result.stderr));
          } else if (result.compile_output) {
            setOutput("❌ Compile Error:\n" + atob(result.compile_output));
          } else {
            setOutput("⚠️ No output.");
          }
        }
      }, 1500);
    } catch (error) {
      console.error(error);
      setOutput("❌ Failed to run code.");
      setRunning(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="bg-gray-800 p-4 border-b border-gray-700 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold">⚡ Offline Code Editor + Compiler</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Filename (e.g., main.js)"
            className="px-2 py-1 rounded text-black"
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
            onClick={saveLocally}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            💾 Save
          </button>
          <button
            onClick={copyCode}
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
          >
            📋 Copy
          </button>
          <button
            onClick={downloadCode}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
          >
            ⬇️ Download
          </button>
          <button
            onClick={resetEditor}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            ♻️ Reset
          </button>
          <button
            onClick={prettifyCode}
            className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
          >
            🎯 Format
          </button>
          <button
            onClick={runCode}
            disabled={running}
            className="bg-teal-600 hover:bg-teal-700 px-3 py-1 rounded"
          >
            🚀 {running ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      <div className="h-[70vh]">
        <Editor
          height="100%"
          language={language}
          theme={theme}
          value={code}
          onMount={(editor, monaco) => (window.monaco = monaco)}
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
      </div>

      <div className="bg-black text-green-400 p-4 font-mono min-h-[15vh] border-t border-gray-700">
        <h2 className="text-lg font-bold text-white">💬 Output:</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>

      {message && (
        <div className="text-center py-2 text-yellow-300 font-medium">
          {message}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
