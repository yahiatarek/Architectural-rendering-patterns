import "server-only";

import { randomInt, randomUUID } from "node:crypto";

export type Post = {
  id: number;
  title: string;
  views: number;
};

export type PostsSnapshot = {
  generationId: string;
  generatedAt: string;
  posts: Post[];
};

// Simuliert eine Datenquelle: Bei jeder Regenerierung entsteht eine neue Version.
export function getPostsSnapshot(): PostsSnapshot {
  return {
    generationId: randomUUID(),
    generatedAt: new Date().toISOString(),
    posts: [
      { id: 1, title: "Server Components verstehen", views: randomInt(100, 1_000) },
      { id: 2, title: "SSG und ISR vergleichen", views: randomInt(100, 1_000) },
    ],
  };
}
