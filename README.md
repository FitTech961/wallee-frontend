# Wallee SDUI Frontend Challenge

A React & TypeScript application demonstrating a Server-Driven UI (SDUI) pattern, driven dynamically by a JSON schema fetched from a backend service. This project renders components based on a schema retrieved at runtime, using a component registry for extensibility.

---

## Table of Contents

* [Project Structure](#project-structure)
* [Prerequisites](#prerequisites)
* [Local Installation & Testing](#local-installation--testing)
* [Live Demo](#live-demo)
* [Available Scripts](#available-scripts)
* [Schema-Driven Rendering](#schema-driven-rendering)
* [Updating the Schema](#updating-the-schema)
* [Adding New Components](#adding-new-components)
* [SVG Icons](#svg-icons)
* [Styling Guidelines](#styling-guidelines)

---

## Project Structure

```
src/
├── components/            # Reusable React components
│   ├── Button.tsx
│   ├── PageTitle.tsx
│   ├── CheckboxItem.tsx
│   ├── SearchInput.tsx
│   ├── CheckboxListPanel.tsx
│   ├── Loader.tsx
│   └── SDUIRenderer.tsx   # Generic renderer for JSON components
├── hooks/                 # Custom React hooks
│   └── useFetch.ts        # Generic JSON fetch hook
├── styles/                # SCSS partials and entry point
├── App.tsx                # Entry-point, wires up SDUIRenderer
├── index.tsx              # ReactDOM render
└── ...
```

---

## Prerequisites

* Node.js (>=14.x)
* Yarn (>=1.22.x)

---

## Local Installation & Testing

1. **Clone the repository**

   ```bash
   git clone https://github.com/FitTech961/wallee-frontend.git
   cd wallee-frontend
   ```

2. **Install dependencies**

   ```bash
   yarn
   ```

3. **Configure the backend URL**
   Create a `.env.local` file at the project root with:

   ```env
   REACT_APP_API_BASE_URL=https://wallee-backend.onrender.com
   ```

4. **Run locally**

   ```bash
   yarn start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000) and fetch its schema from the backend.

---

## Live Demo

If you don’t want to run locally, the front-end is deployed on Netlify:

**🔗 [https://wallee.netlify.app/](https://wallee.netlify.app/)**

It reads its schema from the live backend API at [https://wallee-backend.onrender.com](https://wallee-backend.onrender.com).

---

## Available Scripts

* **`yarn start`**
  Runs the app in development mode on [http://localhost:3000](http://localhost:3000).

* **`yarn build`**
  Builds the app for production to the `build/` folder.

* **`yarn lint`**
  Runs ESLint to catch code issues.

---

## Schema-Driven Rendering

The app fetches a JSON schema from the backend API:

```json
GET https://wallee-backend.onrender.com/api/schema
```

Schema shape:

```jsonc
{
  "title": "Wallee Test Page",
  "components": [
    { "type": "page-title", "label": "Payment Methods" },
    { "type": "checkbox-list-panel", "onSubmit": "logToConsole", "options": [...] }
  ]
}
```

* **`useFetch`** calls the API URL defined in `REACT_APP_API_BASE_URL`.
* **`SDUIRenderer`** iterates over `schema.components`, looks up each `type` in the **registry**, and renders the corresponding React component.
* **`registry`** in `App.tsx` maps JSON `type` to actual React components.

This decouples UI structure from code and allows dynamic updates.

---

## Updating the Schema

All schema changes live in the **backend** repo. To update:

1. Modify `schema.json` in the backend project.
2. Push or merge your changes to the `main` branch on GitHub.
3. The backend on Render will automatically redeploy (may take a couple minutes on free tier).
4. Once deployment completes, refresh your frontend at [https://wallee.netlify.app](https://wallee.netlify.app) (or your local app if running) to see your changes.

---

## Adding New Components

1. **Create** a React component under `src/components/`.

2. **Add** it to the `registry` in `App.tsx`:

   ```ts
   import MyComponent from './components/MyComponent';
   registry['my-component'] = MyComponent;
   ```

3. **Update** your backend schema with:

   ```json
   { "type": "my-component", /* props */ }
   ```

No changes needed in `SDUIRenderer` or other files.

---

## SVG Icons

This project uses **SVGR** to import SVG files as React components:

1. Place your SVGs under `src/assets/icons/` (e.g. `search.svg`).
2. Import them with the `ReactComponent` syntax:

   ```ts
   import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
   ```
3. Use them in TSX just like any other component:

   ```tsx
   <SearchIcon className="search-input__icon" aria-hidden="true" />
   ```

This allows CSS styling, props, and tree-shaking of unused icons.

---

## Styling Guidelines

* **SCSS & BEM**: Each component has its own partial under `src/styles/`, named with the component’s block name.
* **Blocks**: e.g. `.checkbox-list-panel`, `.loader-wrapper`
* **Elements**: `__search`, `__list`, `__banner`
* **Modifiers**: `--disabled`, `--checked`
