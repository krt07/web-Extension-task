export function generateSelector(el: HTMLElement): string {
  if (el.id) return `#${el.id}`;

  const path: string[] = [];
  while (el && el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    if (el.className) {
      selector += "." + el.className.trim().replace(/\s+/g, ".");
    }
    path.unshift(selector);
    el = el.parentElement as HTMLElement;
  }
  return path.join(" > ");
}
