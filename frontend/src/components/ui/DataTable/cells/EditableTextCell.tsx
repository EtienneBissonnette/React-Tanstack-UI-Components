'use no forget';

import { useState, useEffect } from 'react';
import type { CellContext } from '@tanstack/react-table';
import { Input } from '../../Input';

export function EditableTextCell<TData>({
  getValue,
  row,
  column,
  table,
}: CellContext<TData, unknown>) {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  // Sync with external changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      table.options.meta?.updateData(row.index, column.id, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        size="sm"
        className="data-table__cell-input"
      />
    );
  }

  return (
    <div
      className="data-table__cell-text"
      onClick={() => setIsEditing(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsEditing(true);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Edit ${column.id}: ${value}`}
    >
      {value || '\u00A0'}
    </div>
  );
}

EditableTextCell.displayName = 'EditableTextCell';
