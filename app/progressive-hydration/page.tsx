import { Suspense } from "react";
import ProgressiveCounter from "../components/progressiveCounter.component";

/*
 * SSR: Der Server erzeugt HTML.
 * Streaming SSR: Das HTML kommt schrittweise an; Suspense-Grenzen ermöglichen
 * hier die getrennte Ausgabe der Bereiche.
 * Hydration: React verbindet das vorhandene HTML mit der Client-Logik
 * (Zustand und Event-Handlern).
 * Selective Hydration: React kann einzelne Suspense-Bereiche unabhängig
 * voneinander und priorisiert hydratisieren.
 * Progressive Hydration: Die Seite wird schrittweise interaktiv,
 * statt alle Bereiche auf einmal zu hydratisieren.
 *
 * In dieser Demo verzögern die Timer die Server-Ausgabe, nicht die Hydration
 * selbst. Suspense ermöglicht Streaming und die getrennte Hydration der
 * Client-Bereiche. Die genaue Hydration-Reihenfolge bestimmt React im Browser.
 */

// Die Wartezeiten sollen bei jedem Request sichtbar sein, auch nach dem Build.
export const dynamic = "force-dynamic";

async function DelayedIsland({ title, delayMs }: { title: string; delayMs: number }) {
  await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
  const renderedAt = new Date();

  return (
    <section className="progress-card" aria-label={title}>
      <span className="progress-label">Server-HTML nach {delayMs / 1000} s</span>
      <h2>{title}</h2>
      <p>Vom Server gerendert um {renderedAt.toLocaleTimeString("de-DE", { timeZone: "Africa/Cairo" })} (Kairo).</p>
      <ProgressiveCounter label={title} />
    </section>
  );
}

function WaitingCard({ title }: { title: string }) {
  return (
    <section className="progress-card progress-card-loading" aria-label={`${title} lädt`}>
      <span className="progress-label">Suspense-Fallback</span>
      <h2>{title}</h2>
      <p>Der Server bereitet diesen Bereich noch vor …</p>
    </section>
  );
}

export default function ProgressiveHydrationPage() {
  return (
    <main className="shell">
      <div className="eyebrow">NEXT.JS RENDERING LAB / 04</div>
      <h1>Progressive Hydration beobachten</h1>
      <p className="intro">
        Zwei unabhängige Suspense-Bereiche kommen nacheinander vom Server. Jeder enthält einen
        Client-Button, der interaktiv werden kann, sobald sein Bereich angekommen und hydratisiert ist.
      </p>

      <nav className="mode-nav" aria-label="Rendering-Muster">
        <a href="/">SSR</a>
        <a href="/ssg">SSG</a>
        <a href="/isr">ISR</a>
        <a href="/progressive-hydration" aria-current="page">Progressive Hydration</a>
      </nav>

      <div className="progress-grid">
        <Suspense fallback={<WaitingCard title="Bereich A" />}>
          <DelayedIsland title="Bereich A" delayMs={350} />
        </Suspense>
        <Suspense fallback={<WaitingCard title="Bereich B" />}>
          <DelayedIsland title="Bereich B" delayMs={4_000} />
        </Suspense>
      </div>

      <section className="explanation" aria-labelledby="progress-explanation">
        <h2 id="progress-explanation">Was du beobachten kannst</h2>
        <ol>
          <li>Starte <code>npm run preview</code> und öffne <code>localhost:3000/progressive-hydration</code>.</li>
          <li>Lade die Seite neu: Zunächst erscheinen zwei Platzhalter, dann Bereich A und später Bereich B.</li>
          <li>Klicke den Button in Bereich A, während Bereich B noch lädt. So siehst du, dass A bereits interaktiv ist.</li>
          <li>Im Performance-Tab zeigen React-Tracks die Hydration und die späteren Updates der beiden Client-Bereiche.</li>
        </ol>
        <p>
          Der Wechsel der Platzhalter zeigt <strong>Streaming</strong>. Die unabhängig interaktiv
          werdenden Buttons zeigen <strong>selektive Hydration</strong>. Die genaue Reihenfolge im
          Browser hängt auch von Netzwerk und CPU ab.
        </p>
      </section>
    </main>
  );
}
