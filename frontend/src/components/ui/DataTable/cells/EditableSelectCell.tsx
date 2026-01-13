'use no forget';

import { useState, useCallback } from 'react';
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
  const [isValidating, setIsValidating] = useState(false);

  const handleChange = useCallback(async (newValue: string) => {
    if (newValue === value) return;

    const { validateAndUpdate, updateData } = table.options.meta ?? {};

    // Use validateAndUpdate if available, otherwise fall back to updateData
    if (validateAndUpdate) {
      setIsValidating(true);
      await validateAndUpdate(row.index, column.id, newValue);
      setIsValidating(false);
    } else if (updateData) {
      updateData(row.index, column.id, newValue);
    }
  }, [value, table.options.meta, row.index, column.id]);

  return (
    <Select
      value={value}
      options={options}
      onValueChange={handleChange}
      size="sm"
      disabled={isValidating}
    />
  );
}

EditableSelectCell.displayName = 'EditableSelectCell';
