
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SimpleChart } from "@/components/visualization/SimpleChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Visualization = () => {
  const [activeTab, setActiveTab] = useState("capacity");
  const [selectedDataset, setSelectedDataset] = useState("all");
  const [groupBy, setGroupBy] = useState("experiment");
  const [showSettings, setShowSettings] = useState(false);
  
  // Mock data for visualizations
  const generateComparisonData = () => {
    const datasets = ["A", "B", "C"];
    const cycles = [1, 20, 40, 60, 80, 100];
    
    return cycles.map(cycle => {
      const dataPoint: Record<string, any> = { cycle };
      datasets.forEach(dataset => {
        dataPoint[dataset] = 1000 * Math.exp(-0.002 * cycle * (1 + (dataset.charCodeAt(0) - 65) * 0.2)) + Math.random() * 20 - 10;
      });
      return dataPoint;
    });
  };
  
  const generateCycleLifeData = () => {
    return Array.from({ length: 6 }, (_, i) => ({
      experiment: `Exp ${i+1}`,
      cycles: Math.floor(500 + Math.random() * 1500),
      initialCapacity: Math.floor(900 + Math.random() * 200),
      temperature: 25 + (i % 3) * 10,
    }));
  };
  
  const [comparisonData] = useState(generateComparisonData());
  const [cycleLifeData] = useState(generateCycleLifeData());
  
  const voltageProfiles = Array.from({ length: 10 }, (_, i) => ({
    capacity: i * 100,
    voltage1: 3.2 + (i/10),
    voltage2: 3.1 + (i/9),
    voltage3: 3.0 + (i/8),
  }));
  
  const handleExportData = () => {
    // In a real app, this would export the current visualization as CSV/PNG
    alert("Exporting visualization... (This would download a file in a real app)");
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Data Visualization</h2>
            <p className="text-muted-foreground">
              Create and customize visualizations from your battery data
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className={`space-y-6 ${showSettings ? "lg:col-span-1" : "hidden lg:block lg:col-span-1"}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Visualization Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dataset</label>
                  <Select 
                    value={selectedDataset} 
                    onValueChange={setSelectedDataset}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Datasets</SelectItem>
                      <SelectItem value="recent">Recent Experiments</SelectItem>
                      <SelectItem value="hightemp">High Temperature</SelectItem>
                      <SelectItem value="lowtemp">Low Temperature</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Group By</label>
                  <Select 
                    value={groupBy} 
                    onValueChange={setGroupBy}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grouping" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="experiment">Experiment</SelectItem>
                      <SelectItem value="celltype">Cell Type</SelectItem>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="date">Test Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <p className="mb-2 text-sm font-medium">Series to Display</p>
                  <div className="space-y-2">
                    {["Capacity", "Voltage", "Efficiency", "Temperature"].map((item) => (
                      <div className="flex items-center space-x-2" key={item}>
                        <Checkbox 
                          id={`check-${item}`} 
                          defaultChecked={item === "Capacity"}
                        />
                        <label 
                          htmlFor={`check-${item}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <p className="mb-2 text-sm font-medium">Chart Type</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Line", "Bar", "Scatter", "Area"].map((type) => (
                      <Button 
                        key={type}
                        variant={type === "Line" ? "default" : "outline"}
                        size="sm"
                        className="justify-center"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={`space-y-6 ${showSettings ? "lg:col-span-3" : "lg:col-span-3"}`}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="capacity">Capacity Fade</TabsTrigger>
                <TabsTrigger value="voltage">Voltage Profiles</TabsTrigger>
                <TabsTrigger value="comparison">Dataset Comparison</TabsTrigger>
                <TabsTrigger value="cyclelife">Cycle Life</TabsTrigger>
              </TabsList>

              <TabsContent value="capacity" className="pt-4">
                <SimpleChart
                  title="Capacity Fade Analysis"
                  data={comparisonData}
                  xKey="cycle"
                  yKeys={[
                    { key: "A", name: "Dataset A" },
                    { key: "B", name: "Dataset B" },
                    { key: "C", name: "Dataset C" },
                  ]}
                  type="line"
                  height={500}
                />
              </TabsContent>

              <TabsContent value="voltage" className="pt-4">
                <SimpleChart
                  title="Voltage vs. Capacity Profiles"
                  data={voltageProfiles}
                  xKey="capacity"
                  yKeys={[
                    { key: "voltage1", name: "Cycle 1" },
                    { key: "voltage2", name: "Cycle 50" },
                    { key: "voltage3", name: "Cycle 100" },
                  ]}
                  type="line"
                  height={500}
                />
              </TabsContent>

              <TabsContent value="comparison" className="pt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <SimpleChart
                    title="Capacity Comparison"
                    data={comparisonData}
                    xKey="cycle"
                    yKeys={[
                      { key: "A", name: "Dataset A" },
                      { key: "B", name: "Dataset B" },
                      { key: "C", name: "Dataset C" },
                    ]}
                    type="line"
                    height={300}
                  />
                  <SimpleChart
                    title="Performance Comparison"
                    data={comparisonData}
                    xKey="cycle"
                    yKeys={[
                      { key: "A", name: "Dataset A" },
                      { key: "B", name: "Dataset B" },
                      { key: "C", name: "Dataset C" },
                    ]}
                    type="bar"
                    height={300}
                  />
                </div>
              </TabsContent>

              <TabsContent value="cyclelife" className="pt-4">
                <SimpleChart
                  title="Cycle Life by Experiment"
                  data={cycleLifeData}
                  xKey="experiment"
                  yKeys={[{ key: "cycles", name: "Cycles to 80% Capacity" }]}
                  type="bar"
                  height={500}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Visualization;
