import { LandingPage } from "@/components/LandingPage";

export default function HomePage() {
  // #region agent log
  fetch("http://127.0.0.1:7564/ingest/aede94ff-cb81-4eee-a34e-68c2dbe1759d", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "02b860",
    },
    body: JSON.stringify({
      sessionId: "02b860",
      runId: "initial",
      hypothesisId: "H1",
      location: "src/app/page.tsx:4",
      message: "HomePage rendered",
      data: {},
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return <LandingPage />;
}

