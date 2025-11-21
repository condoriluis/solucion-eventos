# Soluciones para Eventos - Carpas y Más

**Descripción**

- **Proyecto**: Sitio web de catálogo y cotizaciones para alquiler de material para eventos (carpas, mesas, sillas, mantelería, sonido, etc.).
- **Objetivo**: Permitir ver productos, solicitar cotizaciones y generar una propuesta en PDF lista para enviar al cliente.

**Tecnologías principales**

- **Framework**: `Next.js` 16 (app router).
- **UI**: React 19, Tailwind CSS v4, componentes Radix y librerías auxiliares (`framer-motion`, `lucide-react`).
- **PDF**: `@react-pdf/renderer` para generar cotizaciones en PDF.
- **Temas**: `next-themes` para modo claro/oscuro.

**Características**

- **Catálogo de productos**: listado y páginas por producto en `src/app/productos` y `src/data/products.ts`.
- **Cotizaciones**: formulario para armar una cotización y generar/descargar un PDF (`src/components/quote/QuotePDF.tsx`).
- **Generación de PDF**: plantilla corporativa basada en `src/lib/constants/dataEmpresa.ts`.
- **Componentes reutilizables**: encabezado, footer, galería, tarjetas, sistema de notificaciones y controles UI en `src/components`.
- **Responsive**: diseño adaptado para móvil y escritorio.

**Requisitos**

- Node.js (recomendada: 18+). Si usas nvm, selecciona una versión LTS moderna.

**Instalación y uso (PowerShell)**

```powershell
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor (después de build)
npm start

# Ejecutar linter
npm run lint
```

El servidor de desarrollo arrancará por defecto en `http://localhost:3000`.

**Estructura relevante del proyecto**

- **`src/app/`**: Rutas y páginas (inicio, `productos`, `cotizacion`, `contacto`, `sobre-nosotros`).
- **`src/components/`**: Componentes UI por dominio (layout, producto, quote, ui).
- **`src/data/`**: Datos estáticos de ejemplo: `products.ts`, `testimonials.ts`.
- **`src/lib/constants/dataEmpresa.ts`**: Datos de la empresa usados en PDFs y cabecera (logo, contacto, redes).
- **`src/components/quote/QuotePDF.tsx`**: Plantilla de documento PDF y estilos en `src/components/quote/styles/pdfStyles.ts`.

**Cómo personalizar**

- **Cambiar datos de la empresa**: editar `src/lib/constants/dataEmpresa.ts` (logoWeb, logoPdf, email, teléfono, redes).
- **Agregar/editar productos**: editar `src/data/products.ts` para actualizar el catálogo (id, slug, price, stock, images).
- **Modificar plantilla PDF**: `src/components/quote/QuotePDF.tsx` y `src/components/quote/styles/pdfStyles.ts`.

**Scripts útiles (de `package.json`)**

- `dev`: ejecuta `next dev` (desarrollo).
- `build`: ejecuta `next build` (compilación para producción).
- `start`: ejecuta `next start` (iniciar servidor tras build).
- `lint`: ejecuta `eslint`.

**Despliegue**

- Recomendado: Vercel (soporta Next.js nativamente). Sube el repositorio y configura la variable `NEXT_PUBLIC_*` si añades variables públicas.
- Alternativas: Netlify, Azure Static Web Apps o contenedores Docker si necesitas control total.

**Notas y consideraciones**

- El proyecto usa `@react-pdf/renderer` para generar PDFs del lado del servidor/cliente. Asegúrate de probar la generación en el entorno de despliegue.
- Revisa las rutas y permisos de imágenes externas (Cloudinary y otros CDN usados en `src/data` y `src/lib/constants`).
- `next/image` no se usa ampliamente en el código visible; si lo integras, configura `next.config.js` para dominios externos.
