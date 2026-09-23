import { connection } from "next/server";
import ServerSnapshot from "./components/serverSide.component";

export default async function Home() {
  // Wartet auf einen Request: Die Werte werden nicht schon beim Build erzeugt.
  await connection();
  const renderedAt = new Date();
  const requestId = crypto.randomUUID().slice(0, 8);
  console.log(`[Server Component] Request ${requestId} um ${renderedAt.toISOString()}`);

  return (
    <main className="shell">
      <div className="eyebrow">NEXT.JS RENDERING LAB / 01</div>
      <h1>Serverseitiges Rendering sichtbar machen</h1>
      <p className="intro">
        Diese Seite wird für jeden Aufruf auf dem Server berechnet. Lade sie neu und beobachte,
        wie Zeit und Request-ID wechseln.
      </p>

      <ServerSnapshot renderedAt={renderedAt} requestId={requestId} />

      <a className="reload" href="/">Seite neu laden <span aria-hidden="true">↗</span></a>

      <section className="explanation" aria-labelledby="explanation-heading">
        <h2 id="explanation-heading">So kannst du es prüfen</h2>
        <ol>
          <li>Starte die App mit <code>npm run dev</code> und öffne <code>localhost:3000</code>.</li>
          <li>Lade die Seite neu: Zeit und Request-ID ändern sich.</li>
          <li>Öffne „Seitenquelltext anzeigen“: Die Werte stehen bereits im HTML.</li>
          <li>Sieh ins Terminal: Dort erscheint die zugehörige Server-Ausgabe.</li>
        </ol>
        <p>
          <code>ServerSnapshot</code> ist eine Server Component ohne <code>"use client"</code>.{" "}
          <code>connection()</code> sorgt dafür, dass die Seite pro Anfrage neu gerendert wird.
        </p>
        <p>
          Die Lernnotiz stammt aus <code>private/learning-note.json</code>. Nur Server-Code liest
          diese Datei. Der angezeigte Text ist trotzdem für alle Besucher im HTML sichtbar.
        </p>
      </section>
    </main>
  );
}
