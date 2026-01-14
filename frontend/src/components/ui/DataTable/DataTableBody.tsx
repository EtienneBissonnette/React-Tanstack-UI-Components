'use no forget';

import { flexRender } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { Skeleton } from '../Skeleton';
import { useDataTableContext } from './DataTableContext';
import type { DataTableBodyProps } from './DataTable.types';

export function DataTableBody({
  emptyState = <p>No data available</p>,
  className = '',
  isLoading = false,
  skeletonRows,
  animateEntrance = true,
  animateOnMount = false,
}: DataTableBodyProps) {
  const { table, size } = useDataTableContext();
  const rows = table.getRowModel().rows;
  const [animating, setAnimating] = useState(false);
  const wasLoadingRef = useRef(isLoading);
  const hasMountedRef = useRef(false);

  // Default skeleton rows to page size if pagination is enabled
  const pageSize = table.getState().pagination?.pageSize;
  const effectiveSkeletonRows = skeletonRows ?? pageSize ?? 5;

  // Detect loading → loaded transition synchronously during render
  // This ensures the first render after loading has the animation attribute
  const justFinishedLoading = wasLoadingRef.current && !isLoading && rows.length > 0 && animateEntrance;

  // For Suspense: detect first mount with data
  const isFirstMountWithData = !hasMountedRef.current && animateOnMount && rows.length > 0 && !isLoading;

  // Update wasLoading ref after checking (order matters!)
  useEffect(() => {
    wasLoadingRef.current = isLoading;
  });

  // Mark as mounted after first render
  useEffect(() => {
    hasMountedRef.current = true;
  }, []);

  // Start animation timer when we finish loading OR on first mount (Suspense)
  useEffect(() => {
    if (justFinishedLoading || isFirstMountWithData) {
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [justFinishedLoading, isFirstMountWithData]);

  // Show animation on first render after load, first mount with data (Suspense), or while timer is active
  const showAnimation = justFinishedLoading || isFirstMountWithData || animating;

  const classes = ['data-table__body', className].filter(Boolean).join(' ');
  const colCount = table.getAllColumns().length + (table.options.enableRowSelection ? 1 : 0);

  // Size-based skeleton dimensions
  const skeletonConfig = {
    sm: { textHeight: 12, checkboxSize: 14 },
    md: { textHeight: 16, checkboxSize: 16 },
    lg: { textHeight: 20, checkboxSize: 18 },
  }[size];

  // Loading state: show skeleton
  if (isLoading) {
    return (
      <tbody className={classes}>
        {Array.from({ length: effectiveSkeletonRows }).map((_, rowIndex) => (
          <tr key={rowIndex} className="data-table__skeleton-row">
            {table.options.enableRowSelection && (
              <td className="data-table__skeleton-cell data-table__cell--checkbox">
                <Skeleton
                  variant="rectangular"
                  width={skeletonConfig.checkboxSize}
                  height={skeletonConfig.checkboxSize}
                />
              </td>
            )}
            {table.getAllColumns().map((column) => (
              <td key={column.id} className="data-table__skeleton-cell">
                <Skeleton
                  variant="text"
                  width="70%"
                  height={skeletonConfig.textHeight}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  // Empty state
  if (rows.length === 0) {
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

  // Data rows with optional animation
  return (
    <tbody className={classes} data-animate={showAnimation || undefined}>
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
