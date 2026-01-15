'use no forget';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '../Button';
import { Select } from '../Select';
import { useDataTableContext } from './DataTableContext';
import type { DataTablePaginationProps } from './DataTable.types';

export function DataTablePagination({
  showPageSizeSelect = true,
  pageSizeOptions = [5, 10, 20, 50],
  showInfo = true,
  className = '',
}: DataTablePaginationProps) {
  const { table, size } = useDataTableContext();
  const classes = ['data-table__pagination', className].filter(Boolean).join(' ');

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const rowCount = table.getRowCount();

  const selectOptions = pageSizeOptions.map((size) => ({
    value: String(size),
    label: `${size} per page`,
  }));

  return (
    <div className={classes}>
      {showInfo && (
        <div className="data-table__pagination-info">
          {rowCount > 0 ? (
            <>
              Showing {pageIndex * pageSize + 1} to{' '}
              {Math.min((pageIndex + 1) * pageSize, rowCount)} of {rowCount} rows
            </>
          ) : (
            'No rows'
          )}
        </div>
      )}

      <div className="data-table__pagination-controls">
        {showPageSizeSelect && (
          <Select
            options={selectOptions}
            value={String(pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
            size={size === 'lg' ? 'md' : 'sm'}
            className="data-table__page-size-select"
          />
        )}

        <div className="data-table__pagination-buttons">
          <Button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            size={size === 'lg' ? 'md' : 'sm'}
            variant="ghost"
            aria-label="Go to first page"
          >
            <ChevronsLeft size={16} />
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size={size === 'lg' ? 'md' : 'sm'}
            variant="ghost"
            aria-label="Go to previous page"
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="data-table__pagination-pages">
            <span>
              Page {pageIndex + 1} of {pageCount || 1}
            </span>
          </div>

          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size={size === 'lg' ? 'md' : 'sm'}
            variant="ghost"
            aria-label="Go to next page"
          >
            <ChevronRight size={16} />
          </Button>
          <Button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            size={size === 'lg' ? 'md' : 'sm'}
            variant="ghost"
            aria-label="Go to last page"
          >
            <ChevronsRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

DataTablePagination.displayName = 'DataTable.Pagination';
