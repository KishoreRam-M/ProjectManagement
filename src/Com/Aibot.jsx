import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../Api/axiosInstace';

const Aibot = () => {
    const [userPrompt, setUserPrompt] = useState("");
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAiBot = async () => {
        if (!userPrompt.trim()) return;
        setLoading(true);
        setOutput(null);

        try {
            const payload = { prompt: userPrompt };
            const response = await api.post('/gemini/ask', payload);

            // ✅ Safely extract AI text
            const aiText =
                response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "⚠ No response text found.";

            setOutput(aiText);
            console.log("AI Output:", aiText);
        } catch (error) {
            console.error("Error calling AI bot:", error);
            setOutput("⚠ **Error:** Something went wrong while calling AI bot.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px",
                fontFamily: "Inter, sans-serif"
            }}
        >
            <div
                style={{
                    background: "#1e293b",
                    padding: "18px",
                    borderRadius: "14px",
                    width: "100%",
                    maxWidth: "520px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.45)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px"
                }}
            >
                <h1
                    style={{
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#f1f5f9",
                        marginBottom: "4px"
                    }}
                >
                    🤖 Velvora 2.0
                </h1>

                {/* Input + Button */}
                <div style={{ display: "flex", gap: "8px" }}>
                    <input
                        type="text"
                        placeholder="Ask me anything..."
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        style={{
                            flex: 1,
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "1px solid #334155",
                            background: "#0f172a",
                            color: "white",
                            fontSize: "0.95rem",
                            outline: "none",
                            transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                        onBlur={(e) => e.target.style.borderColor = "#334155"}
                    />
                    <button
                        onClick={handleAiBot}
                        style={{
                            padding: "10px 14px",
                            borderRadius: "8px",
                            background: loading ? "#1d4ed8" : "#3b82f6",
                            color: "white",
                            border: "none",
                            cursor: loading ? "wait" : "pointer",
                            fontWeight: 500,
                            transition: "background 0.2s",
                            minWidth: "70px",
                        }}
                        disabled={loading}
                    >
                        {loading ? "..." : "Ask"}
                    </button>
                </div>

                {/* Output */}
                {loading && (
                    <div
                        style={{
                            padding: "12px",
                            background: "#334155",
                            borderRadius: "8px",
                            fontStyle: "italic",
                            textAlign: "center"
                        }}
                    >
                        Thinking...
                    </div>
                )}

                {!loading && output && typeof output === "string" && (
                    <div
                        style={{
                            padding: "14px",
                            background: "#0f172a",
                            borderRadius: "10px",
                            maxHeight: "360px",
                            overflowY: "auto",
                            lineHeight: "1.6",
                            border: "1px solid #334155",
                            fontSize: "0.95rem",
                            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.3)"
                        }}
                    >
                        <ReactMarkdown>{output}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Aibot;
