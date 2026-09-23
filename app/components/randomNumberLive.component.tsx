"use client";

import { useEffect, useState } from "react";

type RandomResponse = {
  number: number;
  nextChangeAt: string;
};

export default function RandomNumberLive() {
  const [number, setNumber] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    async function loadNumber() {
      try {
        const response = await fetch("/api/random", { cache: "no-store" });
        if (!response.ok) throw new Error(`API: ${response.status}`);

        const data = (await response.json()) as RandomResponse;
        if (cancelled) return;

        setNumber(data.number);
        setError(false);
        const delay = Math.max(1_000, Date.parse(data.nextChangeAt) - Date.now() + 100);
        timer = setTimeout(loadNumber, delay);
      } catch {
        if (cancelled) return;
        setError(true);
        timer = setTimeout(loadNumber, 10_000);
      }
    }

    void loadNumber();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return <dd aria-live="polite">{error ? "API nicht erreichbar" : number ?? "Lade …"}</dd>;
}
