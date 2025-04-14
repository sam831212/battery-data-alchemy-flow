
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Database as DatabaseIcon, 
  Download, 
  FileDown, 
  Search, 
  Table, 
  Trash2,
  ChevronRight,
  Filter,
  LayoutGrid,
  MoreHorizontal,
  ArrowDownUp
} from "lucide-react";

const Database = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("tables");
  
  // Mock database tables
  const tables = [
    { 
      name: "battery_cells", 
      description: "Cell metadata and specifications",
      rowCount: 128,
      sizeKB: 256,
      lastUpdated: "2025-04-12",
    },
    { 
      name: "cycling_data", 
      description: "Battery cycling test results",
      rowCount: 245782,
      sizeKB: 18240,
      lastUpdated: "2025-04-14",
    },
    { 
      name: "impedance_data", 
      description: "EIS measurement data",
      rowCount: 42568,
      sizeKB: 5120,
      lastUpdated: "2025-04-10",
    },
    { 
      name: "experiments", 
      description: "Experiment metadata and configurations",
      rowCount: 97,
      sizeKB: 128,
      lastUpdated: "2025-04-13",
    },
    { 
      name: "rate_capability", 
      description: "Rate capability test results",
      rowCount: 5240,
      sizeKB: 768,
      lastUpdated: "2025-04-08",
    },
  ];
  
  // Mock table schema
  const tableSchema = [
    { column: "id", type: "INTEGER", nullable: false, primary: true, description: "Unique identifier" },
    { column: "cell_id", type: "VARCHAR(50)", nullable: false, primary: false, description: "Cell identifier" },
    { column: "cycle_number", type: "INTEGER", nullable: false, primary: false, description: "Cycle number" },
    { column: "voltage", type: "REAL", nullable: false, primary: false, description: "Cell voltage (V)" },
    { column: "current", type: "REAL", nullable: false, primary: false, description: "Current (A)" },
    { column: "capacity", type: "REAL", nullable: false, primary: false, description: "Capacity (Ah)" },
    { column: "temperature", type: "REAL", nullable: true, primary: false, description: "Temperature (°C)" },
    { column: "timestamp", type: "TIMESTAMP", nullable: false, primary: false, description: "Measurement time" },
    { column: "state", type: "VARCHAR(20)", nullable: true, primary: false, description: "Cell state (charge/discharge)" },
    { column: "experiment_id", type: "INTEGER", nullable: false, primary: false, description: "Experiment reference" },
  ];
  
  // Mock query results
  const queryResults = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    cell_id: `CELL_${100 + i}`,
    cycle_number: Math.floor(Math.random() * 100),
    voltage: Math.round((3.2 + Math.random() * 1.2) * 100) / 100,
    current: Math.round((Math.random() * 2 - 1) * 100) / 100,
    capacity: Math.round((Math.random() * 5) * 1000) / 1000,
    temperature: Math.round((25 + Math.random() * 10) * 10) / 10,
    timestamp: new Date(2025, 3, Math.floor(1 + Math.random() * 14)).toISOString().split('T')[0],
    state: Math.random() > 0.5 ? "charge" : "discharge",
    experiment_id: Math.floor(1 + Math.random() * 5),
  }));
  
  // Filtered tables based on search
  const filteredTables = tables.filter(
    (table) => table.name.includes(searchQuery) || table.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const tableColumns = [
    { key: "column", header: "Column" },
    { key: "type", header: "Type" },
    { 
      key: "nullable", 
      header: "Nullable",
      cell: (row: any) => row.nullable ? "Yes" : "No" 
    },
    { 
      key: "primary", 
      header: "Primary Key",
      cell: (row: any) => row.primary ? "Yes" : "No" 
    },
    { key: "description", header: "Description" },
  ];
  
  const queryResultColumns = [
    { key: "id", header: "ID" },
    { key: "cell_id", header: "Cell ID" },
    { key: "cycle_number", header: "Cycle" },
    { key: "voltage", header: "Voltage (V)" },
    { key: "current", header: "Current (A)" },
    { key: "capacity", header: "Capacity (Ah)" },
    { key: "temperature", header: "Temp (°C)" },
    { key: "timestamp", header: "Date" },
    { 
      key: "state", 
      header: "State",
      cell: (row: any) => (
        <Badge variant={row.state === "charge" ? "outline" : "secondary"}>
          {row.state}
        </Badge>
      )
    },
    { key: "experiment_id", header: "Exp ID" },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Database Explorer</h2>
          <p className="text-muted-foreground">
            Browse and query your battery data database
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tables, columns, or data..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tables">
              <Table className="mr-2 h-4 w-4" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="schema">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Schema
            </TabsTrigger>
            <TabsTrigger value="query">
              <Search className="mr-2 h-4 w-4" />
              Query
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tables" className="space-y-4 pt-4">
            <Card>
              <div className="divide-y">
                {filteredTables.map((table) => (
                  <div 
                    key={table.name}
                    className="flex items-center justify-between p-4 hover:bg-accent/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                          <DatabaseIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{table.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {table.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <div className="text-sm font-medium">{table.rowCount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Rows</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{table.sizeKB.toLocaleString()} KB</div>
                        <div className="text-xs text-muted-foreground">Size</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{table.lastUpdated}</div>
                        <div className="text-xs text-muted-foreground">Updated</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="schema" className="space-y-4 pt-4">
            <div className="flex items-center space-x-2 rounded-md bg-accent/50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <DatabaseIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">cycling_data</h3>
                <p className="text-sm text-muted-foreground">Battery cycling test results</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ArrowDownUp className="mr-2 h-4 w-4" />
                  Sort
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Schema
                </Button>
              </div>
            </div>
            
            <DataTable 
              data={tableSchema}
              columns={tableColumns}
            />
          </TabsContent>
          
          <TabsContent value="query" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base">SQL Query</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-2 rounded-md border bg-accent/40 p-3 font-mono text-sm">
                  SELECT * FROM cycling_data WHERE cycle_number &lt; 100 LIMIT 10;
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                  <Button>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    Run Query
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <DataTable 
              data={queryResults}
              columns={queryResultColumns}
              title="Query Results (10 of 245,782 rows)"
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Database;
