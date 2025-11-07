import { Profile } from "@/types/cv";

const contactEntries = (profile: Profile) => {
  const entries: { label: string; value: string; href?: string }[] = [];
  if (profile.email) {
    entries.push({ label: "Email", value: profile.email, href: `mailto:${profile.email}` });
  }
  if (profile.phone) {
    entries.push({ label: "Tel", value: profile.phone, href: `tel:${profile.phone}` });
  }
  if (profile.location) {
    entries.push({ label: "Ubicación", value: profile.location });
  }
  if (profile.website) {
    entries.push({ label: "Website", value: profile.website.replace(/^https?:\/\//, ""), href: profile.website });
  }
  if (profile.linkedin) {
    entries.push({ label: "LinkedIn", value: profile.linkedin.replace(/^https?:\/\//, ""), href: profile.linkedin });
  }
  if (profile.github) {
    entries.push({ label: "GitHub", value: profile.github.replace(/^https?:\/\//, ""), href: profile.github });
  }
  return entries;
};

type ContactRowProps = {
  profile: Profile;
};

export const ContactRow = ({ profile }: ContactRowProps) => {
  const entries = contactEntries(profile);
  if (!entries.length) return null;

  return (
    <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-[0.85em] text-slate-600">
      {entries.map((entry, index) => (
        <li key={`${entry.label}-${index}`} className="flex items-center gap-1">
          <span className="font-semibold text-slate-700">{entry.label}:</span>
          {entry.href ? (
            <a href={entry.href} className="text-slate-600 hover:text-slate-800">
              {entry.value}
            </a>
          ) : (
            <span>{entry.value}</span>
          )}
        </li>
      ))}
    </ul>
  );
};
