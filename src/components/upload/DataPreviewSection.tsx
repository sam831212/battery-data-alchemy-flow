
import React from "react";
import { DataTable } from "@/components/data/DataTable";

interface DataPreviewProps {
  data: any[];
}

export const DataPreviewSection = ({ data }: DataPreviewProps) => {
  if (data.length === 0) return null;

  const columns = [
    { key: "id", header: "Cell ID" },
    { key: "cycle", header: "Cycle" },
    { key: "capacity", header: "Capacity (Ah)" },
    { key: "voltage", header: "Voltage (V)" },
    { key: "temperature", header: "Temp (°C)" },
    { key: "timestamp", header: "Date" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Data Preview</h3>
      <DataTable data={data} columns={columns} maxHeight={400} />
    </div>
  );
};
