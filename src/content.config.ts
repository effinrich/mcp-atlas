import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const servers = defineCollection({
  loader: file("src/data/mcp-servers.json"),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.enum([
      "dev-tooling",
      "cloud-infra",
      "design",
      "data",
      "productivity",
      "communication",
    ]),
    installCommand: z.string(),
    repoUrl: z.string().url(),
    npmPackage: z.string().optional(),
    official: z.boolean(),
    maintained: z.boolean(),
    lastVerified: z.coerce.date(),
    sourceNote: z.string(),
  }),
});

export const collections = { servers };
