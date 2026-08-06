// Sanity check against the real GitHub GraphQL API. Run with:
//   node scripts/check-github.mjs
// Optional for local dev — skips (exit 0) if GITHUB_TOKEN isn't set.

import assert from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Next.js reads both .env.local and .env, with .env.local taking precedence. Load the
// same pair in the same order — reading only .env.local made this script report "no
// token" while the app itself was happily authenticating from .env.
const envPaths = [".env.local", ".env"].map((f) => path.join(rootDir, f));

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

envPaths.forEach(loadEnvFile);

const token = process.env.GITHUB_TOKEN;
const login = process.env.GITHUB_LOGIN ?? "Krithik-sri";

if (!token) {
  console.log(
    "[check-github] SKIP: GITHUB_TOKEN is not set. Create a classic PAT with the " +
      "`read:user` scope at https://github.com/settings/tokens and add it to .env.local " +
      "as GITHUB_TOKEN=... to run this check.",
  );
  process.exit(0);
}

const VALID_LEVELS = new Set([
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
]);

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel weekday } }
        }
      }
    }
  }
`;

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query, variables: { login } }),
});

if (!res.ok) {
  console.error(`[check-github] FAIL: GraphQL request returned HTTP ${res.status}`);
  process.exit(1);
}

const json = await res.json();
if (json.errors?.length) {
  console.error(`[check-github] FAIL: GraphQL errors: ${JSON.stringify(json.errors)}`);
  process.exit(1);
}

try {
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  assert.ok(calendar, "contributionCalendar is missing");
  assert.ok(
    calendar.weeks.length >= 52 && calendar.weeks.length <= 54,
    `weeks length ${calendar.weeks.length} is not between 52 and 54`,
  );
  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      assert.ok(VALID_LEVELS.has(day.contributionLevel), `invalid contributionLevel ${day.contributionLevel}`);
    }
  }
  assert.ok(
    Number.isInteger(calendar.totalContributions) && calendar.totalContributions >= 0,
    `totalContributions ${calendar.totalContributions} is not a non-negative integer`,
  );

  console.log(
    `[check-github] PASS: ${calendar.totalContributions} contributions across ${calendar.weeks.length} weeks for ${login}`,
  );
} catch (err) {
  console.error(`[check-github] FAIL: ${err.message}`);
  process.exit(1);
}
