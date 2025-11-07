import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="max-w-3xl text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Curriculum Maker
        </span>
        <h1 className="resume-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Crea currículums impecables y listos para ATS en minutos
        </h1>
        <p className="mt-6 text-lg text-balance text-slate-600">
          Diseña, edita y exporta tu CV en formato A4 con plantillas optimizadas para procesos de selección. Controla cada detalle, desde el tono y la tipografía hasta el ajuste perfecto para impresión y PDF.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-700/30 transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Crear CV ahora
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            Ver plantillas
          </Link>
        </div>
        <p className="mt-12 text-sm text-slate-500">
          Exportación directa a PDF, compatibilidad con ATS y controles avanzados para personalizar cada sección.
        </p>
      </div>
    </main>
  );
}
