import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Table } from '@tanstack/react-table';
import type { DataTableSize } from './DataTable.types';

export interface CellWithError {
  rowIndex: number;
  columnId: string;
}

interface DataTableContextValue<TData> {
  table: Table<TData>;
  size: DataTableSize;
  isEditMode: boolean;
  cellWithError: CellWithError | null;
  setCellWithError: (cell: CellWithError | null) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableContext = createContext<DataTableContextValue<any> | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useDataTableContext<TData>(): DataTableContextValue<TData> {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error('useDataTableContext must be used within a DataTable');
  }
  return context as DataTableContextValue<TData>;
}

export function DataTableProvider<TData>({
  table,
  size,
  isEditMode,
  children,
}: {
  table: Table<TData>;
  size: DataTableSize;
  isEditMode: boolean;
  children: ReactNode;
}) {
  const [cellWithError, setCellWithErrorState] = useState<CellWithError | null>(null);

  const setCellWithError = useCallback((cell: CellWithError | null) => {
    setCellWithErrorState(cell);
  }, []);

  return (
    <DataTableContext.Provider value={{ table, size, isEditMode, cellWithError, setCellWithError }}>
      {children}
    </DataTableContext.Provider>
  );
}
