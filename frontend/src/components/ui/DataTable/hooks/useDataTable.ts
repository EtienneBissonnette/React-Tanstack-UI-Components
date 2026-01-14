"use no forget";

import { useState, useCallback } from "react";
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
} from "@tanstack/react-table";
import { useSkipper } from "./useSkipper";

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
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  onDataChange?: (data: TData[]) => void;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  getRowId?: (row: TData) => string;
  onValidationError?: (columnId: string, message: string) => void;
}

export interface UseDataTableReturn<TData> {
  table: Table<TData>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  rowSelection: RowSelectionState;
  pagination: PaginationState;
  globalFilter: string;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setGlobalFilter: (value: string) => void;
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
    globalFilter: controlledGlobalFilter,
    onGlobalFilterChange,
    onDataChange,
    onRowSelectionChange,
    getRowId,
    onValidationError,
  } = options;

  // State for table features
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });
  const [internalGlobalFilter, setInternalGlobalFilter] = useState("");

  // Use controlled or internal global filter
  const globalFilter = controlledGlobalFilter ?? internalGlobalFilter;
  const setGlobalFilter = useCallback(
    (value: string) => {
      if (onGlobalFilterChange) {
        onGlobalFilterChange(value);
      } else {
        setInternalGlobalFilter(value);
      }
    },
    [onGlobalFilterChange]
  );

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

  // Validate and update data - returns true if valid, false otherwise
  const validateAndUpdate = useCallback(
    async (rowIndex: number, columnId: string, value: unknown): Promise<boolean> => {
      // Find the column to get its validator
      const column = columns.find((col) => {
        // Handle both accessor columns and display columns
        if ('accessorKey' in col) {
          return col.accessorKey === columnId;
        }
        if ('id' in col) {
          return col.id === columnId;
        }
        return false;
      });

      const validator = column?.meta?.validate;

      // If no validator, just update
      if (!validator) {
        updateData(rowIndex, columnId, value);
        return true;
      }

      // Run validation
      const result = await Promise.resolve(validator(value, columnId, rowIndex));

      if (result.valid) {
        updateData(rowIndex, columnId, value);
        return true;
      }

      // Validation failed - call error handler
      if (onValidationError && result.message) {
        onValidationError(columnId, result.message);
      }

      return false;
    },
    [columns, updateData, onValidationError]
  );

  // Handle row selection changes
  const handleRowSelectionChange = useCallback(
    (updater: React.SetStateAction<RowSelectionState>) => {
      setRowSelection((old) => {
        const newSelection =
          typeof updater === "function" ? updater(old) : updater;
        onRowSelectionChange?.(newSelection);
        return newSelection;
      });
    },
    [onRowSelectionChange]
  );

  // Create table instance
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
      globalFilter,
    },
    enableSorting,
    enableFilters: enableFiltering,
    enableRowSelection,
    enableGlobalFilter: enableFiltering,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: handleRowSelectionChange,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    autoResetPageIndex,
    getRowId,
    meta: {
      updateData,
      validateAndUpdate,
      onValidationError,
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
    globalFilter,
    setSorting,
    setColumnFilters,
    setRowSelection,
    setPagination,
    setGlobalFilter,
    updateData,
    getSelectedRows,
    clearSelection,
  };
}
