import { Annotation } from "../types/annotation";
import { generateSelector } from "../utils/selector-generator";

export class AnnotationManager {
  private annotations: Annotation[] = [];

  constructor() {
    this.load();
  }

  add(target: HTMLElement) {
    const rect = target.getBoundingClientRect();

    const annotation: Annotation = {
      id: Date.now().toString(),
      selector: generateSelector(target),
      text: "New Comment",
      x: rect.right + window.scrollX,
      y: rect.top + window.scrollY
    };

    this.annotations.push(annotation);
    this.save();
    return annotation;
  }

  getAll() {
    return this.annotations;
  }

  updatePositions() {
    this.annotations = this.annotations.map(note => {
      const el = document.querySelector(note.selector);
      if (!el) return note;
      const rect = el.getBoundingClientRect();
      return {
        ...note,
        x: rect.right + window.scrollX,
        y: rect.top + window.scrollY
      };
    });

    this.save();
  }

  private save() {
    localStorage.setItem("annotations", JSON.stringify(this.annotations));
  }

  private load() {
    const stored = localStorage.getItem("annotations");
    if (stored) {
      this.annotations = JSON.parse(stored);
    }
  }
}
