export function getOffset(element: HTMLElement) {
  if (!element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  const rect = element.getBoundingClientRect();
  const win = element.ownerDocument.defaultView;

  return {
    top: rect.top + (win?.pageYOffset || 0),
    left: rect.left + (win?.pageXOffset || 0),
  };
}
