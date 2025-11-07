## Curriculum Maker

Aplicación web para crear currículums de desarrollador con enfoque ATS, plantillas profesionales y exportación optimizada a PDF.

### Stack principal
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui + lucide-react
- Google Fonts (Montserrat, Lato, Poppins, Inter, Nunito Sans)

### Características clave
- Editor lateral con formularios dinámicos para perfil, experiencia, educación, proyectos y habilidades.
- Plantillas seleccionables (Mejor práctica ATS, Clásico, Simple, Visual 2 columnas) con controles para tipografía, color de acento, tamaño base y modo compacto.
- Asistente de logros basado en fórmula STAR y gestor de bullets con reordenamiento.
- Panel JD Matcher con tokenizador ES/EN, cálculo de % de match y sugerencias rápidas para insertar keywords.
- Exportación/Importación de datos en JSON y flujo guiado para imprimir/guardar en PDF con layout A4.
- Persistencia automática en `localStorage` y preparado para futura exportación server-side (`/api/export`).

### Desarrollo local
```bash
npm install
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000) para ver la landing y accede a `/builder` para usar el editor.

### Scripts disponibles
- `npm run dev`: arranca el entorno de desarrollo con Turbopack.
- `npm run build`: genera el build de producción.
- `npm run start`: sirve el build generado.
- `npm run lint`: ejecuta ESLint sobre el proyecto.

### Estructura destacada
- `app/`: rutas (`/` landing, `/builder`, `/api/export`).
- `components/builder`: formularios y shell del editor.
- `components/resume`: plantillas imprimibles y componentes de sección.
- `providers/`: contextos y estado global del CV.
- `utils/`: normalización, almacenamiento, JD matcher y helpers.
- `lib/defaults.ts`: presets de UI, fonts y datos de ejemplo.

### Exportar a PDF
Usa el botón **Imprimir / PDF** del editor y selecciona *Guardar como PDF*. Configura:
1. Tamaño A4 sin márgenes adicionales.
2. Desactiva encabezados/pies del navegador.
3. Activa “Gráficos de fondo” para conservar acentos.

La ruta `POST /api/export` devuelve actualmente un estado `501` como placeholder para una futura exportación server-side con Playwright o Puppeteer.
