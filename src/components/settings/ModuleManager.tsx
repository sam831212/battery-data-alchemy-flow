
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dynamicLoader } from "@/core/dynamic_loader";
import { useToast } from "@/components/ui/use-toast";

const ModuleManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("ingestor");
  
  const ingestorModules = dynamicLoader.getRegisteredModules('ingestor');
  const experimentModules = dynamicLoader.getRegisteredModules('experiment');
  const persistorModules = dynamicLoader.getRegisteredModules('persistor');

  const handleRegisterModule = (type: string) => {
    toast({
      title: "Register Module",
      description: `Feature to register new ${type} module will be implemented soon.`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Module Manager</CardTitle>
        <CardDescription>
          Manage registered modules for data ingestion, experiment analysis, and data persistence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ingestor" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="ingestor">Data Ingestors</TabsTrigger>
            <TabsTrigger value="experiment">Experiments</TabsTrigger>
            <TabsTrigger value="persistor">Data Persistors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingestor" className="space-y-4">
            {ingestorModules.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No ingestor modules registered yet
              </div>
            ) : (
              ingestorModules.map((module, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <Badge variant="outline">Ingestor</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <p className="text-sm text-muted-foreground">
                      This module handles data ingestion from specific battery testing machines.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-0">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="destructive" size="sm">Unregister</Button>
                  </CardFooter>
                </Card>
              ))
            )}
            <div className="flex justify-center">
              <Button onClick={() => handleRegisterModule('ingestor')} className="mt-4">
                Register New Ingestor
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="experiment" className="space-y-4">
            {experimentModules.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No experiment modules registered yet
              </div>
            ) : (
              experimentModules.map((module, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <Badge variant="outline">Experiment</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <p className="text-sm text-muted-foreground">
                      This module handles experiment-specific calculations and analysis.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-0">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="destructive" size="sm">Unregister</Button>
                  </CardFooter>
                </Card>
              ))
            )}
            <div className="flex justify-center">
              <Button onClick={() => handleRegisterModule('experiment')} className="mt-4">
                Register New Experiment
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="persistor" className="space-y-4">
            {persistorModules.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No persistor modules registered yet
              </div>
            ) : (
              persistorModules.map((module, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <Badge variant="outline">Persistor</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <p className="text-sm text-muted-foreground">
                      This module handles data persistence to different storage backends.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-0">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="destructive" size="sm">Unregister</Button>
                  </CardFooter>
                </Card>
              ))
            )}
            <div className="flex justify-center">
              <Button onClick={() => handleRegisterModule('persistor')} className="mt-4">
                Register New Persistor
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ModuleManager;
