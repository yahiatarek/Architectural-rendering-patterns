"use client";

import { useState } from "react";

export default function ProgressiveCounter({ label }: { label: string }) {
  const [clicks, setClicks] = useState(0);

  return (
    <button className="progress-button" type="button" onClick={() => setClicks((value) => value + 1)}>
      {label}: {clicks} Klicks
    </button>
  );
}
