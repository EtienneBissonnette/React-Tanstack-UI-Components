'use no forget';

import type { CellContext } from '@tanstack/react-table';
import { Checkbox } from '../../Checkbox';
import { useDataTableContext } from '../DataTableContext';

export function EditableCheckboxCell<TData>({
  getValue,
  row,
  column,
  table,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
CellContext<TData, any>) {
  const value = getValue() as boolean;
  const { isEditMode, cellWithError } = useDataTableContext<TData>();

  // Check if another cell has a validation error (blocks this cell)
  const isBlockedByError = cellWithError !== null;

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
      disabled={!isEditMode || isBlockedByError}
      aria-label={`${column.id}: ${value ? 'checked' : 'unchecked'}`}
    />
  );
}

EditableCheckboxCell.displayName = 'EditableCheckboxCell';
