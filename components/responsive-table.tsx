"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import type { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: string, item: T) => ReactNode;
}

interface ResponsiveTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  renderMobileCard: (item: T) => ReactNode;
}

export function ResponsiveTable<T>({
  columns,
  data,
  keyField,
  renderMobileCard,
}: ResponsiveTableProps<T>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {data.map((item) => renderMobileCard(item))}
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={String(item[keyField])}>
              {columns.map((column) => {
                const value = item[column.accessor]; // Extract the value
                return (
                  <td
                    key={`${String(item[keyField])}-${String(column.accessor)}`}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {column.render
                      ? column.render(String(value), item) // Ensure `value` is a string
                      : String(value)}{" "}
                    {/* Convert `value` to a string */}
                  </td>
                );
              })}
            </tr>
          ))}{" "}
        </tbody>
      </table>
    </div>
  );
}
