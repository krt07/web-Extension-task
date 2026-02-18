import React from "react";
import { Annotation } from "../types/annotation";

interface Props {
  annotations: Annotation[];
}

export const FloatingPanel: React.FC<Props> = ({ annotations }) => {
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
        padding: "10px",
        zIndex: 999998,
        overflowY: "auto"
      }}
    >
      <h4>Annotations</h4>
      {annotations.map(a => (
        <div
          key={a.id}
          style={{ cursor: "pointer", marginBottom: "8px" }}
          onClick={() => {
            const el = document.querySelector(a.selector);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            (el as HTMLElement)?.style.setProperty("outline", "2px solid red");
          }}
        >
          {a.text}
        </div>
      ))}
    </div>
  );
};
