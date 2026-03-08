"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useFormStatus } from "react-dom";

type Props = {
  active: boolean;
  disabled?: boolean;
};

export function EscapingNoButton({ active, disabled }: Props) {
  const { pending } = useFormStatus();
  const [btnStyle, setBtnStyle] = useState({
    transform: "translate(0px, 0px)",
  });
  const [escapeCount, setEscapeCount] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const maxEscapeAttempts = 7;
  const canEscape = escapeCount < maxEscapeAttempts && !active;

  const escapeButton = () => {
    if (!buttonRef.current || !canEscape) return;

    const newCount = escapeCount + 1;
    setEscapeCount(newCount);

    // After 6-7 attempts, return to original position
    if (newCount >= maxEscapeAttempts) {
      setBtnStyle({ transform: "translate(0px, 0px)" });
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;

    // Calculate maximum safe movement to keep button in viewport
    const maxMoveX = Math.min(300, (window.innerWidth - buttonWidth) / 2);
    const maxMoveY = Math.min(100, (window.innerHeight - buttonHeight) / 2);

    const moveX = (Math.random() - 0.5) * maxMoveX * 2;
    const moveY = (Math.random() - 0.5) * maxMoveY * 2;

    setBtnStyle({
      transform: `translate(${moveX}px, ${moveY}px)`,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled || pending || !canEscape) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) {
      escapeButton();
    }
  };

  const base =
    "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50";

  const variant =
    "bg-transparent text-rose-500 border border-transparent hover:border-rose-200 hover:bg-rose-50";

  const stateClasses = active
    ? "ring-2 ring-rose-400 ring-offset-2 ring-offset-rose-50"
    : "";

  const buttonClass = `${base} ${variant} ${stateClasses}`;

  return (
    <div onMouseMove={handleMouseMove}>
      <button
        ref={buttonRef}
        type="submit"
        name="response"
        value="no"
        disabled={disabled || pending}
        className={buttonClass}
        style={btnStyle}
        onTouchStart={escapeButton}
      >
        <X className="h-3.5 w-3.5" />
        <span>No</span>
      </button>
    </div>
  );
}
