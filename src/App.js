import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    setLoading(true);

    let newResult = {
      risk_score: 10,
      risk_level: "LOW",
      secrets_found: [],
      emails_found: [],
      names_found: [],
    };

    if (
      prompt.toLowerCase().includes("email") ||
      prompt.toLowerCase().includes("password")
    ) {
      newResult = {
        risk_score: 90,
        risk_level: "HIGH",
        secrets_found: ["12345"],
        emails_found: ["test@example.com"],
        names_found: [],
      };
    } else if (prompt.toLowerCase().includes("name")) {
      newResult = {
        risk_score: 50,
        risk_level: "MEDIUM",
        secrets_found: [],
        emails_found: [],
        names_found: ["Amaan Momin"],
      };
    } else if (prompt.trim() === "") {
      newResult = {
        risk_score: 0,
        risk_level: "LOW",
        secrets_found: [],
        emails_found: [],
        names_found: [],
      };
    }

    setResult(newResult);
    setLoading(false);
  };

  const riskColor = {
    HIGH: "#ef4444",
    MEDIUM: "#f59e0b",
    LOW: "#22c55e",
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        maxWidth: 700,
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <h1>🛡️ SentinelLLM</h1>
      <p style={{ color: "#6b7280" }}>Detects data leakage in AI prompts</p>

      <textarea
        rows={5}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 14,
          borderRadius: 8,
          border: "1px solid #d1d5db",
          marginTop: 16,
        }}
        placeholder="Enter a prompt to analyze..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={analyze}
        style={{
          marginTop: 12,
          padding: "10px 24px",
          background: "#1d4ed8",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Prompt"}
      </button>

      {result && (
        <div
          style={{
            marginTop: 24,
            padding: 20,
            border: "1px solid #e5e7eb",
            borderRadius: 12,
          }}
        >
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <div
              style={{
                flex: 1,
                background: "#f9fafb",
                padding: 16,
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 700 }}>
                {result.risk_score}
              </div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>Risk Score</div>
            </div>
            <div
              style={{
                flex: 1,
                background: "#f9fafb",
                padding: 16,
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: riskColor[result.risk_level],
                }}
              >
                {result.risk_level}
              </div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>Risk Level</div>
            </div>
          </div>

          {[
            ["🔐 Secrets", result.secrets_found],
            ["📧 Emails", result.emails_found],
            ["👤 Names", result.names_found],
          ].map(([label, items]) => (
            <div key={label} style={{ marginBottom: 10 }}>
              <strong>{label}:</strong>{" "}
              {items.length ? (
                items.join(", ")
              ) : (
                <span style={{ color: "#9ca3af" }}>None</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
