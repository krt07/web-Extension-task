import React from "react";
import { Annotation } from "../types/annotation";

interface Props {
  note: Annotation;
}

export const StickyNote: React.FC<Props> = ({ note }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: note.y,
        left: note.x,
        background: "#fff59d",
        padding: "8px",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 999999
      }}
    >
      {note.text}
    </div>
  );
};
