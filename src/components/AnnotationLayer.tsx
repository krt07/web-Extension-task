import React, { useEffect, useState } from "react";
import { StickyNote } from "./StickyNote";
import { FloatingPanel } from "./FloatingPanel";
import { Annotation } from "../types/annotation";
import { generateSelector } from "../utils/selector-generator";
import { debounce } from "../utils/debounce";

export const AnnotationLayer: React.FC = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isCommentMode, setIsCommentMode] = useState(false);

  // Load saved annotations
  useEffect(() => {
    const stored = localStorage.getItem("annotations");
    if (stored) setAnnotations(JSON.parse(stored));
  }, []);

  // Save annotations
  useEffect(() => {
    localStorage.setItem("annotations", JSON.stringify(annotations));
  }, [annotations]);

  // Handle element click
  useEffect(() => {
    if (!isCommentMode) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Ignore extension UI clicks
      if (target.closest("#web-annotator-root")) return;

      e.preventDefault();
      e.stopPropagation();

      const rect = target.getBoundingClientRect();

      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        selector: generateSelector(target),
        text: "New Comment",
        x: rect.right + window.scrollX,
        y: rect.top + window.scrollY
      };

      setAnnotations(prev => [...prev, newAnnotation]);
      setIsCommentMode(false);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [isCommentMode]);

  // Update positions on scroll/resize
  const updatePositions = debounce(() => {
    setAnnotations(prev =>
      prev.map(note => {
        const el = document.querySelector(note.selector);
        if (!el) return note;

        const rect = el.getBoundingClientRect();

        return {
          ...note,
          x: rect.right + window.scrollX,
          y: rect.top + window.scrollY
        };
      })
    );
  }, 50);

  useEffect(() => {
    window.addEventListener("scroll", updatePositions);
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  const deleteAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id));
  };

  return (
    <>
      <button
        style={{
          position: "fixed",
          top: 20,
          right: 270,
          padding: "8px 12px",
          background: isCommentMode ? "#16a34a" : "#474D66",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          zIndex: 999999
        }}
        onClick={() => setIsCommentMode(true)}
      >
        {isCommentMode ? "Click on page..." : "Add Comment"}
      </button>

      {annotations.map(note => (
        <StickyNote
          key={note.id}
          note={note}
          onDelete={deleteAnnotation}
        />
      ))}

      <FloatingPanel
        annotations={annotations}
        onDelete={deleteAnnotation}
      />
    </>
  );
};
