import type { ReactNode } from "react";
import type {
  Table,
  ColumnDef,
  RowSelectionState,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  Row,
  Cell,
  Header,
  RowData,
} from "@tanstack/react-table";

// Validation result type
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

// Validator function type
export type CellValidator<TValue = unknown> = (
  value: TValue,
  columnId: string,
  rowIndex: number
) => ValidationResult | Promise<ValidationResult>;

// Extend TanStack Table's meta to include updateData and validation
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    validateAndUpdate?: (
      rowIndex: number,
      columnId: string,
      value: unknown
    ) => Promise<boolean>;
    onValidationError?: (columnId: string, message: string) => void;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    editable?: boolean;
    editType?: "text" | "select" | "checkbox";
    options?: SelectOption[];
    align?: "left" | "center" | "right";
    width?: string | number;
    validate?: CellValidator<TValue>;
  }
}

// Re-export types for convenience
export type {
  Table,
  ColumnDef,
  RowSelectionState,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  Row,
  Cell,
  Header,
};

// Badge intent type for select options
export type BadgeIntent =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

// Select option for editable select cells
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  intent?: BadgeIntent;
}

// Hook options
export interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
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

// Hook return type
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

// Component size variants
export type DataTableSize = "sm" | "md" | "lg";

// DataTable root props
export interface DataTableProps<TData> {
  table: Table<TData>;
  children: ReactNode;
  size?: DataTableSize;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
}

// DataTable.Header props
export interface DataTableHeaderProps {
  sticky?: boolean;
  className?: string;
  showColumnFilters?: boolean;
}

// DataTable.Body props
export interface DataTableBodyProps {
  emptyState?: ReactNode;
  className?: string;
  /** Show skeleton loading state (for non-Suspense usage) */
  isLoading?: boolean;
  /** Number of skeleton rows to display while loading (defaults to page size, or 5) */
  skeletonRows?: number;
  /** Animate rows with cascading entrance when data loads (for non-Suspense usage) */
  animateEntrance?: boolean;
  /** Animate rows on initial mount (for Suspense usage where component mounts with data) */
  animateOnMount?: boolean;
}

// DataTable.Pagination props
export interface DataTablePaginationProps {
  showPageSizeSelect?: boolean;
  pageSizeOptions?: number[];
  showInfo?: boolean;
  className?: string;
}

// Context value
export interface DataTableContextValue<TData> {
  table: Table<TData>;
  size: DataTableSize;
}

// Editable cell props (shared base)
export interface EditableCellProps<TData, TValue> {
  getValue: () => TValue;
  row: Row<TData>;
  column: {
    id: string;
    columnDef: ColumnDef<TData, TValue>;
  };
  table: Table<TData>;
}
