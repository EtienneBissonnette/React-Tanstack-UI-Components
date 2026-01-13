"use no forget";

import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
  DataTable,
  EditableTextCell,
  EditableSelectCell,
  useDataTable,
} from "@/components/ui/DataTable";
import { Button } from "@/components/ui";
import {
  mockPeople,
  statusOptions,
  roleOptions,
  type Person,
} from "./mockData";
import type { ValidationResult } from "@/components/ui/DataTable/DataTable.types";
import "./TablesDemo.css";

const columnHelper = createColumnHelper<Person>();

// Validation functions
const validateFirstName = (value: unknown): ValidationResult => {
  const name = String(value).trim();
  if (name.length < 2) {
    return { valid: false, message: "First name must be at least 2 characters" };
  }
  if (name.length > 50) {
    return { valid: false, message: "First name cannot exceed 50 characters" };
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return { valid: false, message: "First name can only contain letters, spaces, hyphens, and apostrophes" };
  }
  return { valid: true };
};

const validateLastName = (value: unknown): ValidationResult => {
  const name = String(value).trim();
  if (name.length < 2) {
    return { valid: false, message: "Last name must be at least 2 characters" };
  }
  if (name.length > 50) {
    return { valid: false, message: "Last name cannot exceed 50 characters" };
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return { valid: false, message: "Last name can only contain letters, spaces, hyphens, and apostrophes" };
  }
  return { valid: true };
};

const validateEmail = (value: unknown): ValidationResult => {
  const email = String(value).trim();
  if (!email) {
    return { valid: false, message: "Email is required" };
  }
  // Standard email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Please enter a valid email address" };
  }
  if (email.length > 254) {
    return { valid: false, message: "Email cannot exceed 254 characters" };
  }
  return { valid: true };
};

// Date formatter
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",
    cell: EditableTextCell,
    meta: {
      editable: true,
      validate: validateFirstName,
    },
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    cell: EditableTextCell,
    meta: {
      editable: true,
      validate: validateLastName,
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: EditableTextCell,
    meta: {
      editable: true,
      validate: validateEmail,
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Created",
    cell: (info) => formatDate(info.getValue()),
    meta: { width: 120 },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: EditableSelectCell,
    meta: {
      editable: true,
      options: statusOptions,
    },
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: EditableSelectCell,
    meta: {
      editable: true,
      options: roleOptions,
    },
  }),
  columnHelper.accessor("verified", {
    header: "Verified",
    cell: (info) => (
      <span className={`tables-demo__badge ${info.getValue() ? 'tables-demo__badge--success' : 'tables-demo__badge--muted'}`}>
        {info.getValue() ? 'Yes' : 'No'}
      </span>
    ),
    meta: {
      align: "center" as const,
      width: 90,
    },
  }),
];

export function TablesDemo() {
  const [data, setData] = useState<Person[]>(mockPeople);

  const { table, getSelectedRows, clearSelection } = useDataTable({
    data,
    columns,
    enableSorting: true,
    enableFiltering: true,
    enableRowSelection: true,
    enablePagination: true,
    pageSize: 10,
    onDataChange: setData,
    getRowId: (row) => row.id,
  });

  const selectedRows = getSelectedRows();

  const handleDeleteSelected = () => {
    const selectedIds = new Set(selectedRows.map((r) => r.id));
    setData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
    clearSelection();
  };

  return (
    <div className="tables-demo">
      <div className="tables-demo__container">
        <header className="tables-demo__header">
          <div className="tables-demo__header-content">
            <h2 className="tables-demo__title">Team Members</h2>
            <p className="tables-demo__description">
              Manage your team with sorting, filtering, and inline editing. Try entering invalid data to see validation.
            </p>
          </div>
          <div className="tables-demo__header-actions">
            {selectedRows.length > 0 && (
              <>
                <span className="tables-demo__selection-count">
                  {selectedRows.length} selected
                </span>
                <Button
                  intent="danger"
                  size="sm"
                  onClick={handleDeleteSelected}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </header>

        <DataTable table={table} hoverable>
          <DataTable.Header />
          <DataTable.Body
            emptyState={
              <div className="tables-demo__empty">
                <p>No team members found</p>
                <Button
                  intent="secondary"
                  size="sm"
                  onClick={() => setData(mockPeople)}
                >
                  Reset Data
                </Button>
              </div>
            }
          />
          <DataTable.Pagination
            showPageSizeSelect
            pageSizeOptions={[5, 10, 20, 50]}
            showInfo
          />
        </DataTable>
      </div>
    </div>
  );
}
