'use no forget';

import type { CellContext } from '@tanstack/react-table';
import { Select } from '../../Select';
import type { SelectOption } from '../DataTable.types';

export function EditableSelectCell<TData>({
  getValue,
  row,
  column,
  table,
}: CellContext<TData, unknown>) {
  const value = getValue() as string;
  const options = (column.columnDef.meta?.options as SelectOption[]) ?? [];

  const handleChange = (newValue: string) => {
    table.options.meta?.updateData(row.index, column.id, newValue);
  };

  return (
    <Select
      value={value}
      options={options}
      onValueChange={handleChange}
      size="sm"
    />
  );
}

EditableSelectCell.displayName = 'EditableSelectCell';
