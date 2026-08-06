// Server-only: reads process.env.GITHUB_TOKEN. Never import this from a client component.

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      followers { totalCount }
      following { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel weekday } }
        }
        commitContributionsByRepository(maxRepositories: 10) {
          repository { name url stargazerCount description pushedAt primaryLanguage { name color } }
          contributions { totalCount }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false,
                   orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes { name description url stargazerCount primaryLanguage { name color } pushedAt }
      }
    }
  }
`;

const CONTRIBUTION_LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
  weekday: number;
};

export type Calendar = {
  totalContributions: number;
  weeks: ContributionDay[][];
  longestStreak: number;
  currentStreak: number;
  busiestDay: { date: string; count: number } | null;
};

export type Language = { name: string; color: string | null };

export type TopRepo = {
  name: string;
  url: string;
  language: Language | null;
  commitCount: number;
  stars: number;
  description: string | null;
  pushedAt: string;
};

export type LanguageStat = Language & { percent: number };

export type RepoStats = {
  totalCount: number;
  languages: LanguageStat[];
};

export type GitHubEventType =
  | "PushEvent"
  | "PullRequestEvent"
  | "CreateEvent"
  | "IssuesEvent"
  | "PublicEvent"
  | "WatchEvent"
  | "ForkEvent"
  | "ReleaseEvent";

export type GitHubEvent = {
  type: GitHubEventType;
  /** Number of merged consecutive pushes, set by collapsePushes. */
  count?: number;
  repo: string;
  title: string;
  /** Muted secondary line under the title — a PR/issue title, push count, or repo name. */
  detail?: string;
  url: string;
  createdAt: string;
};

export type ProfileStats = { followers: number; following: number; publicRepos: number };

export type GitHubData = {
  calendar: Calendar | null;
  topRepos: TopRepo[] | null;
  repoStats: RepoStats | null;
  events: GitHubEvent[] | null;
  profileStats: ProfileStats | null;
};

// GitHub already buckets contributionLevel relative to the user's own activity —
// map it straight to an index instead of re-deriving buckets from raw counts.
function levelToIndex(level: string): ContributionLevel {
  return (level in CONTRIBUTION_LEVELS
    ? CONTRIBUTION_LEVELS[level as keyof typeof CONTRIBUTION_LEVELS]
    : 0) as ContributionLevel;
}

function computeStreaks(days: ContributionDay[]) {
  let longestStreak = 0;
  let run = 0;
  for (const day of days) {
    if (day.count > 0) {
      run++;
      longestStreak = Math.max(longestStreak, run);
    } else {
      run = 0;
    }
  }

  // Current streak walks backward from the most recent day. The most recent
  // day (today) may legitimately still be at zero because the day isn't over
  // yet, so a single trailing zero doesn't break an otherwise-active streak —
  // but two zeros in a row (today AND yesterday) means the streak is over.
  let currentStreak = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  for (; i >= 0 && days[i].count > 0; i--) currentStreak++;

  return { longestStreak, currentStreak };
}

function findBusiestDay(days: ContributionDay[]): { date: string; count: number } | null {
  let busiest: ContributionDay | null = null;
  for (const day of days) {
    if (day.count > 0 && (!busiest || day.count > busiest.count)) busiest = day;
  }
  return busiest ? { date: busiest.date, count: busiest.count } : null;
}

type GraphQLDay = { date: string; contributionCount: number; contributionLevel: string; weekday: number };
type GraphQLRepoNode = {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: Language | null;
  pushedAt: string;
};
type GraphQLResponse = {
  data?: {
    user: {
      followers: { totalCount: number };
      following: { totalCount: number };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: GraphQLDay[] }[];
        };
        commitContributionsByRepository: {
          repository: {
            name: string;
            url: string;
            stargazerCount: number;
            description: string | null;
            pushedAt: string;
            primaryLanguage: Language | null;
          };
          contributions: { totalCount: number };
        }[];
      };
      repositories: { totalCount: number; nodes: GraphQLRepoNode[] };
    } | null;
  };
  errors?: unknown[];
};

async function fetchGraphQL(
  token: string,
  login: string,
): Promise<{ calendar: Calendar; topRepos: TopRepo[]; repoStats: RepoStats; profileStats: ProfileStats }> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { login } }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub GraphQL responded ${res.status}`);

  const json = (await res.json()) as GraphQLResponse;
  if (json.errors?.length) throw new Error(`GitHub GraphQL returned errors: ${JSON.stringify(json.errors)}`);
  const user = json.data?.user;
  if (!user) throw new Error("GitHub GraphQL returned no user");

  const weeks = user.contributionsCollection.contributionCalendar.weeks.map((week) =>
    week.contributionDays.map(
      (d): ContributionDay => ({
        date: d.date,
        count: d.contributionCount,
        level: levelToIndex(d.contributionLevel),
        weekday: d.weekday,
      }),
    ),
  );
  const allDays = weeks.flat();
  const { longestStreak, currentStreak } = computeStreaks(allDays);

  const calendar: Calendar = {
    totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
    weeks,
    longestStreak,
    currentStreak,
    busiestDay: findBusiestDay(allDays),
  };

  const topRepos: TopRepo[] = user.contributionsCollection.commitContributionsByRepository
    .map((c) => ({
      name: c.repository.name,
      url: c.repository.url,
      language: c.repository.primaryLanguage,
      commitCount: c.contributions.totalCount,
      stars: c.repository.stargazerCount,
      description: c.repository.description,
      pushedAt: c.repository.pushedAt,
    }))
    .sort((a, b) => b.commitCount - a.commitCount);

  const languageCounts = new Map<string, { color: string | null; count: number }>();
  for (const node of user.repositories.nodes) {
    if (!node.primaryLanguage) continue;
    const existing = languageCounts.get(node.primaryLanguage.name);
    if (existing) existing.count++;
    else languageCounts.set(node.primaryLanguage.name, { color: node.primaryLanguage.color, count: 1 });
  }
  const languageTotal = [...languageCounts.values()].reduce((sum, l) => sum + l.count, 0);
  const languages: LanguageStat[] = [...languageCounts.entries()]
    .map(([name, { color, count }]) => ({
      name,
      color,
      percent: languageTotal > 0 ? (count / languageTotal) * 100 : 0,
    }))
    .sort((a, b) => b.percent - a.percent);

  const repoStats: RepoStats = { totalCount: user.repositories.totalCount, languages };

  const profileStats: ProfileStats = {
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    publicRepos: user.repositories.totalCount,
  };

  return { calendar, topRepos, repoStats, profileStats };
}

