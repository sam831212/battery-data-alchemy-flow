
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleChart } from "@/components/visualization/SimpleChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data/DataTable";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw, FileSpreadsheet } from "lucide-react";

// Mock battery testing data
const generateMockCyclingData = () => {
  const cycles = 100;
  return Array.from({ length: cycles }, (_, i) => ({
    cycle: i + 1,
    capacity: 1000 * Math.exp(-0.002 * i) + Math.random() * 20 - 10,
    coulombicEfficiency: 99.5 + Math.random() * 0.5 - 0.25,
    voltage: 3.7 + Math.sin(i / 10) * 0.2 + Math.random() * 0.1 - 0.05,
  }));
};

const generateMockImpedanceData = () => {
  const frequencies = [
    0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000,
  ];
  return frequencies.map((frequency) => ({
    frequency,
    realZ: 0.05 + 0.2 * Math.exp(-frequency / 10) + Math.random() * 0.01 - 0.005,
    imagZ: -(0.15 * Math.exp(-frequency / 5) + Math.random() * 0.01 - 0.005),
  }));
};

const generateMockCapacityData = () => {
  const cRates = [0.1, 0.2, 0.5, 1, 2, 3, 5];
  return cRates.map((cRate) => ({
    cRate,
    dischargeCapacity: 1000 - cRate * 70 + Math.random() * 20 - 10,
    chargeCapacity: 980 - cRate * 80 + Math.random() * 20 - 10,
    efficiency: 100 - cRate * 2 - Math.random() * 2,
  }));
};

const Experiment = () => {
  const [activeTab, setActiveTab] = useState("cycling");
  const [cyclingData] = useState(generateMockCyclingData());
  const [impedanceData] = useState(generateMockImpedanceData());
  const [capacityData] = useState(generateMockCapacityData());

  // Columns for data tables
  const cyclingColumns = [
    { key: "cycle", header: "Cycle" },
    { key: "capacity", header: "Capacity (mAh)" },
    { key: "coulombicEfficiency", header: "Efficiency (%)" },
    { key: "voltage", header: "Voltage (V)" },
  ];

  const impedanceColumns = [
    { key: "frequency", header: "Frequency (Hz)" },
    { key: "realZ", header: "Real Z (Ω)" },
    { key: "imagZ", header: "Imag Z (Ω)" },
  ];

  const capacityColumns = [
    { key: "cRate", header: "C-Rate" },
    { key: "dischargeCapacity", header: "Discharge Capacity (mAh)" },
    { key: "chargeCapacity", header: "Charge Capacity (mAh)" },
    { key: "efficiency", header: "Efficiency (%)" },
  ];

  const handleExportData = () => {
    // In a real app, this would export the current data as CSV/Excel
    alert("Exporting data... (This would download a CSV/Excel file in a real app)");
  };

  const refreshData = () => {
    // In a real app, this would refresh the data from the database
    alert("Refreshing data from the database...");
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Experiment Analysis</h2>
            <p className="text-muted-foreground">
              Visualize and analyze battery testing experiments
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={refreshData}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Experiment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Experiment ID",
                  value: "EX-2023-042",
                  icon: <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />,
                },
                {
                  label: "Machine Type",
                  value: "Arbin BT-2000",
                  icon: null,
                },
                {
                  label: "Cell Type",
                  value: "NMC/Graphite 18650",
                  icon: null,
                },
                {
                  label: "Start Date",
                  value: "Apr 10, 2025",
                  icon: null,
                },
                {
                  label: "Duration",
                  value: "14 days",
                  icon: null,
                },
                {
                  label: "Status",
                  value: "Completed",
                  icon: null,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center rounded-md border p-3"
                >
                  <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    {item.icon || (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="cycling">Cycling Performance</TabsTrigger>
            <TabsTrigger value="impedance">Impedance Analysis</TabsTrigger>
            <TabsTrigger value="capacity">Rate Capability</TabsTrigger>
          </TabsList>

          <TabsContent value="cycling" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <SimpleChart
                title="Discharge Capacity vs. Cycle"
                data={cyclingData}
                xKey="cycle"
                yKeys={[{ key: "capacity", name: "Capacity (mAh)" }]}
                type="line"
              />
              <SimpleChart
                title="Coulombic Efficiency vs. Cycle"
                data={cyclingData}
                xKey="cycle"
                yKeys={[{ key: "coulombicEfficiency", name: "Efficiency (%)" }]}
                type="line"
              />
            </div>
            <DataTable
              data={cyclingData}
              columns={cyclingColumns}
              title="Cycling Data"
            />
          </TabsContent>

          <TabsContent value="impedance" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Impedance Spectra</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <div className="flex h-full w-full items-center justify-center text-center text-muted-foreground">
                    <p>Interactive Nyquist plot would appear here</p>
                    <p>(Using a specialized EIS visualization library)</p>
                  </div>
                </CardContent>
              </Card>
              <SimpleChart
                title="Bode Plot (Magnitude)"
                data={impedanceData}
                xKey="frequency"
                yKeys={[
                  { 
                    key: "realZ", 
                    name: "Real Z (Ω)" 
                  }
                ]}
                type="line"
              />
            </div>
            <DataTable
              data={impedanceData}
              columns={impedanceColumns}
              title="Impedance Data"
            />
          </TabsContent>

          <TabsContent value="capacity" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <SimpleChart
                title="Rate Capability"
                data={capacityData}
                xKey="cRate"
                yKeys={[
                  { key: "dischargeCapacity", name: "Discharge (mAh)" },
                  { key: "chargeCapacity", name: "Charge (mAh)" },
                ]}
                type="bar"
              />
              <SimpleChart
                title="Efficiency vs. C-Rate"
                data={capacityData}
                xKey="cRate"
                yKeys={[{ key: "efficiency", name: "Efficiency (%)" }]}
                type="line"
              />
            </div>
            <DataTable
              data={capacityData}
              columns={capacityColumns}
              title="Rate Capability Data"
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Experiment;
