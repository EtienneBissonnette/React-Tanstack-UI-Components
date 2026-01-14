"use no forget";

import { flexRender } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown, Search } from "lucide-react";
import { Checkbox } from "../Checkbox";
import { useDataTableContext } from "./DataTableContext";
import type { DataTableHeaderProps } from "./DataTable.types";

export function DataTableHeader({
  sticky = false,
  showColumnFilters = false,
  className = "",
}: DataTableHeaderProps) {
  const { table, size } = useDataTableContext();
  const classes = ["data-table__header", className].filter(Boolean).join(" ");

  // Get all filterable columns for the filter row
  const filterableHeaders =
    table
      .getHeaderGroups()[0]
      ?.headers.filter((header) => header.column.getCanFilter()) ?? [];

  return (
    <thead className={classes} data-sticky={sticky || undefined}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="data-table__header-row">
          {table.options.enableRowSelection && (
            <th className="data-table__header-cell data-table__header-cell--checkbox">
              <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={table.getIsSomePageRowsSelected()}
                onCheckedChange={(checked) =>
                  table.toggleAllPageRowsSelected(!!checked)
                }
                size={size === "lg" ? "md" : "sm"}
                aria-label="Select all rows"
              />
            </th>
          )}
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sortDir = header.column.getIsSorted();
            const align = header.column.columnDef.meta?.align ?? "left";
            const width = header.column.columnDef.meta?.width;

            return (
              <th
                key={header.id}
                className="data-table__header-cell"
                colSpan={header.colSpan}
                data-sortable={canSort || undefined}
                data-sorted={sortDir || undefined}
                data-align={align !== "left" ? align : undefined}
                style={width ? { width } : undefined}
              >
                {header.isPlaceholder ? null : (
                  <div className="data-table__header-content">
                    <div
                      className="data-table__header-label"
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      onKeyDown={
                        canSort
                          ? (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                header.column.toggleSorting();
                              }
                            }
                          : undefined
                      }
                      tabIndex={canSort ? 0 : undefined}
                      role={canSort ? "button" : undefined}
                      aria-sort={
                        sortDir === "asc"
                          ? "ascending"
                          : sortDir === "desc"
                            ? "descending"
                            : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {canSort && (
                        <span className="data-table__sort-indicator">
                          {sortDir === "asc" ? (
                            <ArrowUp size={14} />
                          ) : sortDir === "desc" ? (
                            <ArrowDown size={14} />
                          ) : (
                            <ArrowUpDown size={14} />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}

      {/* Separate filter row */}
      {showColumnFilters && filterableHeaders.length > 0 && (
        <tr className="data-table__filter-row">
          {table.options.enableRowSelection && (
            <th className="data-table__filter-cell data-table__filter-cell--checkbox" />
          )}
          {table.getHeaderGroups()[0]?.headers.map((header) => {
            const canFilter = header.column.getCanFilter();
            const filterValue = header.column.getFilterValue() as string;
            const hasFilter = !!filterValue;
            const align = header.column.columnDef.meta?.align ?? "left";

            return (
              <th
                key={`filter-${header.id}`}
                className="data-table__filter-cell"
                data-align={align !== "left" ? align : undefined}
              >
                {canFilter ? (
                  <div
                    className="data-table__column-filter"
                    data-active={hasFilter || undefined}
                  >
                    <Search
                      className="data-table__column-filter-icon"
                      size={12}
                    />
                    <input
                      type="text"
                      value={filterValue ?? ""}
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                      placeholder={`Filter...`}
                      className="data-table__column-filter-input"
                      aria-label={`Filter ${header.column.columnDef.header}`}
                    />
                    {hasFilter && (
                      <button
                        type="button"
                        className="data-table__column-filter-clear"
                        onClick={() => header.column.setFilterValue("")}
                        aria-label="Clear filter"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ) : null}
              </th>
            );
          })}
        </tr>
      )}
    </thead>
  );
}

DataTableHeader.displayName = "DataTable.Header";