const KNOWN_EVENT_TYPES = new Set([
  "PushEvent",
  "PullRequestEvent",
  "CreateEvent",
  "IssuesEvent",
  "PublicEvent",
  "WatchEvent",
  "ForkEvent",
  "ReleaseEvent",
]);

/** Strip the owner prefix — every repo in this feed belongs to the same user. */
function shortRepo(fullName: string): string {
  return fullName.split("/").pop() ?? fullName;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Minimal shape of the fields we read off each raw REST event payload.
type RawGitHubEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, unknown>;
};

function normalizeEvent(e: RawGitHubEvent): GitHubEvent | null {
  const repoUrl = `https://github.com/${e.repo.name}`;
  const payload = e.payload;

  switch (e.type) {
    case "PushEvent": {
      // NOTE: /users/:login/events/public returns PushEvent payloads WITHOUT `size`,
      // `distinct_size` or a `commits` array — verified against the live API. The old
      // code defaulted those to 0 and rendered "pushed 0 commits", stating a number
      // GitHub never gave us. There is no commit count available here, so don't claim
      // one; consecutive pushes get collapsed into a count of PUSHES by collapsePushes.
      const name = shortRepo(e.repo.name);
      return {
        type: "PushEvent",
        repo: e.repo.name,
        title: `Pushed to ${name}`,
        detail: name,
        url: repoUrl,
        createdAt: e.created_at,
      };
    }
    case "PullRequestEvent": {
      const pr = payload.pull_request as { title?: string; html_url?: string } | undefined;
      const action = typeof payload.action === "string" ? payload.action : "updated";
      return {
        type: "PullRequestEvent",
        repo: e.repo.name,
        title: `${capitalize(action)} pull request`,
        detail: pr?.title ?? shortRepo(e.repo.name),
        url: pr?.html_url ?? repoUrl,
        createdAt: e.created_at,
      };
    }
    case "CreateEvent": {
      const refType = typeof payload.ref_type === "string" ? payload.ref_type : "repository";
      const ref = typeof payload.ref === "string" ? payload.ref : null;
      const name = shortRepo(e.repo.name);
      return {
        type: "CreateEvent",
        repo: e.repo.name,
        title: `Created ${refType} ${ref ?? name}`,
        detail: name,
        url: repoUrl,
        createdAt: e.created_at,
      };
    }
    case "IssuesEvent": {
      const issue = payload.issue as { title?: string; html_url?: string } | undefined;
      const action = typeof payload.action === "string" ? payload.action : "updated";
      return {
        type: "IssuesEvent",
        repo: e.repo.name,
        title: `${capitalize(action)} issue`,
        detail: issue?.title ?? shortRepo(e.repo.name),
        url: issue?.html_url ?? repoUrl,
        createdAt: e.created_at,
      };
    }
    case "PublicEvent": {
      const name = shortRepo(e.repo.name);
      return {
        type: "PublicEvent",
        repo: e.repo.name,
        title: `Open-sourced ${name}`,
        detail: name,
        url: repoUrl,
        createdAt: e.created_at,
      };
    }
    case "WatchEvent": {
      const name = shortRepo(e.repo.name);
      return {
        type: "WatchEvent",
        repo: e.repo.name,
        title: `Starred ${name}`,
        detail: name,
        url: repoUrl,
        createdAt: e.created_at,
      };
    }
    case "ForkEvent": {
      const name = shortRepo(e.repo.name);
      return {
        type: "ForkEvent",
        repo: e.repo.name,
        title: `Forked ${name}`,
        detail: name,
        url: repoUrl,
        createdAt: e.created_at,
      };
    }
    case "ReleaseEvent": {
      const release = payload.release as { tag_name?: string; html_url?: string } | undefined;
      const name = shortRepo(e.repo.name);
      return {
        type: "ReleaseEvent",
        repo: e.repo.name,
        title: release?.tag_name ? `Released ${release.tag_name}` : `Released in ${name}`,
        detail: name,
        url: release?.html_url ?? repoUrl,
        createdAt: e.created_at,
      };
    }
    default:
      return null;
  }
}

