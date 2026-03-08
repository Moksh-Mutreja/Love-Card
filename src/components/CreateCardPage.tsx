"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type React from "react";
import { ThemePicker } from "./ThemePicker";
import {
  createCardAction,
  type CreateCardFormState,
} from "@/app/actions/cards";
import { CardPreview } from "./CardPreview";
import { defaultThemeId } from "@/lib/themes";
import { Heart, Loader2, Music, Globe2, Lock } from "lucide-react";

const initialState: CreateCardFormState = {
  status: "idle",
};

export function CreateCardPage() {
  const [state, action] = useActionState(createCardAction, initialState);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 pt-10 md:flex-row">
      <div className="md:flex-1">
        <h1 className="mb-2 text-xl font-semibold text-rose-950">
          Write your love card
        </h1>
        <p className="mb-5 text-sm text-rose-600">
          Be specific, be kind, and leave a little room for magic.
        </p>

        <form action={action} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Your name"
              name="creatorName"
              placeholder="Alex"
              autoComplete="name"
              errors={state.errors?.creatorName}
            />
            <FormField
              label="Their name"
              name="recipientName"
              placeholder="Jamie"
              errors={state.errors?.recipientName}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-rose-900">
              Your message
            </label>
            <p className="mb-1 text-[11px] text-rose-500">
              Share how they make you feel, what you notice, and what you hope
              for.
            </p>
            <textarea
              name="message"
              rows={6}
              className="w-full resize-none rounded-2xl border border-rose-100 bg-white/70 px-3 py-2 text-sm text-rose-950 shadow-sm outline-none ring-rose-300 placeholder:text-rose-300 focus:ring-2"
              placeholder="Start with something simple, like the first moment you realized you liked them..."
            />
            {state.errors?.message && (
              <FieldErrors errors={state.errors.message} />
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-rose-900">
              Ask them a question
            </label>
            <p className="mb-1 text-[11px] text-rose-500">
              The receiver will answer using: Yes / Maybe / No
            </p>
            <input
              type="text"
              name="question"
              className="w-full rounded-2xl border border-rose-100 bg-white/70 px-3 py-2 text-sm text-rose-950 shadow-sm outline-none ring-rose-300 placeholder:text-rose-300 focus:ring-2"
              placeholder="Will you go on a date with me?"
            />
            {state.errors?.question && (
              <FieldErrors errors={state.errors.question} />
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Optional Spotify song"
              name="spotifyUrl"
              placeholder="Paste a Spotify link"
              leadingIcon={Music}
              errors={state.errors?.spotifyUrl}
            />
            <FormField
              label="Your email (optional)"
              name="creatorEmail"
              placeholder="We&apos;ll email you their response"
              type="email"
              autoComplete="email"
              errors={state.errors?.creatorEmail}
            />
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-rose-50/70 px-3 py-2">
            <input
              id="isPublic"
              name="isPublic"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-rose-200 text-rose-500 focus:ring-rose-400"
            />
            <div className="text-xs text-rose-700">
              <label htmlFor="isPublic" className="font-medium">
                Show this on the public wall
              </label>
              <p className="text-[11px] text-rose-500">
                Names and message may appear on the homepage. Your email never
                will.
              </p>
            </div>
          </div>

          <ThemePicker initialThemeId={defaultThemeId} />

          <div className="flex items-center justify-between gap-3 pt-4">
            <SubmitButton />
            <div className="flex items-center gap-3 text-[11px] text-rose-500">
              <span className="inline-flex items-center gap-1">
                <Globe2 className="h-3 w-3" />
                Public only if you check the box
              </span>
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Private response link
              </span>
            </div>
          </div>
        </form>
      </div>

      <div className="md:flex-1">
        <div className="sticky top-20 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-400">
            Preview
          </p>
          <CardPreview
            creatorName="You"
            recipientName="Your favorite person"
            message="You don&apos;t just make days better, you make them feel like they belong to us."
            themeId={defaultThemeId}
          />
        </div>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  leadingIcon?: React.ComponentType<{ className?: string }>;
  errors?: string[];
};

function FormField({
  label,
  name,
  placeholder,
  type = "text",
  autoComplete,
  leadingIcon: Icon,
  errors,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-xs font-medium text-rose-900"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-rose-300" />
        )}
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-rose-100 bg-white/70 px-3 py-2 text-sm text-rose-950 shadow-sm outline-none ring-rose-300 placeholder:text-rose-300 focus:ring-2 ${Icon ? "pl-8" : ""
            }`}
        />
      </div>
      {errors && <FieldErrors errors={errors} />}
    </div>
  );
}

function FieldErrors({ errors }: { errors: string[] }) {
  return (
    <ul className="mt-1 space-y-0.5 text-[11px] text-rose-500">
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary inline-flex items-center gap-2 text-sm"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending
        </>
      ) : (
        <>
          <Heart className="h-4 w-4" />
          Send my love card
        </>
      )}
    </button>
  );
}

