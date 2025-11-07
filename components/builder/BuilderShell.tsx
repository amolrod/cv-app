"use client";

import {
  ChangeEvent,
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Download,
  LayoutTemplate,
  Palette,
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
import {
  InlineExperienceProvider,
  useInlineExperience,
} from "@/providers/inline-experience-provider";
import { normalizeState } from "@/utils/state";
import { BuilderState, FontPreset, TemplateId } from "@/types/cv";

type Status = {
  kind: "success" | "error";
  message: string;
};

type AccentStyle = CSSProperties & { "--accent"?: string };

export const BuilderShell = () => {
  return (
    <InlineExperienceProvider>
      <BuilderShellInner />
    </InlineExperienceProvider>
  );
};

const BuilderShellInner = () => {
  const { state, updateUi, addExperience, reset, hydrated } = useCv();
  const { activeExperienceId, setActiveExperienceId } = useInlineExperience();
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

  const handleAddExperience = () => {
    const newId = addExperience();
    setActiveExperienceId(newId);
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

  const handleDownloadPDF = () => {
    // Trigger print dialog which allows saving as PDF
    window.print();
  };

  const compactLabel = useMemo(
    () => (state.ui.compact ? "Compacto activado" : "Modo compacto"),
    [state.ui.compact]
  );

  const accentStyle = useMemo<AccentStyle>(
    () => ({ "--accent": state.ui.accent }),
    [state.ui.accent]
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Cargando datos del CV...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col gap-10 py-12 px-4 animate-fade-in-up" style={accentStyle}>
      <header className="no-print mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-2xl backdrop-blur-xl backdrop-saturate-150 transition-all hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]">
          {/* Decorative gradient orbs */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-[var(--accent)]/10 to-purple-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/10 to-[var(--accent)]/10 blur-3xl" />
          
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] shadow-lg shadow-[var(--accent)]/30">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--accent)]">
                  Curriculum Maker
                </p>
                <h1 className="resume-heading mt-1 text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  Editor profesional de CV
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="secondary" size="default" onClick={handleAddExperience} className="shadow-md hover:shadow-lg transition-all">
                Añadir experiencia
              </Button>
              <Button type="button" variant="secondary" size="default" onClick={handleExportJson} className="shadow-md hover:shadow-lg transition-all">
                <Download className="mr-2 h-4 w-4" /> Exportar JSON
              </Button>
              <Button type="button" variant="secondary" size="default" onClick={handleImportTrigger} className="shadow-md hover:shadow-lg transition-all">
                <Upload className="mr-2 h-4 w-4" /> Importar JSON
              </Button>
              <Button type="button" variant="primary" onClick={handleDownloadPDF} className="shadow-lg hover:shadow-xl transition-all">
                <Download className="mr-2 h-4 w-4" /> Descargar PDF
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
        </div>

        <div className="relative mt-8 grid gap-4 md:grid-cols-[1fr_auto_auto_auto_auto] md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-sm">
              <LayoutTemplate className="h-4 w-4 text-slate-600" aria-hidden="true" />
            </div>
            <Select value={state.ui.template} onValueChange={handleTemplateChange}>
              <SelectTrigger
                aria-label="Seleccionar plantilla"
                className="min-w-[220px] border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white transition-all"
              >
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-sm">
              <Palette className="h-4 w-4 text-slate-600" aria-hidden="true" />
            </div>
            <Input
              type="color"
              value={state.ui.accent}
              onChange={(event) => handleAccentChange(event.target.value)}
              className="h-10 w-16 cursor-pointer rounded-xl border border-slate-200/80 bg-white/80 p-1 shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
            />
            <div className="flex flex-wrap gap-2">
              {ACCENT_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  className="group relative h-10 w-10 overflow-hidden rounded-xl border-2 border-white shadow-md transition-all hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  style={{ backgroundColor: preset.value }}
                  onClick={() => handleAccentChange(preset.value)}
                  aria-label={`Usar color ${preset.label}`}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Fuente
            </span>
            <Select
              value={String(state.ui.fontPreset)}
              onValueChange={handleFontChange}
            >
              <SelectTrigger
                aria-label="Seleccionar tipografía"
                className="min-w-[200px] border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white transition-all"
              >
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
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
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
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Densidad
            </span>
            <Toggle
              pressed={state.ui.compact}
              onPressedChange={handleCompactToggle}
              variant="outline"
              className="shadow-sm hover:shadow-md transition-all"
            >
              {compactLabel}
            </Toggle>
          </div>
        </div>

        {status ? (
          <div
            role="status"
            className={`mt-6 rounded-2xl px-5 py-4 text-sm font-medium shadow-lg backdrop-blur-sm ${
              status.kind === "success"
                ? "bg-gradient-to-r from-emerald-50 to-emerald-100/80 text-emerald-800 border border-emerald-200"
                : "bg-gradient-to-r from-rose-50 to-rose-100/80 text-rose-800 border border-rose-200"
            }`}
          >
            {status.message}
          </div>
        ) : null}
      </header>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
        <div className="no-print space-y-6 stagger-children">
          <ProfileForm />
          <ExperienceFormList ref={experienceRef} />
          <ProjectsFormList />
          <EducationFormList />
          <SkillsLanguagesForm />
          <JDMatcherPanel />
        </div>
        <div className="sticky top-6 flex flex-col gap-6 self-start">
          <ResumePage activeExperienceId={activeExperienceId} />
          <div className="no-print group relative overflow-hidden rounded-3xl border border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/10 blur-2xl transition-all group-hover:scale-110" />
            <div className="relative">
              <p className="flex items-center gap-2 font-bold text-blue-900">
                <Download className="h-4 w-4" />
                Exportar a PDF (A4)
              </p>
              <ul className="mt-3 space-y-2 text-sm text-blue-800/90">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-700">1</span>
                  <span>Haz clic en el botón <strong>&quot;Descargar PDF&quot;</strong> en la barra superior.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-700">2</span>
                  <span>Selecciona <strong>&quot;Guardar como PDF&quot;</strong> como destino de impresión.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-700">3</span>
                  <span>Configura el tamaño a <strong>A4</strong>, sin márgenes adicionales y sin encabezados/pies de página.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-700">4</span>
                  <span>Activa <strong>&quot;Gráficos de fondo&quot;</strong> para mantener colores y acentos del diseño.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
