
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface DataTableColumn {
  key: string;
  header: string;
  cell?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: DataTableColumn[];
  title?: string;
  className?: string;
  maxHeight?: string | number;
}

export function DataTable({
  data,
  columns,
  title,
  className,
  maxHeight = "400px",
}: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={cn("", className)}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("", className)}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div
          className="overflow-auto"
          style={{ maxHeight: maxHeight }}
        >
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.key}`}>
                      {column.cell
                        ? column.cell(row)
                        : row[column.key] !== undefined
                        ? String(row[column.key])
                        : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
