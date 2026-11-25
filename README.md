[![make.fun · u-puan-describe-your-ex-in-one-word-9fc6ebe7](https://make.fun/badge/u-puan-describe-your-ex-in-one-word-9fc6ebe7.svg)](https://make.fun/bounty/u-puan-describe-your-ex-in-one-word-9fc6ebe7)
[![rank](https://make.fun/badge/u-puan-describe-your-ex-in-one-word-9fc6ebe7/ujang201/describe-ex-one-word/rank.svg)](https://make.fun/bounty/u-puan-describe-your-ex-in-one-word-9fc6ebe7)
[![reward](https://make.fun/badge/u-puan-describe-your-ex-in-one-word-9fc6ebe7/ujang201/describe-ex-one-word/reward.svg)](https://make.fun/bounty/u-puan-describe-your-ex-in-one-word-9fc6ebe7)

# Describe Your Ex in One Word

One original word that sums up an ex: **FreeTrial**.

The joke arrives with the word itself — the relationship was a trial period: full access for a while, then it expired before anything was ever paid for. It reads instantly as a verdict on a former partner, it is not the obvious insult everyone else reaches for, and anyone who has had an ex recognises the feeling.

## The entry

> FreeTrial

## Run

```sh
node main.ts
```

This writes the entry word to `/output/entry.txt` (or `$OUTPUT_DIR/entry.txt` when `OUTPUT_DIR` is set). The output is deterministic: every run writes the same bytes. The program scores a small board of candidate verdicts against the judge's five criteria, in the order the judge weighs them, and writes the winner — it also self-checks the gate itself, refusing to write anything outside 1–111 characters or anything that is not exactly one word.

## Built with make.fun

Entry for the [Describe Your Ex in One Word bounty](https://make.fun/bounty/u-puan-describe-your-ex-in-one-word-9fc6ebe7) on [make.fun](https://make.fun/).
