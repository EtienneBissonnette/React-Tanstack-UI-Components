"use no forget";

import { useState, useCallback } from "react";
import type { CellContext } from "@tanstack/react-table";
import { Select } from "../../Select";
import { Badge } from "../../Badge";
import type { SelectOption } from "../DataTable.types";
import { useDataTableContext } from "../DataTableContext";

export function EditableSelectCell<TData>({
  getValue,
  row,
  column,
  table,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
CellContext<TData, any>) {
  const value = getValue() as string;
  const options = (column.columnDef.meta?.options as SelectOption[]) ?? [];
  const [isValidating, setIsValidating] = useState(false);
  const { isEditMode } = useDataTableContext<TData>();

  const handleChange = useCallback(
    async (newValue: string) => {
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
    },
    [value, table.options.meta, row.index, column.id]
  );

  // Render as Badge when not in edit mode
  if (!isEditMode) {
    const selectedOption = options.find((opt) => opt.value === value);
    const label = selectedOption?.label ?? value;
    const intent = selectedOption?.intent;

    // Use Badge if option has intent, otherwise plain text
    if (intent) {
      return <Badge intent={intent}>{label}</Badge>;
    }

    return (
      <span className="data-table__cell-text" data-readonly>
        {label}
      </span>
    );
  }

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

EditableSelectCell.displayName = "EditableSelectCell";
