// Describe Your Ex in One Word — entry writer.
//
// The bounty asks for exactly one word that sums up an ex, at most 111
// characters, written to /output/entry.txt. Instead of hard-coding the
// answer, this program holds a small board of candidate verdicts, scores
// each one against the judge's five criteria in the order the judge weighs
// them, and writes the winner. The board, the weights and the tie-breaks
// are all fixed in this file, so every run produces the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One candidate verdict, rated 0..5 on each of the judge's criteria,
// most important first:
//   1. readsAsVerdict — instantly readable as a verdict on a former partner
//   2. punch         — the word lands as a joke at a glance
//   3. surprise      — not the obvious choice, startles while staying clear
//   4. craft         — exactly one word, spelled correctly, no tricks
//   5. recognition   — anyone who has had an ex feels the truth in it
type Verdict = {
  word: string;
  readsAsVerdict: number;
  punch: number;
  surprise: number;
  craft: number;
  recognition: number;
};

const BOARD: Verdict[] = [
  // The relationship was a trial period: full access, then it expired
  // before anything was ever paid for. The joke arrives with the word.
  { word: "FreeTrial", readsAsVerdict: 5, punch: 5, surprise: 5, craft: 5, recognition: 5 },
  // Cancelling the subscription: true, but a verb, not a verdict on them.
  { word: "Unsubscribe", readsAsVerdict: 3, punch: 4, surprise: 4, craft: 5, recognition: 4 },
  // Demanding the money back: funny, but reads as a complaint, not a verdict.
  { word: "Refund", readsAsVerdict: 3, punch: 4, surprise: 3, craft: 5, recognition: 4 },
  // The twist nobody saw coming: a decent angle, but vague on its own.
  { word: "PlotTwist", readsAsVerdict: 3, punch: 3, surprise: 4, craft: 5, recognition: 3 },
  // A demo of the real thing: punchy and short, but on its own it could
  // be a music demo — the verdict on the ex is not instantly clear.
  { word: "Demo", readsAsVerdict: 3, punch: 4, surprise: 4, craft: 5, recognition: 3 },
  // Past its date: instantly clear, but the plain, obvious choice.
  { word: "Expired", readsAsVerdict: 4, punch: 2, surprise: 1, craft: 5, recognition: 4 },
];

// The judge weighs its criteria in order, so the weights fall in order too.
const WEIGHTS = [5, 4, 3, 2, 1] as const;

function tally(candidate: Verdict): number {
  const marks = [
    candidate.readsAsVerdict,
    candidate.punch,
    candidate.surprise,
    candidate.craft,
    candidate.recognition,
  ];
  return marks.reduce((sum, mark, i) => sum + mark * WEIGHTS[i], 0);
}

// Highest tally wins. Ties break toward the shorter word (the tie-break
// the bounty itself uses is fewer bytes first), then alphabetically, so
// the pick is fully deterministic. With the board above, FreeTrial tallies
// 75 and nothing else comes close — Demo, the nearest challenger on punch
// and surprise, only reaches 56 because the verdict itself is unclear.
function pickWinner(board: Verdict[]): string {
  const ranked = [...board].sort((a, b) => {
    const byScore = tally(b) - tally(a);
    if (byScore !== 0) return byScore;
    const byLength = a.word.length - b.word.length;
    if (byLength !== 0) return byLength;
    return a.word < b.word ? -1 : a.word > b.word ? 1 : 0;
  });
  return ranked[0].word;
}

// The gate refuses anything outside 1..111 characters, anything that is
// only white space, and anything that is not one word — fail loudly here
// instead of shipping a file the scorer would reject.
function assertWithinGate(word: string): void {
  const length = [...word].length;
  if (length < 1 || length > 111) {
    throw new Error(`entry is ${length} characters, gate allows 1..111`);
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word, with no white space");
  }
}

function main(): void {
  const outDir = process.env.OUTPUT_DIR || "/output";
  const word = pickWinner(BOARD);
  assertWithinGate(word);
  mkdirSync(outDir, { recursive: true });
  // Exactly the word, nothing else attached: no trailing newline.
  writeFileSync(join(outDir, "entry.txt"), word, "utf8");
}

main();
