'use no forget';

import { Children, isValidElement, type ReactNode } from 'react';
import type { Table } from '@tanstack/react-table';
import { DataTableProvider } from './DataTableContext';
import { DataTableHeader } from './DataTableHeader';
import { DataTableBody } from './DataTableBody';
import { DataTablePagination } from './DataTablePagination';
import type { DataTableSize } from './DataTable.types';
import './DataTable.css';

interface DataTableRootProps<TData> {
  table: Table<TData>;
  children: ReactNode;
  size?: DataTableSize;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  editable?: boolean;
  className?: string;
}

function DataTableRoot<TData>({
  table,
  children,
  size = 'md',
  striped = false,
  hoverable = true,
  bordered = false,
  editable = true,
  className = '',
}: DataTableRootProps<TData>) {
  const classes = ['data-table', className].filter(Boolean).join(' ');

  // Separate pagination from other children so it renders outside the scrollable area
  const tableChildren: ReactNode[] = [];
  let paginationElement: ReactNode = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === DataTablePagination) {
      paginationElement = child;
    } else {
      tableChildren.push(child);
    }
  });

  return (
    <DataTableProvider table={table} size={size} isEditMode={editable}>
      <div className="data-table__container">
        <div className="data-table__scroll-area">
          <table
            className={classes}
            data-size={size !== 'md' ? size : undefined}
            data-striped={striped || undefined}
            data-hoverable={hoverable || undefined}
            data-bordered={bordered || undefined}
          >
            {tableChildren}
          </table>
        </div>
        {paginationElement}
      </div>
    </DataTableProvider>
  );
}

export const DataTable = Object.assign(DataTableRoot, {
  Header: DataTableHeader,
  Body: DataTableBody,
  Pagination: DataTablePagination,
});

DataTableRoot.displayName = 'DataTable';
