import { createContext, useContext, type ReactNode } from 'react';
import type { Table } from '@tanstack/react-table';
import type { DataTableSize } from './DataTable.types';

interface DataTableContextValue<TData> {
  table: Table<TData>;
  size: DataTableSize;
  isEditMode: boolean;
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
  return (
    <DataTableContext.Provider value={{ table, size, isEditMode }}>
      {children}
    </DataTableContext.Provider>
  );
}
