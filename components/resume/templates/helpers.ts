export const interpretEndValue = (rawValue: string) => {
  const normalized = rawValue.trim().toLowerCase();
  if (!normalized) {
    return { end: "", current: false } as const;
  }
  if (["actualidad", "presente", "present", "current"].includes(normalized)) {
    return { end: "", current: true } as const;
  }
  return { end: rawValue.trim(), current: false } as const;
};
