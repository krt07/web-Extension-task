
import React, { useEffect, useState } from "react";
import { StickyNote } from "./StickyNote";
import { generateSelector } from "../utils/selector-generator";
import { debounce } from "../utils/debounce";
import { Annotation } from "../types/annotation";

export const AnnotationLayer = ( ) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isCommentMode, setIsCommentMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("annotations");
    if (stored) setAnnotations(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("annotations", JSON.stringify(annotations));
  }, [annotations]);

  const handleClick = (e: MouseEvent) => {
    if (!isCommentMode) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      selector: generateSelector(target),
      x: rect.right + window.scrollX,
      y: rect.top + window.scrollY,
      text: "New Comment"
    };

    setAnnotations(prev => [...prev, newAnnotation]);
    setIsCommentMode(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isCommentMode]);

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

  return (
    <>
      <button
        style={{ position: "fixed", top: 20, right: 20, zIndex: 999999 }}
        onClick={() => setIsCommentMode(true)}
      >
        Add Comment
      </button>

      {annotations.map(note => (
        <StickyNote key={note.id} note={note} />
      ))}
    </>
  );
};

