"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Loader2, Mail } from "lucide-react";

type Props = {
  cardId: string;
  shareUrl: string;
  initialResponse: "yes" | "no" | "maybe" | null;
  initialRespondedAt: string | null;
};

type Status = {
  response: "yes" | "no" | "maybe" | null;
  respondedAt: string | null;
};

export function ShareLink({
  cardId,
  shareUrl,
  initialResponse,
  initialRespondedAt,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>({
    response: initialResponse,
    respondedAt: initialRespondedAt,
  });
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchStatus = async () => {
      try {
        setLoadingStatus(true);
        const res = await fetch(`/api/cards/${cardId}`);
        if (!res.ok) return;
        const data = (await res.json()) as {
          response: "yes" | "no" | "maybe" | null;
          respondedAt: string | null;
        };
        if (!isMounted) return;
        setStatus({
          response: data.response,
          respondedAt: data.respondedAt,
        });
      } finally {
        if (isMounted) {
          setLoadingStatus(false);
        }
      }
    };

    const interval = setInterval(fetchStatus, 8000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [cardId]);

  const handleCopy = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
      } else {
        // Fallback for non-secure contexts or missing clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (successful) {
          setCopied(true);
        }
      }
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.error("Failed to copy link:", err);
      setCopied(false);
    }
  };

  const labelForResponse = (response: Status["response"]) => {
    switch (response) {
      case "yes":
        return "They said YES";
      case "no":
        return "They said NO";
      case "maybe":
        return "They said MAYBE";
      default:
        return "Waiting for a reply";
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-rose-100 bg-white/80 p-4 shadow-sm">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-rose-900">
          <Mail className="h-4 w-4 text-rose-400" />
          Share your love card
        </h2>
        <p className="text-xs text-rose-500">
          Send this private link to your person. You&apos;ll see their answer
          here when they respond.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-full border border-rose-100 bg-rose-50/60 px-3 py-2 text-xs text-rose-800">
          <span className="line-clamp-1">{shareUrl}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-primary whitespace-nowrap px-4 py-2 text-xs"
        >
          {copied ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-1.5 h-3.5 w-3.5" />
              Copy link
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-2xl bg-rose-50/70 px-3 py-2 text-xs">
        <div>
          <p className="font-medium text-rose-900">
            {labelForResponse(status.response)}
          </p>
          <p className="text-[11px] text-rose-500">
            {status.respondedAt
              ? `Last updated ${new Date(
                status.respondedAt,
              ).toLocaleString()}`
              : "We check for new responses every few seconds."}
          </p>
        </div>
        {loadingStatus && (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-400" />
        )}
      </div>
    </div>
  );
}

