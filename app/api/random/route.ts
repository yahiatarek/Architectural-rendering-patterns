import { randomInt } from "node:crypto";

// Der Handler muss bei jeder Anfrage laufen; nur die Zahl bleibt pro Minute gleich.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const minuteInMilliseconds = 60_000;
let activeMinute = -1;
let activeNumber = -1;

export function GET() {
  const minute = Math.floor(Date.now() / minuteInMilliseconds);

  if (minute !== activeMinute) {
    let nextNumber: number;
    do {
      nextNumber = randomInt(0, 1_000_000);
    } while (nextNumber === activeNumber);

    activeMinute = minute;
    activeNumber = nextNumber;
  }

  return Response.json(
    {
      number: activeNumber,
      minuteStart: new Date(minute * minuteInMilliseconds).toISOString(),
      nextChangeAt: new Date((minute + 1) * minuteInMilliseconds).toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
