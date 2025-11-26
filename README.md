# Soluciones para Eventos - Astro Migration

Migración de la aplicación de Next.js a Astro para mejor SEO y rendimiento.

## 🚀 Características

- ✅ **Astro 5** con React Islands para componentes interactivos
- ✅ **SEO Optimizado** con meta tags, Open Graph, y structured data
- ✅ **Marketing Tools** integrados:
  - Google Tag Manager
  - Google Analytics 4
  - Facebook Pixel
- ✅ **Tailwind CSS** con tema dark/light
- ✅ **Framer Motion** para animaciones
- ✅ **Generación de PDF** con @react-pdf/renderer
- ✅ **Sitemap** automático
- ✅ **Diseño Responsive** y moderno

## 📋 Requisitos Previos

- Node.js 18+
- npm o pnpm

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# o con pnpm
pnpm install
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PUBLIC_GTM_ID=GTM-XXXXXXX
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_FACEBOOK_PIXEL_ID=your-pixel-id-here
PUBLIC_FACEBOOK_VERIFICATION_DOMAIN=your-verification-domain-here
PUBLIC_SITE_URL=your_site_url
```

> **Nota**: Todas las variables que necesitan ser accesibles en el navegador deben tener el prefijo `PUBLIC_`.

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en http://localhost:4321
```

## 🏗️ Build

```bash
# Generar build de producción
npm run build

# Vista previa del build
npm run preview
```

## 📁 Estructura del Proyecto

```
astro-migration/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, ThemeToggle
│   │   ├── pages/           # Componentes React para páginas
│   │   ├── seo/             # SEO y marketing tools
│   │   └── ui/              # Componentes UI (shadcn/ui)
│   ├── data/                # Datos estáticos
│   ├── layouts/             # Layouts de Astro
│   ├── lib/                 # Utilidades y constantes
│   ├── pages/               # Páginas de Astro (rutas)
│   └── styles/              # Estilos globales
├── astro.config.mjs         # Configuración de Astro
├── tailwind.config.mjs      # Configuración de Tailwind
└── tsconfig.json            # Configuración de TypeScript
```

## 🎨 Componentes

### Componentes Astro (.astro)

- Usados para contenido estático y SEO
- Renderizados en el servidor
- Ejemplos: SEO, GoogleTagManager, BaseLayout

### Componentes React (.tsx)

- Usados para interactividad
- Cargados como "islands" con `client:load`
- Ejemplos: Header, Footer, HomeClient

## 📊 SEO y Marketing

### Google Tag Manager

Configurado en `src/components/seo/GoogleTagManager.astro`

### Google Analytics 4

Configurado en `src/components/seo/GoogleAnalytics.astro`

### Facebook Pixel

Configurado en `src/components/seo/FacebookPixel.astro`

### Structured Data

Cada página incluye JSON-LD para mejor SEO

## 🎯 Verificación

### Herramientas Recomendadas

1. **Google Tag Assistant** - Verificar GTM y GA4
2. **Facebook Pixel Helper** - Verificar Facebook Pixel
3. **Lighthouse** - Auditoría de performance y SEO
4. **Chrome DevTools** - Network tab para verificar scripts

### Checklist de Verificación

- [ ] GTM se carga correctamente
- [ ] GA4 envía eventos de pageview
- [ ] Facebook Pixel se inicializa
- [ ] Meta tags están presentes
- [ ] Sitemap se genera en `/sitemap-index.xml`
- [ ] Robots.txt es accesible
- [ ] Tema dark/light funciona
- [ ] Navegación móvil funciona
- [ ] Formularios funcionan
- [ ] PDF se genera correctamente

## 🚢 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel
3. Deploy automático en cada push

### Otras Plataformas

Astro es compatible con:

- Netlify
- Cloudflare Pages
- AWS Amplify
- GitHub Pages

## 📝 Notas Importantes

1. **Tailwind CSS v3**: Usamos Tailwind v3 para mejor compatibilidad
2. **React 18**: Compatible con todas las dependencias
3. **Framer Motion**: Versión 11 para compatibilidad con React 18
4. **Legacy Peer Deps**: Necesario para resolver conflictos de dependencias

### Componentes Interactivos

En Astro, los componentes React necesitan la directiva `client:*`:

```astro
<Header client:load />  <!-- Carga inmediatamente -->
<Footer client:idle />  <!-- Carga cuando el navegador está idle -->
<Modal client:visible /> <!-- Carga cuando es visible -->
```

## 🆘 Troubleshooting

### Error: Cannot find module '@/...'

Asegúrate de que `tsconfig.json` tiene configurado el path alias:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Error: Dependency conflicts

Usa `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

### Tailwind no aplica estilos

Verifica que `globals.css` esté importado en `BaseLayout.astro`

## 📞 Soporte

Para preguntas o problemas, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ usando Astro**