/**
 * Collapse runs of consecutive pushes to the same repo into one entry. This feed is
 * overwhelmingly PushEvents (27 of 30 on a typical fetch), so without this the panel
 * is a dozen identical "pushed to raft-kv" rows. Only CONSECUTIVE runs merge, which
 * preserves chronology — an interleaved push/PR/push sequence stays in order.
 */
function collapsePushes(events: GitHubEvent[]): GitHubEvent[] {
  const out: GitHubEvent[] = [];
  for (const event of events) {
    const prev = out[out.length - 1];
    if (event.type === "PushEvent" && prev?.type === "PushEvent" && prev.repo === event.repo) {
      const count = (prev.count ?? 1) + 1;
      // Keep the run's newest timestamp (events arrive newest-first, so prev's).
      out[out.length - 1] = {
        ...prev,
        count,
        title: `Pushed to ${shortRepo(prev.repo)}`,
        detail: `${count} pushes`,
      };
      continue;
    }
    out.push(event);
  }
  return out;
}

async function fetchEvents(token: string, login: string): Promise<GitHubEvent[]> {
  const res = await fetch(`https://api.github.com/users/${login}/events/public?per_page=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub events responded ${res.status}`);

  const raw = (await res.json()) as RawGitHubEvent[];
  const normalized: GitHubEvent[] = [];
  for (const e of raw) {
    if (!KNOWN_EVENT_TYPES.has(e.type)) continue;
    const event = normalizeEvent(e);
    if (event) normalized.push(event);
  }
  // Collapse BEFORE truncating — capping first would fill the list with a single
  // repo's push run and drop the more interesting events sitting behind it.
  return collapsePushes(normalized).slice(0, 10);
}

/**
 * Fetches everything the GitHub panel needs. Never throws: on total failure
 * (no token) it resolves to null; on partial failure each affected piece
 * resolves to null while the rest of the data still renders.
 */
export async function getGitHubData(): Promise<GitHubData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("[github] GITHUB_TOKEN is not set; skipping live GitHub data.");
    return null;
  }
  const login = process.env.GITHUB_LOGIN ?? "Krithik-sri";

  const [graphqlResult, eventsResult] = await Promise.allSettled([
    fetchGraphQL(token, login),
    fetchEvents(token, login),
  ]);

  let calendar: Calendar | null = null;
  let topRepos: TopRepo[] | null = null;
  let repoStats: RepoStats | null = null;
  let profileStats: ProfileStats | null = null;
  if (graphqlResult.status === "fulfilled") {
    ({ calendar, topRepos, repoStats, profileStats } = graphqlResult.value);
  } else {
    console.warn("[github] contribution/repository fetch failed:", graphqlResult.reason);
  }

  let events: GitHubEvent[] | null = null;
  if (eventsResult.status === "fulfilled") {
    events = eventsResult.value;
  } else {
    console.warn("[github] activity feed fetch failed:", eventsResult.reason);
  }

  return { calendar, topRepos, repoStats, events, profileStats };
}
