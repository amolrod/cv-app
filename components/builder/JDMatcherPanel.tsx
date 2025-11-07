"use client";

import { BadgeCheck, ClipboardPaste, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/components/builder/FormSection";
import { useCv } from "@/providers/cv-provider";
import { computeMatch } from "@/utils/jd";

const formatKeyword = (keyword: string) => keyword.replace(/[-_]/g, " ");

export const JDMatcherPanel = () => {
  const {
    state,
    setJdText,
    updateProfile,
  } = useCv();

  const match = computeMatch(state.jdText, state.data);

  const appendToSkills = (keyword: string) => {
    const current = state.data.profile.skills ?? "";
    const addition = keyword;
    const separator = current.trim().endsWith(",") || current.trim().endsWith(";") || current.trim().length === 0 ? "" : ", ";
    const next = `${current}${separator}${addition}`.trim();
    updateProfile({ skills: next });
  };

  const appendToTarget = (keyword: string) => {
    const current = state.data.profile.target ?? "";
    const connector = current.trim().length ? ". " : "";
    const next = `${current}${connector}Incluir ${keyword}`.trim();
    updateProfile({ target: next });
  };

  return (
    <FormSection
      title="JD Matcher"
      description="Pega la descripción de la oferta para identificar palabras clave faltantes."
    >
      <div className="space-y-3">
        <Label htmlFor="jd-text">Texto de la oferta</Label>
        <Textarea
          id="jd-text"
          value={state.jdText}
          onChange={(event) => setJdText(event.target.value)}
          placeholder="Pega aquí la descripción de la oferta..."
          rows={6}
        />
      </div>

  <div className="mt-6 rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 p-6 shadow-lg backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
              Coincidencia estimada con la oferta
            </p>
            <p className="mt-1 bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-4xl font-extrabold text-transparent">
              {match.score}%
            </p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-2 rounded-2xl border-2 border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-md">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              {match.matched.length} coincidencias
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl border-2 border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-amber-700 shadow-md">
              <Target className="h-4 w-4" aria-hidden="true" />
              {match.missing.length} pendientes
            </span>
          </div>
        </div>

        {match.missing.length ? (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-medium text-emerald-800">
              Palabras clave que aún no aparecen en el CV. Pulsa para insertarlas en habilidades o en el objetivo.
            </p>
            <div className="flex flex-wrap gap-2.5" role="list">
              {match.missing.map((keyword) => (
                <div
                  key={keyword}
                  role="listitem"
                  className="group inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-md transition-all hover:border-slate-300 hover:shadow-lg hover:scale-105"
                >
                  {formatKeyword(keyword)}
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    className="text-emerald-700 transition-transform hover:scale-110"
                    aria-label={`Añadir ${formatKeyword(keyword)} a habilidades`}
                    onClick={() => appendToSkills(keyword)}
                  >
                    <ClipboardPaste className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    className="text-slate-700"
                    aria-label={`Añadir ${formatKeyword(keyword)} al objetivo`}
                    onClick={() => appendToTarget(keyword)}
                  >
                    <Target className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">
            ¡Buen trabajo! No detectamos keywords críticas pendientes ahora mismo.
          </p>
        )}
      </div>
    </FormSection>
  );
};
