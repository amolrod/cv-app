const ensureProtocol = (value: string) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
};

export const normalizeGithub = (value?: string) => {
  if (!value) return "";
  const trimmed = value.trim().replace(/^@/, "");
  if (trimmed.length === 0) return "";

  if (trimmed.includes("github.com")) {
    return ensureProtocol(trimmed);
  }

  const slug = trimmed.replace(/^https?:\/\//i, "").replace(/github.com\/?/, "");
  return `https://github.com/${slug}`;
};

export const normalizeLinkedIn = (value?: string) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (trimmed.length === 0) return "";

  if (trimmed.includes("linkedin.com")) {
    return ensureProtocol(trimmed);
  }

  const slug = trimmed.replace(/^@/, "").replace(/^in\//, "");
  return `https://www.linkedin.com/in/${slug}`;
};

export const normalizeWebsite = (value?: string) => {
  if (!value) return "";
  return ensureProtocol(value.trim());
};

export const normalizeLink = (type: "github" | "linkedin" | "website", value?: string) => {
  switch (type) {
    case "github":
      return normalizeGithub(value);
    case "linkedin":
      return normalizeLinkedIn(value);
    case "website":
      return normalizeWebsite(value);
    default:
      return value ?? "";
  }
};
