// One Line, One Laugh — make.fun micro bounty entry.
//
// Writes a single original one-liner joke to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: the same line every run. Node stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I told my Wi-Fi router we needed some space — now it won't speak to me, and honestly it's the most stable we've ever been.";

const chars = [...ENTRY]; // count code points, not UTF-16 units

if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line (no newline or CR)");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${chars.length}-char entry to ${join(outDir, "entry.txt")}`);
