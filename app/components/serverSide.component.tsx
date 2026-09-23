import { cookies } from "next/headers";
import { getLearningNote } from "../lib/server-data";

export default async function ServerSnapshot({ renderedAt, requestId }: { renderedAt: Date; requestId: string }) {
  const [cookieStore, note] = await Promise.all([cookies(), getLearningNote()]);
  
  return (
    <section className="snapshot" aria-labelledby="snapshot-heading">
      <div className="snapshot-header">
        <span className="live-dot" aria-hidden="true" />
        <span>SSR · pro Anfrage erzeugt</span>
      </div>
      <h2 id="snapshot-heading">Dieser Inhalt entstand für deine Anfrage.</h2>
      <div className="server-note">
        <h3>{note.title}</h3>
        <p>{note.message}</p>
      </div>
      <dl>
        <div>
          <dt>Cookies im Request</dt>
          <dd>{cookieStore.getAll().length}</dd>
        </div>
        <div>
          <dt>Gerendert um</dt>
          <dd>
            <time dateTime={renderedAt.toISOString()}>
              {renderedAt.toLocaleString("de-DE", {
                timeZone: "Africa/Cairo",
                dateStyle: "medium",
                timeStyle: "medium",
              })} {"(Kairo)"}
            </time>
          </dd>
        </div>
        <div>
          <dt>Request-ID</dt>
          <dd className="request-id">{requestId}</dd>
        </div>
      </dl>
    </section>
  );
}
