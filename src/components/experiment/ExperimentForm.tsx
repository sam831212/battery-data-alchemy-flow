
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ConfigSelector } from "../upload/ConfigSelector";

const formSchema = z.object({
  machineType: z.string().min(1, "Machine type is required"),
  experimentType: z.string().min(1, "Experiment type is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface ExperimentFormProps {
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
}

export function ExperimentForm({ onSubmit, isLoading = false }: ExperimentFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      machineType: "",
      experimentType: "",
    },
  });

  const machineOptions = [
    { value: "machine_type_a", label: "Machine Type A" },
    { value: "machine_type_b", label: "Machine Type B" },
    { value: "machine_type_c", label: "Machine Type C" },
  ];

  const experimentOptions = [
    { value: "cycling", label: "Cycling Test" },
    { value: "impedance", label: "Impedance Analysis" },
    { value: "capacity", label: "Capacity Test" },
    { value: "rate_capability", label: "Rate Capability" },
  ];

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Experiment Configuration</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="machineType"
              render={({ field }) => (
                <ConfigSelector
                  label="Machine Type"
                  options={machineOptions}
                  value={field.value}
                  onChange={field.onChange}
                  description="Select the machine type that generated this data"
                  disabled={isLoading}
                />
              )}
            />
            <FormField
              control={form.control}
              name="experimentType"
              render={({ field }) => (
                <ConfigSelector
                  label="Experiment Type"
                  options={experimentOptions}
                  value={field.value}
                  onChange={field.onChange}
                  description="Select the type of experiment that was performed"
                  disabled={isLoading}
                />
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Start Processing"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
