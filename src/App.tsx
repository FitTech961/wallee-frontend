import React, { useEffect } from 'react';
import SDUIRenderer, { SDUIComponent } from './components/SDUIRenderer';
import PageTitle from './components/PageTitle';
import CheckboxListPanel from './components/CheckboxListPanel';
import type { CheckboxOption } from './components/CheckboxItem';
import { useFetch } from './hooks/useFetch';
import Loader from './components/Loader';

/**
 * Full page schema, loaded from the static JSON.
 *
 * @property title      Optional page title
 * @property components Array of UI components to render (SDUI entries)
 */
interface PageSchema {
  title?: string;
  components: SDUIComponent[];
}

/**
 * Handler functions available to SDUI components.
 * JSON uses the `onSubmit` key to pick one of these.
 */
const handlers: Record<string, (values: string[]) => void> = {
  logToConsole: (values) => {
    console.log('Selected values:', values);
  },
};

/**
 * Registry mapping JSON `type` to React component.
 * Extend this to support more SDUI component types without touching
 * your renderer or App.
 */
const registry: Record<string, React.ComponentType<any>> = {
  'page-title': ({ label, ...props }) => <PageTitle label={label} {...props} />,
  'checkbox-list-panel': ({ onSubmit, options, ...props }) => (
    <CheckboxListPanel
      options={options as CheckboxOption[]}
      onSubmit={handlers[onSubmit]}
      {...props}
    />
  ),
};

const App = () => {
  const { data: schema, loading, error } = useFetch<PageSchema>('/api/schema');

  useEffect(() => {
    if (schema?.title) {
      document.title = schema.title;
    }
  }, [schema?.title]);

  if (loading) {
    return <Loader />;
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app">
      {/* Render all components in order from the schema */}
      <SDUIRenderer components={schema!.components} registry={registry} />
    </div>
  );
};

export default App;
