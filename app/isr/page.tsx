import ISRSnapshot from "../components/isRRendering.component";

export const dynamic = "force-static";
export const revalidate = 15;

export default function ISRPage() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <main className="shell">
      <div className="eyebrow">NEXT.JS RENDERING LAB / 03</div>
      <h1>Incremental Static Regeneration beobachten</h1>
      <p className="intro">
        Im Produktionsmodus wird diese Seite statisch ausgeliefert. Frühestens nach 15 Sekunden
        kann eine neue Anfrage eine aktualisierte Version auslösen.
      </p>

      {isDevelopment && (
        <p className="dev-notice" role="status">
          Dev-Modus: Die Seite wird bei jedem Aufruf neu gerendert. Starte <code>npm run preview</code> und öffne{" "}
          <code>localhost:3000/isr</code> für den ISR-Vergleich.
        </p>
      )}

      <nav className="mode-nav" aria-label="Rendering-Muster">
        <a href="/">SSR · pro Anfrage</a>
        <a href="/ssg">SSG · beim Build</a>
        <a href="/isr" aria-current="page">ISR · nach Revalidierung</a>
      </nav>

      <ISRSnapshot isDevelopment={isDevelopment} />

      <a className="reload" href="/isr">Seite neu laden <span aria-hidden="true">↗</span></a>

      <section className="explanation" aria-labelledby="explanation-heading">
        <h2 id="explanation-heading">So prüfst du ISR</h2>
        <ol>
          <li>Starte <code>npm run preview</code> und öffne <code>localhost:3000/isr</code>.</li>
          <li>Lade innerhalb von 15 Sekunden neu: Die Generierungs-ID bleibt gleich.</li>
          <li>Warte mindestens 15 Sekunden und lade neu: Die alte Version kann noch erscheinen, während Next.js sie im Hintergrund erneuert.</li>
          <li>Lade danach erneut: Generierungs-ID und Zeit sollten nun wechseln.</li>
        </ol>
        <p>
          Die Seite und <code>/api/posts</code> lesen dieselbe serverseitige Datenquelle. Beide
          Routen haben eigene ISR-Caches und können daher unterschiedliche Generierungs-IDs zeigen.
        </p>
      </section>
    </main>
  );
}
