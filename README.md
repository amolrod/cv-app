# CV App — editor de currículums
Aplicación en Next.js para crear un CV, adaptar sus palabras clave a una oferta y exportarlo mediante la impresión del navegador.

[Demo local](#demo-local) · [Ejecución](#ejecución-local) · [Código del editor](components/builder/BuilderShell.tsx)

## Demo local

La aplicación incluye datos ficticios de ejemplo y funciona sin crear una cuenta.

1. Arranca el proyecto y abre http://localhost:3000/builder.
2. Edita el perfil, la experiencia y los proyectos.
3. Prueba las cuatro plantillas y cambia tipografía, color y tamaño.
4. Pega el texto de una oferta en el panel de keywords.
5. Exporta el estado a JSON o utiliza **Imprimir / PDF**.

La demo pública y una captura del editor están pendientes de publicación.

## Funcionalidades

- Editor con secciones de perfil, experiencia, formación, proyectos, habilidades e idiomas.
- Cuatro plantillas: Best Practice, Classic, Simple y Visual Two Col.
- Asistente para redactar logros con la estructura STAR y reordenar bullets.
- Comparación de palabras clave entre una oferta y el contenido del CV.
- Guardado automático en `localStorage` e importación/exportación JSON.
- Impresión en A4 para guardar el documento como PDF.

El porcentaje del matcher expresa coincidencia de tokens según [utils/jd.ts](utils/jd.ts). No es una puntuación de un ATS comercial ni predice la probabilidad de contratación.

## Stack

| Área | Tecnología del repositorio |
| --- | --- |
| Framework | **Next.js 16.0.1**, App Router |
| UI | **React 19.2**, TypeScript |
| Estilos | Tailwind CSS 4 |
| Componentes | Radix UI, shadcn/ui, Lucide |
| Estado | Context, reducer y localStorage |
| Calidad | ESLint 9 y TypeScript |

Las versiones exactas están fijadas en [package.json](package.json) y [package-lock.json](package-lock.json).

## Ejecución local

Requisitos: Node.js 22 y npm. El editor actual no requiere base de datos ni variables de entorno.

```bash
git clone https://github.com/amolrod/cv-app.git
cd cv-app
npm ci
npm run dev
```

- Landing: http://localhost:3000
- Editor: http://localhost:3000/builder

## Validación y build

```bash
npm run lint
npx --no-install tsc --noEmit
npm run build
npm run start
```

No hay todavía una suite automatizada de tests de producto. Los primeros casos a cubrir son la persistencia, el round-trip de JSON, el matcher y la impresión.

## Exportación a PDF

En **Imprimir / PDF**, selecciona:

- Destino: Guardar como PDF.
- Papel A4 y sin márgenes adicionales.
- Encabezados y pies del navegador desactivados.
- Gráficos de fondo activados para conservar los acentos.

La ruta [POST /api/export](app/api/export/route.ts) devuelve **501**: la exportación desde servidor todavía no está implementada.

## Despliegue

El proyecto puede configurarse en un hosting compatible con Next.js:

- Directorio raíz: raíz de este repositorio.
- Instalación: `npm ci`.
- Build: `npm run build`.
- Ejecución Node.js: `npm run start`.

Antes de publicar, actualiza las dependencias a versiones corregidas compatibles y valida el build, el guardado del CV y la impresión. Este README no afirma que exista ya un despliegue de producción.

## Estructura

| Ruta | Responsabilidad |
| --- | --- |
| `app/` | Landing, editor y endpoint de exportación pendiente |
| `components/builder/` | Formularios y controles del editor |
| `components/resume/` | Plantillas y vista imprimible |
| `providers/` | Estado y acciones del CV |
| `types/` | Contratos de datos |
| `utils/` | Matcher, persistencia, JSON y helpers |
| `lib/` | Datos de ejemplo y utilidades compartidas |

## Próximas mejoras

- Demo pública y captura del editor.
- Tests de importación/exportación, localStorage y matcher ES/EN.
- Mejorar la normalización de tildes y tecnologías como C# en las keywords.
- Comprobar la impresión con CVs de una y dos páginas.
- Añadir CI con lint, typecheck, tests y build.

## Autor

[Ángel Molina](https://github.com/amolrod) · [LinkedIn](https://www.linkedin.com/in/amolrod) · [Contacto](mailto:angelmolinarodriguez15@gmail.com)
