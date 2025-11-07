import { CVData } from "@/types/cv";

const STOPWORDS = new Set([
  "a",
  "ante",
  "bajo",
  "cabe",
  "con",
  "contra",
  "de",
  "desde",
  "durante",
  "en",
  "entre",
  "hacia",
  "hasta",
  "mediante",
  "para",
  "por",
  "según",
  "sin",
  "sobre",
  "tras",
  "un",
  "una",
  "unos",
  "unas",
  "el",
  "la",
  "los",
  "las",
  "lo",
  "al",
  "del",
  "y",
  "o",
  "u",
  "pero",
  "que",
  "se",
  "su",
  "sus",
  "es",
  "son",
  "ser",
  "ha",
  "han",
  "haber",
  "como",
  "más",
  "menos",
  "muy",
  "esto",
  "esta",
  "estas",
  "estos",
  "the",
  "and",
  "for",
  "with",
  "from",
  "into",
  "your",
  "you",
  "are",
  "our",
  "their",
  "was",
  "were",
  "over",
  "about",
  "will",
  "shall",
  "should",
  "can",
  "could",
  "would",
  "may",
  "might",
  "than",
  "then",
  "them",
  "they",
  "this",
  "that",
  "these",
  "those",
  "of",
  "on",
  "in",
  "by",
  "at",
  "to",
  "be",
  "is",
  "it",
  "we"
]);

const sanitize = (token: string) => token.replace(/[^a-z0-9+#\.\-]/gi, "").toLowerCase();

export const tokenize = (text: string) => {
  return text
    .split(/\s+/)
    .map(sanitize)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
};

export const uniqueTokens = (tokens: string[]) => {
  const seen = new Set<string>();
  const unique: string[] = [];
  tokens.forEach((token) => {
    if (!seen.has(token)) {
      seen.add(token);
      unique.push(token);
    }
  });
  return unique;
};

export const extractKeywords = (text: string) => uniqueTokens(tokenize(text));

export const buildCvKeywordCorpus = (data: CVData) => {
  const parts: string[] = [];
  const profile = data.profile;
  parts.push(
    profile.title,
    profile.summary ?? "",
    profile.target ?? "",
    profile.skills ?? "",
    profile.languages ?? ""
  );

  data.experience.forEach((exp) => {
    parts.push(exp.company, exp.role, exp.bullets.join(" "));
  });

  data.education.forEach((edu) => {
    parts.push(edu.school, edu.degree, edu.details ?? "");
  });

  data.projects.forEach((proj) => {
    parts.push(proj.name, proj.role ?? "", proj.description, proj.technologies ?? "");
  });

  return parts.join(" ");
};

export const computeMatch = (jdText: string, data: CVData) => {
  const jdKeywords = extractKeywords(jdText);
  if (jdKeywords.length === 0) {
    return {
      score: 0,
      matched: [] as string[],
      missing: [] as string[],
      keywords: [] as string[],
    };
  }

  const cvKeywords = uniqueTokens(tokenize(buildCvKeywordCorpus(data)));
  const matched: string[] = [];
  const missing: string[] = [];

  jdKeywords.forEach((keyword) => {
    if (cvKeywords.includes(keyword)) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  const score = Math.round((matched.length / jdKeywords.length) * 100);

  return { score, matched, missing, keywords: jdKeywords };
};
