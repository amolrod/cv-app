"use client";

import { BuilderShell } from "@/components/builder/BuilderShell";
import { CvProvider } from "@/providers/cv-provider";

export default function BuilderPage() {
  return (
    <CvProvider>
      <BuilderShell />
    </CvProvider>
  );
}
