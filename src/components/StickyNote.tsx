import React from "react";
import { Annotation } from "../types/annotation";

interface Props {
  note: Annotation;
  onDelete: (id: string) => void;
}

export const StickyNote: React.FC<Props> = ({ note, onDelete }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: note.y,
        left: note.x,
        background: "#fff59d",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 999999,
        minWidth: "120px"
      }}
    >
      <div style={{ marginBottom: "6px" }}>{note.text}</div>

      <button
        style={{
          background: "#272d80",
          color: "white",
          border: "none",
          padding: "4px 6px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px"
        }}
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </div>
  );
};
