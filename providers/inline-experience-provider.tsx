"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type InlineExperienceContextValue = {
  activeExperienceId: string | null;
  setActiveExperienceId: (id: string | null) => void;
};

const InlineExperienceContext = createContext<InlineExperienceContextValue | null>(
  null
);

export const InlineExperienceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeExperienceId, setActiveExperienceId] = useState<string | null>(
    null
  );

  const value = useMemo(
    () => ({ activeExperienceId, setActiveExperienceId }),
    [activeExperienceId]
  );

  return (
    <InlineExperienceContext.Provider value={value}>
      {children}
    </InlineExperienceContext.Provider>
  );
};

export const useInlineExperience = () => {
  const context = useContext(InlineExperienceContext);
  if (!context) {
    throw new Error(
      "useInlineExperience debe usarse dentro de InlineExperienceProvider"
    );
  }
  return context;
};
