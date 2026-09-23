import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

type LearningNote = {
  title: string;
  message: string;
};

export async function getLearningNote(): Promise<LearningNote> {
  const path = join(process.cwd(), "private", "learning-note.json");
  const contents = await readFile(path, "utf8");
  return JSON.parse(contents) as LearningNote;
}
