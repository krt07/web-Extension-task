import React from "react";
import { Annotation } from "../types/annotation";

interface Props {
  annotations: Annotation[];
  onDelete: (id: string) => void;
}

export const FloatingPanel: React.FC<Props> = ({
  annotations,
  onDelete
}) => {
  const highlightElement = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    (el as HTMLElement).style.outline = "3px solid red";

    setTimeout(() => {
      (el as HTMLElement).style.outline = "";
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "250px",
        height: "100vh",
        background: "#ffffff",
        borderLeft: "1px solid #ddd",
        padding: "12px",
        zIndex: 999998,
        overflowY: "auto"
      }}
    >
      <h4 style={{ marginBottom: "12px" }}>Annotations</h4>

      {annotations.length === 0 && (
        <p style={{ fontSize: "14px", color: "#666" }}>
          No annotations yet
        </p>
      )}

      {annotations.map(a => (
        <div
          key={a.id}
          style={{
            marginBottom: "10px",
            padding: "8px",
            background: "#f3f4f6",
            borderRadius: "6px"
          }}
        >
          <div
            style={{
              cursor: "pointer",
              fontSize: "14px",
              marginBottom: "6px"
            }}
            onClick={() => highlightElement(a.selector)}
          >
            {a.text}
          </div>

          <button
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "4px 6px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px"
            }}
            onClick={() => onDelete(a.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
