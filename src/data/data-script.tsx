import React from "react";
import { createRoot } from "react-dom/client";
import { AnnotationLayer } from "../components/AnnotationLayer";
import { createShadowRoot } from "./shadow-root";

const shadowRoot = createShadowRoot();

const appContainer = document.createElement("div");
shadowRoot.appendChild(appContainer);

const root = createRoot(appContainer);
root.render(<AnnotationLayer />);
