import { ComponentPropsWithRef } from 'react';

type Variant = 'primary' | 'secondary';

/**
 * Props for the Button component.
 *
 * @property variant    Which visual style to apply:
 *                     - 'primary': main call-to-action look (default)
 *                     - 'secondary': less prominent alternative
 * @property className  Extra CSS classes to merge with or override variant styles
 * @extends             All native <button> attributes (onClick, disabled, etc.)
 */
interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: Variant;
  className?: string;
}

const Button = ({
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const variantClass = variant === 'primary' ? 'primary' : 'secondary';
  return (
    <button type={type} className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
