
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ModuleManager from "@/components/settings/ModuleManager";

export default function Settings() {
  return (
    <MainLayout>
      <div className="flex flex-col items-start gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application settings and preferences.
          </p>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic application settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" defaultValue="Battery Data Alchemy" />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="data-dir">Default Data Directory</Label>
                  <div className="flex gap-2">
                    <Input id="data-dir" defaultValue="./data" className="flex-1" />
                    <Button variant="outline">Browse</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="auto-save">Auto-save Configuration</Label>
                    <input
                      type="checkbox"
                      id="auto-save"
                      className="h-4 w-4"
                      defaultChecked
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically save pipeline configuration changes
                  </p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="modules">
            <ModuleManager />
          </TabsContent>
          
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Database Settings</CardTitle>
                <CardDescription>
                  Configure database connection and storage options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="db-type">Database Type</Label>
                  <select
                    id="db-type"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    defaultValue="sqlite"
                  >
                    <option value="sqlite">SQLite</option>
                    <option value="postgres">PostgreSQL</option>
                    <option value="mysql">MySQL</option>
                  </select>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="db-path">Database File Path (SQLite)</Label>
                  <div className="flex gap-2">
                    <Input id="db-path" defaultValue="./data/battery_data.db" className="flex-1" />
                    <Button variant="outline">Browse</Button>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button variant="outline" className="mr-2">Test Connection</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="theme-light"
                        name="theme"
                        className="h-4 w-4"
                        defaultChecked
                      />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="theme-dark"
                        name="theme"
                        className="h-4 w-4"
                      />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="theme-system"
                        name="theme"
                        className="h-4 w-4"
                      />
                      <Label htmlFor="theme-system">System</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <select
                    id="font-size"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    defaultValue="medium"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
