import React, { useState, useEffect } from 'react';
import CheckboxItem, { CheckboxOption } from './CheckboxItem';
import SearchInput from './SearchInput';
import Button from './Button';

/**
 * Props for the CheckboxListPanel component.
 *
 * @property options  Initial array of checkbox options to render.
 * @property onSubmit Callback invoked with an array of selected values when the user clicks “Submit”.
 */
interface CheckboxListPanelProps {
  options: CheckboxOption[];
  onSubmit: (selectedValues: string[]) => void;
}

const CheckboxListPanel = ({
  options: initialOptions,
  onSubmit,
}: CheckboxListPanelProps) => {
  const [options, setOptions] = useState<CheckboxOption[]>(initialOptions);
  const [searchQuery, setSearchQuery] = useState('');

  // If the initialOptions ever change, reset local state
  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);

  const toggleOption = (value: string) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.value === value
          ? { ...option, checked: !option.checked }
          : option,
      ),
    );
  };

  // Only show options whose title includes the search query
  const visibleOptions = options.filter((option) =>
    option.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Restore original checked state and clear the search field
  const handleReset = () => {
    setOptions(initialOptions);
    setSearchQuery('');
  };

  // Extract selected values and invoke onSubmit
  const handleSubmit = () => {
    const selected = options
      .filter((option) => option.checked)
      .map((option) => option.value);
    onSubmit(selected);
  };

  return (
    <div className="checkbox-list-panel">
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      <div className="checkbox-list-panel__list">
        {visibleOptions.map((option) => (
          <CheckboxItem
            key={option.value}
            option={option}
            onToggle={toggleOption}
          />
        ))}
      </div>

      <div className="checkbox-list-panel__buttons">
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CheckboxListPanel;
