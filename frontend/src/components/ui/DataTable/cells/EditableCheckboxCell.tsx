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
  const { isEditMode } = useDataTableContext<TData>();

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
      disabled={!isEditMode}
      aria-label={`${column.id}: ${value ? 'checked' : 'unchecked'}`}
    />
  );
}

EditableCheckboxCell.displayName = 'EditableCheckboxCell';
