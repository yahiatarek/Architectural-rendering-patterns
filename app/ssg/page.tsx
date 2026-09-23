import SSGSnapshot from "../components/ssgRendering.component";

// Der Build schlägt fehl, falls diese Route versehentlich Request-Daten liest.
export const dynamic = "error";

export default function SSGPage() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const renderedAt = new Date();
  const buildId = crypto.randomUUID().slice(0, 8);
  console.log(`[SSG] ${isDevelopment ? "Dev-Render" : "Build"} ${buildId} um ${renderedAt.toISOString()}`);

  return (
    <main className="shell">
      <div className="eyebrow">NEXT.JS RENDERING LAB / 02</div>
      <h1>Static Site Generation sichtbar machen</h1>
      <p className="intro">
        {isDevelopment
          ? "Im Dev-Modus rendert Next.js diese Seite bei Aufrufen neu. Prüfe SSG im Produktionsmodus."
          : "Diese Seite wurde beim Produktions-Build erzeugt. Zeit und Build-ID bleiben bei jedem Aufruf gleich."}
      </p>

      {isDevelopment && (
        <p className="dev-notice" role="status">
          Dev-Modus: Die Werte dürfen sich ändern. Starte <code>npm run preview</code> und öffne{" "}
          <code>localhost:3000/ssg</code> für den SSG-Vergleich.
        </p>
      )}

      <nav className="mode-nav" aria-label="Rendering-Muster">
        <a href="/">SSR · pro Anfrage</a>
        <a href="/ssg" aria-current="page">SSG · beim Build</a>
      </nav>

      <SSGSnapshot renderedAt={renderedAt} buildId={buildId} isDevelopment={isDevelopment} />

      <a className="reload" href="/ssg">Seite neu laden <span aria-hidden="true">↗</span></a>

      <section className="explanation" aria-labelledby="explanation-heading">
        <h2 id="explanation-heading">So vergleichst du SSR und SSG</h2>
        <ol>
          <li>Führe <code>npm run preview</code> aus und öffne <code>localhost:3000/ssg</code>.</li>
          <li>Lade <code>/ssg</code> mehrfach neu: Zeit und Build-ID bleiben gleich.</li>
          <li>Wechsle zu <code>/</code> und lade neu: Zeit und Request-ID ändern sich.</li>
          <li>Baue die App erneut: Erst dann erhält <code>/ssg</code> neue Werte.</li>
        </ol>
        <p>
          Beide Komponenten lesen dieselbe Lernnotiz aus <code>private/learning-note.json</code>.
          SSG kann beim Build keine Cookies einer späteren Anfrage lesen.
        </p>
        <p>
          Nur die API-Zahl wird im Browser geladen und nach der nächsten Minutengrenze aktualisiert.
          Build-Zeit und Build-ID der statischen Seite bleiben dabei unverändert.
        </p>
      </section>
    </main>
  );
}
