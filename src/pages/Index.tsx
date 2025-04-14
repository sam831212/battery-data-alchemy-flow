
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SimpleChart } from "@/components/visualization/SimpleChart";
import { Database, FileText, FlaskConical, GitBranch } from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const experimentData = [
    { month: "Jan", experiments: 40, success: 38, failure: 2 },
    { month: "Feb", experiments: 65, success: 60, failure: 5 },
    { month: "Mar", experiments: 42, success: 40, failure: 2 },
    { month: "Apr", experiments: 53, success: 50, failure: 3 },
    { month: "May", experiments: 71, success: 65, failure: 6 },
    { month: "Jun", experiments: 48, success: 45, failure: 3 },
  ];

  const capacityData = [
    { cycle: 1, capacity: 1000 },
    { cycle: 10, capacity: 980 },
    { cycle: 20, capacity: 950 },
    { cycle: 30, capacity: 920 },
    { cycle: 40, capacity: 900 },
    { cycle: 50, capacity: 880 },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your battery data processing system
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Experiments"
            value="248"
            icon={<FlaskConical className="h-4 w-4 text-muted-foreground" />}
            trend="up"
            trendValue="12% from last month"
          />
          <StatsCard
            title="Data Files Processed"
            value="1,024"
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            trend="up"
            trendValue="8% from last month"
          />
          <StatsCard
            title="Pipeline Runs"
            value="367"
            icon={<GitBranch className="h-4 w-4 text-muted-foreground" />}
            trend="down"
            trendValue="3% from last month"
          />
          <StatsCard
            title="Database Size"
            value="2.4 GB"
            icon={<Database className="h-4 w-4 text-muted-foreground" />}
            trend="up"
            trendValue="15% from last month"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <SimpleChart
            title="Monthly Experiments"
            data={experimentData}
            xKey="month"
            yKeys={[
              { key: "experiments", name: "Total Experiments" },
              { key: "success", name: "Successful", color: "#10b981" },
              { key: "failure", name: "Failed", color: "#ef4444" },
            ]}
            type="bar"
          />
          <SimpleChart
            title="Battery Capacity Fade"
            data={capacityData}
            xKey="cycle"
            yKeys={[{ key: "capacity", name: "Capacity (mAh)" }]}
            type="line"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "Today, 10:30 AM",
                  action: "Data upload completed",
                  description: "34 new files processed for Experiment #EX-2023-042",
                },
                {
                  time: "Yesterday, 3:15 PM",
                  action: "Pipeline execution failed",
                  description: "Validation error in data transformation for Experiment #EX-2023-041",
                },
                {
                  time: "Apr 10, 2025, 11:40 AM",
                  action: "Database backup completed",
                  description: "Automatic scheduled backup (2.4 GB)",
                },
                {
                  time: "Apr 8, 2025, 9:22 AM",
                  action: "New experiment created",
                  description: "Rate capability test initiated for Cell Type B",
                },
              ].map((item, i) => (
                <div key={i} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                    </div>
                    {i < 3 && <div className="h-full w-px bg-border" />}
                  </div>
                  <div className="space-y-1 pb-8">
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                    <h4 className="font-medium">{item.action}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
