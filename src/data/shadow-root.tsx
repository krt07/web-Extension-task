export function createShadowRoot(): ShadowRoot {
  const container = document.createElement("div");
  container.id = "web-annotator-root";

  const shadowRoot = container.attachShadow({ mode: "open" });

  document.body.appendChild(container);

  return shadowRoot;
}
