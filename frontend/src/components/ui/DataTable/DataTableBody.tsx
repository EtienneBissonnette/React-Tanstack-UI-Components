'use no forget';

import { flexRender } from '@tanstack/react-table';
import { Checkbox } from '../Checkbox';
import { useDataTableContext } from './DataTableContext';
import type { DataTableBodyProps } from './DataTable.types';

export function DataTableBody({
  emptyState = <p>No data available</p>,
  className = '',
}: DataTableBodyProps) {
  const { table, size } = useDataTableContext();
  const classes = ['data-table__body', className].filter(Boolean).join(' ');
  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    const colCount =
      table.getAllColumns().length + (table.options.enableRowSelection ? 1 : 0);

    return (
      <tbody className={classes}>
        <tr className="data-table__row data-table__row--empty">
          <td colSpan={colCount} className="data-table__empty">
            {emptyState}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={classes}>
      {rows.map((row) => (
        <tr
          key={row.id}
          className="data-table__row"
          data-selected={row.getIsSelected() || undefined}
        >
          {table.options.enableRowSelection && (
            <td className="data-table__cell data-table__cell--checkbox">
              <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                size={size === 'lg' ? 'md' : 'sm'}
                aria-label={`Select row ${row.index + 1}`}
              />
            </td>
          )}
          {row.getVisibleCells().map((cell) => {
            const align = cell.column.columnDef.meta?.align ?? 'left';

            return (
              <td
                key={cell.id}
                className="data-table__cell"
                data-align={align !== 'left' ? align : undefined}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

DataTableBody.displayName = 'DataTable.Body';
