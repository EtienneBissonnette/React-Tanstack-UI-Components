"use no forget";

import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
  DataTable,
  EditableTextCell,
  EditableSelectCell,
  EditableCheckboxCell,
  useDataTable,
} from "@/components/ui/DataTable";
import { Button } from "@/components/ui";
import {
  mockPeople,
  statusOptions,
  roleOptions,
  type Person,
} from "./mockData";
import "./TablesDemo.css";

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",
    cell: EditableTextCell,
    meta: { editable: true },
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    cell: EditableTextCell,
    meta: { editable: true },
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("age", {
    header: "Age",
    meta: { align: "right" as const, width: 80 },
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
    cell: EditableCheckboxCell,
    meta: {
      editable: true,
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
              Manage your team with sorting, filtering, and inline editing
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
