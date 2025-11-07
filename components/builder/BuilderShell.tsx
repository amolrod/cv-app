"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  LayoutTemplate,
  Palette,
  Printer,
  Sparkles,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { ProfileForm } from "@/components/builder/ProfileForm";
import {
  ExperienceFormHandle,
  ExperienceFormList,
} from "@/components/builder/ExperienceFormList";
import { ProjectsFormList } from "@/components/builder/ProjectsFormList";
import { EducationFormList } from "@/components/builder/EducationFormList";
import { SkillsLanguagesForm } from "@/components/builder/SkillsLanguagesForm";
import { JDMatcherPanel } from "@/components/builder/JDMatcherPanel";
import { ResumePage } from "@/components/resume/ResumePage";
import { ACCENT_PRESETS, FONT_PRESETS } from "@/lib/defaults";
import { useCv } from "@/providers/cv-provider";
import { normalizeState } from "@/utils/state";
import { BuilderState, FontPreset, TemplateId } from "@/types/cv";

type Status = {
  kind: "success" | "error";
  message: string;
};

export const BuilderShell = () => {
  const { state, updateUi, addExperience, reset, hydrated } = useCv();
  const experienceRef = useRef<ExperienceFormHandle>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(null), 4000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleTemplateChange = (value: string) => {
    updateUi({ template: value as TemplateId });
  };

  const handleFontChange = (value: string) => {
    updateUi({ fontPreset: Number(value) as FontPreset });
  };

  const handleAccentChange = (value: string) => {
    updateUi({ accent: value });
  };

  const handleBaseSizeChange = (values: number[]) => {
    const [size] = values;
    updateUi({ baseSizePt: size });
  };

  const handleCompactToggle = () => {
    updateUi({ compact: !state.ui.compact });
  };

  const handleExportJson = () => {
    const payload = JSON.stringify(state, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "curriculum-maker.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus({ kind: "success", message: "Datos exportados correctamente." });
  };

  const handleImportTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const raw = JSON.parse(text) as Partial<BuilderState>;
      const normalized = normalizeState(raw);
      reset(normalized);
      setStatus({ kind: "success", message: "Importación completada." });
    } catch (error) {
      console.error(error);
      setStatus({ kind: "error", message: "No se pudo importar el archivo." });
    } finally {
      event.target.value = "";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const compactLabel = useMemo(
    () => (state.ui.compact ? "Compacto activado" : "Modo compacto"),
    [state.ui.compact]
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Cargando datos del CV...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 py-10">
      <header className="no-print mx-auto w-full max-w-6xl rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-lg shadow-slate-900/10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Curriculum Maker
            </p>
            <h1 className="resume-heading text-2xl font-semibold text-slate-900">
              Editor profesional de CV
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline" onClick={addExperience}>
              Añadir experiencia
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => experienceRef.current?.openAssistant()}
            >
              <Sparkles className="mr-2 h-4 w-4" /> Añadir logro
            </Button>
            <Button type="button" variant="outline" onClick={handleExportJson}>
              <Download className="mr-2 h-4 w-4" /> Exportar JSON
            </Button>
            <Button type="button" variant="outline" onClick={handleImportTrigger}>
              <Upload className="mr-2 h-4 w-4" /> Importar JSON
            </Button>
            <Button type="button" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Imprimir / PDF
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleImportFile}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_auto_auto_auto] md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <LayoutTemplate className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <Select value={state.ui.template} onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Plantilla" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Mejor práctica (ATS)</SelectItem>
                <SelectItem value="classic">Clásico</SelectItem>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="visual2col">Visual Pro (2 columnas)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Palette className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <Input
              type="color"
              value={state.ui.accent}
              onChange={(event) => handleAccentChange(event.target.value)}
              className="h-9 w-16 cursor-pointer rounded-md border border-slate-200 p-1"
            />
            <div className="flex flex-wrap gap-2">
              {ACCENT_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  className="h-8 w-8 rounded-full border border-slate-200"
                  style={{ backgroundColor: preset.value }}
                  onClick={() => handleAccentChange(preset.value)}
                  aria-label={`Usar color ${preset.label}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase text-slate-500">
              Fuente
            </span>
            <Select
              value={String(state.ui.fontPreset)}
              onValueChange={handleFontChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Fuente" />
              </SelectTrigger>
              <SelectContent>
                {FONT_PRESETS.map((preset) => (
                  <SelectItem key={preset.id} value={String(preset.id)}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase text-slate-500">
              Tamaño base ({state.ui.baseSizePt} pt)
            </span>
            <Slider
              min={10}
              max={13}
              step={0.5}
              value={[state.ui.baseSizePt]}
              onValueChange={handleBaseSizeChange}
              className="w-40"
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-medium uppercase text-slate-500">
              Densidad
            </span>
            <Toggle
              pressed={state.ui.compact}
              onPressedChange={handleCompactToggle}
              variant="outline"
            >
              {compactLabel}
            </Toggle>
          </div>
        </div>

        {status ? (
          <div
            role="status"
            className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
              status.kind === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {status.message}
          </div>
        ) : null}
      </header>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="no-print space-y-6">
          <ProfileForm />
          <ExperienceFormList ref={experienceRef} />
          <ProjectsFormList />
          <EducationFormList />
          <SkillsLanguagesForm />
          <JDMatcherPanel />
        </div>
        <div className="sticky top-8 flex flex-col gap-4 self-start">
          <ResumePage />
          <div className="no-print rounded-3xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm">
            <p className="font-semibold text-slate-700">
              Consejos para exportar a PDF
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Usa el botón &quot;Imprimir / PDF&quot; y selecciona &quot;Guardar como PDF&quot;.</li>
              <li>Configura el tamaño a A4, sin márgenes adicionales y sin encabezados/pies del navegador.</li>
              <li>Activa la opción de &quot;Gráficos de fondo&quot; para mantener colores y acentos.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
