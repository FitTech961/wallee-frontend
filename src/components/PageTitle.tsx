import { ComponentPropsWithRef } from 'react';

/**
 * Props for the PageTitle component.
 *
 * @property label     The text to render inside the <h1> element
 * @extends            All native <h1> attributes (id, className, onClick, etc.)
 */
interface PageTitleProps extends ComponentPropsWithRef<'h1'> {
  label: string;
}

const PageTitle = ({ label, className = '', ...props }: PageTitleProps) => {
  return (
    <h1 className={`title ${className}`} {...props}>
      {label}
    </h1>
  );
};

export default PageTitle;
