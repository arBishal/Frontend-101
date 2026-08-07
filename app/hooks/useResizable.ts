"use client";

import { useState, useCallback } from "react";
import type React from "react";

type UseResizableOptions = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  maxWidth: number;
  minWidth?: number;
  /** Current width, so keyboard stepping knows where to move from. */
  width: number;
  onResize: (width: number) => void;
};

type UseResizableReturn = {
  isDragging: boolean;
  handlePointerDown: (e: React.PointerEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
};

/** How many pixels each arrow-key press nudges the width. */
const KEYBOARD_STEP = 10;

export function useResizable({
  containerRef,
  maxWidth,
  minWidth = 280,
  width,
  onResize,
}: UseResizableOptions): UseResizableReturn {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);

      const onPointerMove = (ev: PointerEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clamped = Math.max(
          minWidth,
          Math.min(Math.round(ev.clientX - rect.left), maxWidth),
        );
        onResize(clamped);
      };

      const onPointerUp = () => {
        setIsDragging(false);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    },
    [containerRef, maxWidth, minWidth, onResize],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let next: number;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          next = width - KEYBOARD_STEP;
          break;
        case "ArrowRight":
        case "ArrowUp":
          next = width + KEYBOARD_STEP;
          break;
        case "Home":
          next = minWidth;
          break;
        case "End":
          next = maxWidth;
          break;
        default:
          return;
      }
      e.preventDefault();
      onResize(Math.max(minWidth, Math.min(next, maxWidth)));
    },
    [width, minWidth, maxWidth, onResize],
  );

  return { isDragging, handlePointerDown, handleKeyDown };
}
