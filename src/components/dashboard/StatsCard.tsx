
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className,
  ...props
}: StatsCardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && trendValue && (
          <div className="mt-2 flex items-center text-xs">
            {trend === "up" ? (
              <span className="text-statusSuccess">↑ {trendValue}</span>
            ) : trend === "down" ? (
              <span className="text-statusError">↓ {trendValue}</span>
            ) : (
              <span className="text-muted-foreground">→ {trendValue}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
