'use no forget';

import { useState, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type Table,
} from '@tanstack/react-table';
import { useSkipper } from './useSkipper';

export interface UseDataTableOptions<TData> {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  pageIndex?: number;
  onDataChange?: (data: TData[]) => void;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  getRowId?: (row: TData) => string;
}

export interface UseDataTableReturn<TData> {
  table: Table<TData>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  rowSelection: RowSelectionState;
  pagination: PaginationState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  getSelectedRows: () => TData[];
  clearSelection: () => void;
}

export function useDataTable<TData>(
  options: UseDataTableOptions<TData>
): UseDataTableReturn<TData> {
  const {
    data,
    columns,
    enableSorting = true,
    enableFiltering = true,
    enableRowSelection = false,
    enablePagination = true,
    pageSize = 10,
    pageIndex = 0,
    onDataChange,
    onRowSelectionChange,
    getRowId,
  } = options;

  // State for table features
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  // Skipper to prevent auto-reset during cell edits
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // Update data callback for editable cells
  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      skipAutoResetPageIndex();
      if (onDataChange) {
        const newData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: value,
            };
          }
          return row;
        });
        onDataChange(newData);
      }
    },
    [data, onDataChange, skipAutoResetPageIndex]
  );

  // Handle row selection changes
  const handleRowSelectionChange = useCallback(
    (updater: React.SetStateAction<RowSelectionState>) => {
      setRowSelection((old) => {
        const newSelection = typeof updater === 'function' ? updater(old) : updater;
        onRowSelectionChange?.(newSelection);
        return newSelection;
      });
    },
    [onRowSelectionChange]
  );

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
    enableSorting,
    enableFilters: enableFiltering,
    enableRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: handleRowSelectionChange,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    autoResetPageIndex,
    getRowId,
    meta: {
      updateData,
    },
  });

  // Get selected rows data
  const getSelectedRows = useCallback(() => {
    return table.getSelectedRowModel().rows.map((row) => row.original);
  }, [table]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setRowSelection({});
  }, []);

  return {
    table,
    sorting,
    columnFilters,
    rowSelection,
    pagination,
    setSorting,
    setColumnFilters,
    setRowSelection,
    setPagination,
    updateData,
    getSelectedRows,
    clearSelection,
  };
}
