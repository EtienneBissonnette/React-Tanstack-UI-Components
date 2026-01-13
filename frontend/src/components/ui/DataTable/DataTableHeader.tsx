'use no forget';

import { flexRender } from '@tanstack/react-table';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import { useDataTableContext } from './DataTableContext';
import type { DataTableHeaderProps } from './DataTable.types';

interface ExtendedHeaderProps extends DataTableHeaderProps {
  showFilters?: boolean;
}

export function DataTableHeader({ sticky = false, showFilters = false, className = '' }: ExtendedHeaderProps) {
  const { table, size } = useDataTableContext();
  const classes = ['data-table__header', className].filter(Boolean).join(' ');

  return (
    <thead className={classes} data-sticky={sticky || undefined}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="data-table__header-row">
          {table.options.enableRowSelection && (
            <th className="data-table__header-cell data-table__header-cell--checkbox">
              <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={table.getIsSomePageRowsSelected()}
                onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
                size={size === 'lg' ? 'md' : 'sm'}
                aria-label="Select all rows"
              />
            </th>
          )}
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sortDir = header.column.getIsSorted();
            const canFilter = header.column.getCanFilter();
            const align = header.column.columnDef.meta?.align ?? 'left';
            const width = header.column.columnDef.meta?.width;

            return (
              <th
                key={header.id}
                className="data-table__header-cell"
                colSpan={header.colSpan}
                data-sortable={canSort || undefined}
                data-sorted={sortDir || undefined}
                data-align={align !== 'left' ? align : undefined}
                style={width ? { width } : undefined}
              >
                {header.isPlaceholder ? null : (
                  <div className="data-table__header-content">
                    <div
                      className="data-table__header-label"
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      onKeyDown={
                        canSort
                          ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                header.column.toggleSorting();
                              }
                            }
                          : undefined
                      }
                      tabIndex={canSort ? 0 : undefined}
                      role={canSort ? 'button' : undefined}
                      aria-sort={
                        sortDir === 'asc'
                          ? 'ascending'
                          : sortDir === 'desc'
                            ? 'descending'
                            : undefined
                      }
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {canSort && (
                        <span className="data-table__sort-indicator">
                          {sortDir === 'asc' ? (
                            <ArrowUp size={14} />
                          ) : sortDir === 'desc' ? (
                            <ArrowDown size={14} />
                          ) : (
                            <ArrowUpDown size={14} />
                          )}
                        </span>
                      )}
                    </div>
                    {showFilters && canFilter && (
                      <div className="data-table__filter">
                        <Input
                          value={(header.column.getFilterValue() as string) ?? ''}
                          onChange={(e) => header.column.setFilterValue(e.target.value)}
                          placeholder="Filter..."
                          size="sm"
                          className="data-table__filter-input"
                        />
                      </div>
                    )}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}

DataTableHeader.displayName = 'DataTable.Header';
