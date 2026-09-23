import { getPostsSnapshot } from "../lib/posts";

export default function ISRSnapshot({ isDevelopment }: { isDevelopment: boolean }) {
  // Server Component: direkter Zugriff auf die Datenquelle, ohne HTTP-Aufruf an die eigene App.
  const snapshot = getPostsSnapshot();

  return (
    <section className="snapshot snapshot-static" aria-labelledby="isr-heading">
      <div className="snapshot-header">
        <span className="live-dot" aria-hidden="true" />
        <span>{isDevelopment ? "Dev-Modus · pro Aufruf" : "ISR · alle 15 Sekunden revalidierbar"}</span>
      </div>
      <h2 id="isr-heading">Posts aus einer serverseitigen Datenquelle</h2>
      <dl>
        <div>
          <dt>Erzeugt um</dt>
          <dd>
            <time dateTime={snapshot.generatedAt}>
              {new Date(snapshot.generatedAt).toLocaleString("de-DE", {
                timeZone: "Africa/Cairo",
                dateStyle: "medium",
                timeStyle: "medium",
              })} {"(Kairo)"}
            </time>
          </dd>
        </div>
        <div>
          <dt>Generierungs-ID</dt>
          <dd className="request-id">{snapshot.generationId}</dd>
        </div>
      </dl>
      <ul>
        {snapshot.posts.map((post) => (
          <li key={post.id}>{post.title} · {post.views} Aufrufe</li>
        ))}
      </ul>
    </section>
  );
}
