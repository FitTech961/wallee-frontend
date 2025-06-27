import SearchIcon from '../icons/SearchIcon';

/**
 * Props for the SearchInput component.
 *
 * @property value     Current filter text
 * @property onChange  Callback invoked on each keystroke with the new query
 */
interface SearchInputProps {
  value: string;
  onChange: (query: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <div className="search-input">
    <input
      type="text"
      className="search-input__field"
      placeholder="Search for Payment Method"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <SearchIcon
      className="search-input__icon"
      aria-hidden="true"
      focusable="false"
    />
  </div>
);

export default SearchInput;
