"use client";

import { useState, useCallback } from "react";
import type React from "react";

type UseResizableOptions = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  maxWidth: number;
  minWidth?: number;
  onResize: (width: number) => void;
};

type UseResizableReturn = {
  isDragging: boolean;
  handlePointerDown: (e: React.PointerEvent) => void;
};

export function useResizable({
  containerRef,
  maxWidth,
  minWidth = 280,
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
        const clamped = Math.max(minWidth, Math.min(Math.round(ev.clientX - rect.left), maxWidth));
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
    [containerRef, maxWidth, minWidth, onResize]
  );

  return { isDragging, handlePointerDown };
}
