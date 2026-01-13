'use no forget';

import type { CellContext } from '@tanstack/react-table';
import { Checkbox } from '../../Checkbox';

export function EditableCheckboxCell<TData>({
  getValue,
  row,
  column,
  table,
}: CellContext<TData, unknown>) {
  const value = getValue() as boolean;

  const handleChange = (checked: boolean | 'indeterminate') => {
    if (checked !== 'indeterminate') {
      table.options.meta?.updateData(row.index, column.id, checked);
    }
  };

  return (
    <Checkbox
      checked={value}
      onCheckedChange={handleChange}
      size="sm"
      aria-label={`${column.id}: ${value ? 'checked' : 'unchecked'}`}
    />
  );
}

EditableCheckboxCell.displayName = 'EditableCheckboxCell';
