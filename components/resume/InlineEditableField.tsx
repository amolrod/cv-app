"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { useInlineExperience } from "@/providers/inline-experience-provider";

type InlineEditableFieldProps = {
  value: string;
  onSave: (value: string) => void;
  placeholder: string;
  className?: string;
  multiline?: boolean;
  experienceId: string;
  ariaLabel: string;
  autoFocus?: boolean;
};

export const InlineEditableField = ({
  value,
  onSave,
  placeholder,
  className,
  multiline = false,
  experienceId,
  ariaLabel,
  autoFocus = false,
}: InlineEditableFieldProps) => {
  const { activeExperienceId, setActiveExperienceId } = useInlineExperience();
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const shouldAutoFocus = autoFocus && activeExperienceId === experienceId;

  const assignRef = (node: HTMLInputElement | HTMLTextAreaElement | null) => {
    inputRef.current = node;
  };

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (shouldAutoFocus && inputRef.current) {
      inputRef.current.focus();
      if ("select" in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [shouldAutoFocus]);

  const commit = () => {
    const normalized = draft.trim();
    if (normalized !== value.trim()) {
      onSave(normalized);
    } else if (draft !== value) {
      setDraft(value);
    }
    setActiveExperienceId(null);
  };

  const cancel = () => {
    setDraft(value);
    setActiveExperienceId(null);
    inputRef.current?.blur();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !(multiline && event.shiftKey)) {
      event.preventDefault();
      commit();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDraft(event.target.value);
  };

  const baseClass = cn(
    "w-full rounded-lg border border-transparent bg-white px-2 py-1 text-inherit font-inherit leading-[inherit] text-current transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-white",
    className
  );

  if (multiline) {
    return (
      <textarea
        ref={assignRef}
        value={draft}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(baseClass, "resize-none")}
        rows={2}
        spellCheck={false}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={commit}
        onFocus={() => setActiveExperienceId(experienceId)}
        autoFocus={shouldAutoFocus}
      />
    );
  }

  return (
    <input
      ref={assignRef}
      value={draft}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={cn(baseClass, "inline-flex")}
      spellCheck={false}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={commit}
      onFocus={() => setActiveExperienceId(experienceId)}
      autoFocus={shouldAutoFocus}
    />
  );
};
