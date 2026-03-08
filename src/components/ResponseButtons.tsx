"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import confetti from "canvas-confetti";
import { Heart, Meh, X, Loader2 } from "lucide-react";
import {
  respondToCardAction,
  type RespondToCardState,
} from "@/app/actions/cards";
import { EscapingNoButton } from "./EscapingNoButton";

type Props = {
  cardId: string;
  disabled?: boolean;
  initialResponse?: "yes" | "no" | "maybe" | null;
};

const initialState: RespondToCardState = {
  status: "idle",
};

export function ResponseButtons({ cardId, disabled, initialResponse }: Props) {
  const [state, formAction, pending] = useActionState(
    respondToCardAction,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success" && state.response === "yes") {
      void confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#fb7185", "#f97316", "#22c55e", "#38bdf8"],
      });
    }
  }, [state]);

  const currentResponse = state.response ?? initialResponse ?? null;

  const isDisabled = disabled || pending || !!currentResponse;

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="cardId" value={cardId} />
      <div className="flex flex-wrap items-center gap-2">
        <ChoiceButton
          label="Yes"
          name="response"
          value="yes"
          variant="primary"
          icon={Heart}
          active={currentResponse === "yes"}
          disabled={isDisabled}
        />
        <ChoiceButton
          label="Maybe"
          name="response"
          value="maybe"
          variant="soft"
          icon={Meh}
          active={currentResponse === "maybe"}
          disabled={isDisabled}
        />
        <EscapingNoButton
          active={currentResponse === "no"}
          disabled={isDisabled}
        />
      </div>

      <p className="flex items-center gap-2 text-xs text-rose-500">
        {pending ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            Sending your answer...
          </>
        ) : currentResponse ? (
          <>Thank you for answering with "{currentResponse.toUpperCase()}".</>
        ) : (
          <>Only the sender will see your answer.</>
        )}
      </p>
    </form>
  );
}

type ChoiceButtonProps = {
  label: string;
  name: string;
  value: "yes" | "no" | "maybe";
  variant: "primary" | "soft" | "ghost";
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  disabled?: boolean;
};

function ChoiceButton({
  label,
  name,
  value,
  variant,
  icon: Icon,
  active,
  disabled,
}: ChoiceButtonProps) {
  const { pending } = useFormStatus();

  const base =
    "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50";

  const styleMap: Record<typeof variant, string> = {
    primary:
      "bg-rose-500 text-white shadow-md shadow-rose-300 hover:bg-rose-600",
    soft: "bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100",
    ghost:
      "bg-transparent text-rose-500 border border-transparent hover:border-rose-200 hover:bg-rose-50",
  };

  const stateClasses = active
    ? "ring-2 ring-rose-400 ring-offset-2 ring-offset-rose-50"
    : "";

  return (
    <button
      type="submit"
      name={name}
      value={value}
      disabled={disabled || pending}
      className={`${base} ${styleMap[variant]} ${stateClasses}`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </button>
  );
}
