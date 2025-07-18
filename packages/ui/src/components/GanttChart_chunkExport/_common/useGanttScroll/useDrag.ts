import React from "react";

import { ScrollProviderContextInterface } from "components/ScrollProvider";

export function useDrag(scrollProvider: ScrollProviderContextInterface | null) {
  React.useEffect(() => {
    if (!scrollProvider || scrollProvider.scrollableElement === window) return;
    const scrollableElement = scrollProvider.scrollableElement as HTMLElement;
    return handleDrag(scrollableElement, ({ left, top }) => scrollableElement.scroll({ left, top }));
  }, [scrollProvider]);
}

function handleDrag(scrollableElement: HTMLElement, onScroll: (coords: { left: number; top: number }) => void) {
  let _startX = 0,
    _startY = 0;

  function onSelect(event: Event) {
    event.preventDefault();
  }

  const overlay = createOverlay(scrollableElement);

  function onMouseDown(event: MouseEvent) {
    if ((event.target as HTMLElement).closest("[data-gantt-disable-drag]")) return;
    overlay.mouseDown();
    scrollableElement.addEventListener("mousemove", onMouseMove);
    document.addEventListener("selectstart", onSelect);
    _startX = event.clientX + scrollableElement.scrollLeft;
    _startY = event.clientY + scrollableElement.scrollTop;
  }

  function onMouseMove(event: MouseEvent) {
    const left = _startX - event.clientX;
    const top = _startY - event.clientY;
    onScroll({ left, top });
    overlay.mouseMove(left, top);
  }

  function onMouseUp() {
    overlay.mouseUp();
    document.removeEventListener("selectstart", onSelect);
    scrollableElement.removeEventListener("mousemove", onMouseMove);
  }

  function onLeave() {
    onMouseUp();
  }

  scrollableElement.addEventListener("mousedown", onMouseDown);
  scrollableElement.addEventListener("mouseup", onMouseUp);
  scrollableElement.addEventListener("mouseleave", onLeave);

  return () => {
    overlay.dispose();
    document.removeEventListener("selectstart", onSelect);
    scrollableElement.removeEventListener("mousedown", onMouseDown);
    scrollableElement.removeEventListener("mouseup", onMouseUp);
    scrollableElement.removeEventListener("mousemove", onMouseMove);
    scrollableElement.addEventListener("mouseleave", onLeave);
  };
}

function createOverlay(scrollableElement: HTMLElement) {
  let overlayElement: HTMLElement | null;

  function dispose() {
    if (!overlayElement) return;
    scrollableElement.removeChild(overlayElement);
    overlayElement = null;
  }

  function mouseDown() {
    overlayElement = document.createElement("div");
    overlayElement.style.position = "absolute";
    overlayElement.style.width = "100%";
    overlayElement.style.height = "100%";
    overlayElement.style.zIndex = "100000000";
    scrollableElement.appendChild(overlayElement);
  }

  function mouseUp() {
    if (!overlayElement) return;
    scrollableElement.removeChild(overlayElement);
    overlayElement = null;
  }

  function mouseMove(left: number, top: number) {
    if (!overlayElement) return;
    overlayElement!.style.left = left + "px";
    overlayElement!.style.top = top + "px";
  }

  return { mouseDown, mouseUp, mouseMove, dispose };
}
