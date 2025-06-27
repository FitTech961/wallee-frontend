// src/components/SDUIRenderer.tsx

import React from 'react';

/**
 * A single JSON “component” entry:
 *  - must have a `type` field
 *  - may have other props
 */
export interface SDUIComponent {
  type: string;
  [key: string]: any;
}

/**
 * Props for SDUIRenderer.
 *
 * @property components – array of JSON‐defined components
 * @property registry   – maps a `type` string to a React component
 */
interface SDUIRendererProps {
  components: SDUIComponent[];
  registry: Record<string, React.ComponentType<any>>;
}

/**
 * Renders each JSON entry by looking up its `type` in the registry.
 * New types can be added by extending `registry`.
 */
const SDUIRenderer = ({ components, registry }: SDUIRendererProps) => (
  <>
    {components.map((component, i) => {
      const Component = registry[component.type];

      if (!Component) {
        console.warn(`No component registered for "${component.type}"`);
        return null;
      }
      // Spread all JSON props directly onto the React component
      return <Component key={i} {...component} />;
    })}
  </>
);

export default SDUIRenderer;
