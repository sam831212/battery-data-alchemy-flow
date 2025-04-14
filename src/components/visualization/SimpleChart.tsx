
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

export type ChartType = "bar" | "line";

interface SimpleChartProps {
  data: any[];
  title: string;
  xKey: string;
  yKeys: { key: string; name: string; color?: string }[];
  type?: ChartType;
  className?: string;
  height?: number;
}

export function SimpleChart({
  data,
  title,
  xKey,
  yKeys,
  type = "line",
  className,
  height = 300,
}: SimpleChartProps) {
  const colors = [
    "#00AFCD", // primary
    "#3B82F6", // blue-500 
    "#10B981", // green-500
    "#F59E0B", // amber-500
    "#8B5CF6", // violet-500
    "#EC4899", // pink-500
  ];

  const getColor = (index: number, providedColor?: string) => {
    if (providedColor) return providedColor;
    return colors[index % colors.length];
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((y, i) => (
                <Bar
                  key={y.key}
                  dataKey={y.key}
                  name={y.name}
                  fill={getColor(i, y.color)}
                />
              ))}
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((y, i) => (
                <Line
                  key={y.key}
                  type="monotone"
                  dataKey={y.key}
                  name={y.name}
                  stroke={getColor(i, y.color)}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
