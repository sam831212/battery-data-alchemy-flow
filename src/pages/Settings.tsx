
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge"; // Add Badge import
import { useToast } from "@/components/ui/use-toast";
import { 
  Cloud, 
  Database, 
  Download, 
  FileUp, 
  HardDrive, 
  Save, 
  Settings as SettingsIcon, 
  Upload,
  Users,
  FileText,
  KeyRound,
  LayoutGrid,
  PenSquare,
  UserRoundCog
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Configure your application and data pipeline settings
          </p>
        </div>
        
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="lg:w-1/4">
            <Tabs 
              orientation="vertical" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="hidden lg:block"
            >
              <TabsList className="flex w-full flex-col items-stretch bg-transparent p-0">
                {[
                  { value: "general", label: "General", icon: <SettingsIcon className="mr-2 h-4 w-4" /> },
                  { value: "database", label: "Database", icon: <Database className="mr-2 h-4 w-4" /> },
                  { value: "storage", label: "Storage", icon: <HardDrive className="mr-2 h-4 w-4" /> },
                  { value: "pipeline", label: "Pipeline", icon: <LayoutGrid className="mr-2 h-4 w-4" /> },
                  { value: "modules", label: "Modules", icon: <PenSquare className="mr-2 h-4 w-4" /> },
                  { value: "users", label: "Users", icon: <UserRoundCog className="mr-2 h-4 w-4" /> },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center justify-start border-b px-3 py-2 text-left first:rounded-t-md last:rounded-b-md data-[state=active]:border-l-2 data-[state=active]:border-l-primary data-[state=active]:bg-accent/50"
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="lg:hidden"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="storage">Storage</TabsTrigger>
                <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex-1 lg:max-w-3xl">
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Application Name</Label>
                    <Input id="app-name" defaultValue="Battery Data Alchemy" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                      id="description" 
                      defaultValue="Battery test data processing application" 
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Interface Settings</Label>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label 
                          htmlFor="dark-mode" 
                          className="text-sm font-medium"
                        >
                          Dark Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable dark mode interface
                        </p>
                      </div>
                      <Switch id="dark-mode" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label 
                          htmlFor="notifications" 
                          className="text-sm font-medium"
                        >
                          Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Show desktop notifications
                        </p>
                      </div>
                      <Switch id="notifications" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="database" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Database Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="db-type">Database Type</Label>
                    <div className="flex space-x-4">
                      {["SQLite", "PostgreSQL", "MySQL", "DuckDB"].map((dbType) => (
                        <div key={dbType} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`db-${dbType}`} 
                            checked={dbType === "DuckDB"} 
                          />
                          <Label 
                            htmlFor={`db-${dbType}`}
                            className="text-sm"
                          >
                            {dbType}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-path">Database Path</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="db-path" 
                        defaultValue="./data/battery_data.duckdb" 
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="db-username">Username</Label>
                      <Input id="db-username" defaultValue="" placeholder="Username (if needed)" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-password">Password</Label>
                      <Input id="db-password" type="password" defaultValue="" placeholder="Password (if needed)" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Database Operations</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline">
                        <Cloud className="mr-2 h-4 w-4" />
                        Test Connection
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Backup Database
                      </Button>
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Restore
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="storage-path">Data Storage Directory</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="storage-path" 
                        defaultValue="./data/raw_files" 
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Storage Management</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-cleanup" defaultChecked />
                        <Label 
                          htmlFor="auto-cleanup"
                          className="text-sm"
                        >
                          Automatically clean up processed raw files
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="compress" defaultChecked />
                        <Label 
                          htmlFor="compress"
                          className="text-sm"
                        >
                          Compress files older than 30 days
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Storage Statistics</Label>
                    <Card className="overflow-hidden">
                      <div className="divide-y">
                        {[
                          { name: "Total Storage", value: "25.4 GB" },
                          { name: "Raw Files", value: "18.2 GB" },
                          { name: "Processed Files", value: "5.1 GB" },
                          { name: "Database Size", value: "2.1 GB" },
                        ].map((item) => (
                          <div 
                            key={item.name}
                            className="flex justify-between p-2.5 text-sm"
                          >
                            <span className="text-muted-foreground">{item.name}</span>
                            <span className="font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pipeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pipeline Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="pipeline-config">Pipeline Config File</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="pipeline-config" 
                        defaultValue="./config/pipeline_config.yaml" 
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Prefect Settings</Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="prefect-api">Prefect API URL</Label>
                        <Input 
                          id="prefect-api" 
                          defaultValue="http://localhost:4200/api" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="prefect-key">API Key</Label>
                        <div className="flex space-x-2">
                          <Input 
                            id="prefect-key" 
                            type="password" 
                            defaultValue="pnu_1234567890abcdef" 
                            className="flex-1"
                          />
                          <Button variant="outline" size="icon">
                            <KeyRound className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Pipeline Execution</Label>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label 
                          htmlFor="parallel" 
                          className="text-sm font-medium"
                        >
                          Parallel Processing
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable parallel task execution
                        </p>
                      </div>
                      <Switch id="parallel" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label 
                          htmlFor="auto-retry" 
                          className="text-sm font-medium"
                        >
                          Auto-Retry Failed Tasks
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically retry failed tasks up to 3 times
                        </p>
                      </div>
                      <Switch id="auto-retry" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="modules" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Module Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Ingestor Modules</Label>
                    <Card className="overflow-hidden">
                      <div className="divide-y">
                        {[
                          { name: "machine_type_a.py", status: "Active" },
                          { name: "machine_type_b.py", status: "Active" },
                          { name: "machine_type_c.py", status: "Active" },
                          { name: "machine_type_x.py", status: "Testing" },
                        ].map((item) => (
                          <div 
                            key={item.name}
                            className="flex items-center justify-between p-3 text-sm"
                          >
                            <span>{item.name}</span>
                            <Badge variant={item.status === "Active" ? "default" : "outline"}>
                              {item.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Experiment Modules</Label>
                    <Card className="overflow-hidden">
                      <div className="divide-y">
                        {[
                          { name: "cycling.py", status: "Active" },
                          { name: "impedance.py", status: "Active" },
                          { name: "capacity.py", status: "Active" },
                          { name: "rate_capability.py", status: "Active" },
                          { name: "pulse_test.py", status: "Inactive" },
                        ].map((item) => (
                          <div 
                            key={item.name}
                            className="flex items-center justify-between p-3 text-sm"
                          >
                            <span>{item.name}</span>
                            <Badge variant={item.status === "Active" ? "default" : "outline"}>
                              {item.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Upload New Module</Label>
                    <div className="flex items-center space-x-2">
                      <Input type="file" className="flex-1" />
                      <Button>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Active Users</Label>
                    <Card className="overflow-hidden">
                      <div className="divide-y">
                        {[
                          { name: "Admin User", email: "admin@example.com", role: "Administrator" },
                          { name: "John Smith", email: "john@example.com", role: "Researcher" },
                          { name: "Sarah Johnson", email: "sarah@example.com", role: "Researcher" },
                          { name: "David Lee", email: "david@example.com", role: "Viewer" },
                        ].map((user) => (
                          <div 
                            key={user.email}
                            className="flex items-center justify-between p-3"
                          >
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                            <Badge variant={user.role === "Administrator" ? "default" : "outline"}>
                              {user.role}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Invite New User</Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input placeholder="Email address" />
                      <div className="flex space-x-2">
                        <Input placeholder="Role" className="flex-1" />
                        <Button>
                          <Users className="mr-2 h-4 w-4" />
                          Invite
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
