import CheckboxCheckedIcon from '../icons/CheckboxCheckedIcon';
import CheckboxUncheckedIcon from '../icons/CheckboxUncheckedIcon';

/**
 * Data object for a checkbox option.
 *
 * @property value     Unique identifier for this option
 * @property title     Main label text shown next to the checkbox
 * @property subtitle  Optional secondary text below the title
 * @property imageUrl  Optional icon URL to display alongside the text
 * @property checked   Whether the checkbox is checked by default
 * @property disabled  Whether the checkbox is disabled by default
 */
export interface CheckboxOption {
  value: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  checked?: boolean;
  disabled?: boolean;
}

/**
 * Props for the CheckboxItem component.
 *
 * @property option    The option data to render (value, title, subtitle, etc.)
 * @property onToggle  Handler invoked when the user toggles the checkbox.
 *                    Receives the `value` of the clicked option.
 */
interface CheckboxItemProps {
  option: CheckboxOption;
  onToggle: (value: string) => void;
}

const CheckboxItem = ({ option, onToggle }: CheckboxItemProps) => {
  const { value, title, subtitle, imageUrl, checked, disabled } = option;

  const mods = [
    disabled && 'checkbox-item--disabled',
    checked && 'checkbox-item--checked',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`checkbox-item ${mods}`}>
      <label className="checkbox-item__checkbox">
        <input
          type="checkbox"
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => !disabled && onToggle(value)}
        />
        {checked ? (
          <CheckboxCheckedIcon className="checkbox-item__icon" />
        ) : (
          <CheckboxUncheckedIcon className="checkbox-item__icon" />
        )}
      </label>

      <div className="checkbox-item__content">
        <div className="checkbox-item__title">{title}</div>
        {subtitle && <div className="checkbox-item__subtitle">{subtitle}</div>}
      </div>

      {imageUrl && (
        <img src={imageUrl} alt={title} className="checkbox-item__image" />
      )}
    </div>
  );
};

export default CheckboxItem;
