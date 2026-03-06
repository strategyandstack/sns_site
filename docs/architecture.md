---FILE: docs/architecture.md---
# Project Architecture

## Overview
*   **High-Performance Static Site**: Built for speed and reliability using a vanilla stack without heavy frameworks.
*   **Data-Driven Architecture**: Content is decoupled from structure, managed primarily in `data.js`.
*   **Modular Component System**: Reusable UI elements defined in `components.js` and hydrated with data.
*   **GSAP Powered Animations**: Sophisticated, performant animations and transitions handled by GreenSock.
*   **Modern Vanilla JS**: Uses ES6 modules (`import`/`export`) for clean dependency management.
*   **Visual Excellence**: Modern design with glassmorphism, mesh gradients, and premium typography (Inter).
*   **Security First**: Implements strict Content Security Policy (CSP) and security headers via `_headers`.
*   **SEO Optimized**: Dynamic JSON-LD schema, semantic HTML, and comprehensive metadata.
*   **PWA Ready**: Manifest and icon sets included for an app-like installation experience.

## Repo Map
*   `index.html`: Main entry point containing structural layout and SEO metadata.
*   `data.js`: Central content repository; stores all text, prices, and features.
*   `components.js`: UI blueprint library; holds functions that generate HTML strings from data.
*   `main.js`: Core orchestrator; handles bootstrapping, interactions, and animation logic.
*   `style.css`: Global design system, layout rules, and complex CSS effects (mesh gradients).
*   `_headers`: Security and caching policy configuration.
*   `fonts/`: Self-hosted Inter font files and weights.
*   `es/`: Subdirectory for the Spanish language version of the site.

## Core Files and Responsibilities
*   `index.html`: Provides the DOM mounting points (e.g., `#blueprints-container`) and initial "above-the-fold" styles.
*   `data.js`: Exports `salesArchitectureData`, the single source of truth for all marketing copy and pricing.
*   `components.js`: Exports functional components (e.g., `createBlueprintDisplay`) that return semantic HTML.
*   `main.js`: Imports `data` and `components`, logic for mounting sections, event delegation, and GSAP timelines.

## Data and Rendering Flow
1.  `main.js` imports the `salesArchitectureData` object.
2.  It uses component functions from `components.js` to map this data into HTML strings.
3.  `main.js` injects these strings into specific `id` containers in the DOM (e.g., `innerHTML`).
4.  Intersection Observers are used to trigger reveals and animations as the user scrolls.

## Component System
*   **Structure**: Components are exported as arrow functions that template data into ES6 template literals.
*   **Data Acceptance**: They accept specific objects or primitive values exported from `data.js`.
*   **Mounting**: Done in `main.js` using `document.getElementById().innerHTML` or `insertAdjacentHTML`.

## Animation System
*   **GSAP**: External library loaded via CDN in `index.html`.
*   **Initialization**: Initialized in `main.js` inside `DOMContentLoaded` using `gsap.to()`, `gsap.fromTo()`, and `Timeline` objects.
*   **Triggers**: Mixed approach using `IntersectionObserver` in `main.js` (e.g., `initSectionReveals`) and standard event listeners.
*   **Types**: Includes CIPHER text effects, parallax scroll shifts, and UI reveal staggers.

## SEO and Metadata System
*   **Meta Tags**: Standard description, keywords, and author tags in `index.html`.
*   **Open Graph / Twitter**: Full social sharing support with optimized images.
*   **JSON-LD**: Embedded `application/ld+json` script in `index.html` for Organization and Service schema.
*   **Internationalization**: `hreflang` tags and `robots.txt` configuration for `en` and `es` paths.

## Security and Performance
*   **CSP**: Strict `Content-Security-Policy` defined in both `index.html` meta and `_headers`.
*   **Performance**: Font preloading, script deferment (`defer`), and aggressive caching for assets in `_headers`.
*   **Typography**: Self-hosted fonts to prevent CLS and external dependency latency.

## Common Change Recipes
1.  **Adding a new homepage section**: 
    - Add data to `data.js`.
    - Create a new export function in `components.js`.
    - Create a container in `index.html`.
    - Call the component and inject into container in `main.js`.
2.  **Adding a new service or offer**: Update the `blueprints` or `packages` array in `data.js`. The UI will re-render automatically.
3.  **Updating JSON LD schema safely**: Modify the `application/ld+json` block in `index.html`. Use a validator to confirm syntax.
4.  **Adding a new icon via Lucide**: Update the `icon` string in `data.js` to match a valid Lucide icon name. `main.js` calls `lucide.createIcons()` on render.
5.  **Adding or updating a GSAP animation**: Locate the `init...Animation` functions in `main.js` and modify the GSAP properties or durations.

## Do Not Break
*   **CSP Rules**: Do not add inline scripts or styles that violate the `_headers` policy.
*   **Module Boundaries**: Keep data in `data.js` and UI logic in `components.js/main.js`.
*   **Data Driven**: Never hardcode prices or features in `index.html` or `components.js`.

Inputs Used:
- File tree only: No
- Key files provided: `index.html`, `data.js`, `components.js`, `main.js`, `_headers`, `robots.txt`, `sitemap.xml`.
