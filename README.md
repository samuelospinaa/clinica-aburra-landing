# Clínica Aburrá · Landing page

Landing page de ejemplo para una clínica en El Poblado, Medellín. Construida como pieza de portafolio / prueba técnica.

**Stack:** React 18 · Vite 6 · framer-motion · CSS plano (sin frameworks de UI) · ESLint 9.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve dist/
npm run lint
```

## Estructura

```
src/
  main.jsx              entrada; MotionConfig respeta prefers-reduced-motion
  App.jsx               composición de secciones
  data.js               contenido, horarios y lógica de "abierto ahora" / "próximo cupo"
  styles.css            sistema de diseño (variables CSS) y estilos
  components/
    Nav.jsx             menú flotante, sección activa, progreso de lectura, menú móvil
    Hero.jsx            titular animado, curvas de nivel, parallax, próximo cupo
    Sections.jsx        About, Coverage, Services, Process, Tech, Team, Quotes, Faq
    Contact.jsx         formulario → WhatsApp, mapa, footer, botón flotante
    ui.jsx              Reveal, CountUp, iconos
legacy/index.html       primera versión en HTML/CSS/JS plano (referencia)
```

## Decisiones de diseño

- **Referencia:** estructura inspirada en [v0-evasion-website](https://v0-evasion-website.vercel.app/) (hero a pantalla completa, menú en píldora, sección oscura).
- **Paleta:** la del panel administrativo de la clínica (`#0891b2` primario, `#1797b6` para gráficos, verdes/rojos de estado).
- **Tipografía:** Bricolage Grotesque (títulos) + Figtree (texto).
- **Detalle propio:** curvas de nivel del Valle de Aburrá, coordenadas y altitud (1.495 m) en el hero.
- **Diferenciadores:** próximo cupo calculado con la hora de Medellín, estado "abierto ahora", proceso en 3 pasos, preguntas frecuentes, franja de aseguradoras, confirmación animada del formulario.
- **Accesibilidad:** enlace "saltar al contenido", foco visible, `aria-label` en el titular animado, acordeón con `aria-expanded`, menú móvil cerrable con Esc, animaciones desactivadas con `prefers-reduced-motion`.

## Notas

- Es un sitio de **ejemplo**: nombres, médicos, testimonios, aseguradoras, precios y teléfonos (formato `555`) son ficticios.
- Las fotos se cargan desde [Unsplash](https://unsplash.com) (licencia Unsplash). Para producción conviene descargarlas y servirlas localmente.
- El formulario no tiene backend: abre WhatsApp con el mensaje armado.
- El horario (`data.js`) usa UTC−5 fijo; Colombia no tiene horario de verano.
