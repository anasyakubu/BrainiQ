"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, Loader2, PlusCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  subjects: z.array(z.string()).min(1, {
    message: "At least one subject is required.",
  }),
  goals: z.array(z.string()).min(1, {
    message: "At least one goal is required.",
  }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
});

export default function AddStudyPlan() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      subjects: [],
      goals: [],
      startDate: new Date(),
    },
  });

  const [newSubject, setNewSubject] = useState("");
  const [newGoal, setNewGoal] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("https://api-explaim.com/study-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create study plan");
      }

      toast({
        title: "Study Plan Created",
        description: "Your new study plan has been successfully added.",
      });
      router.push("/study-plans"); // Redirect to the study plans list page
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem creating your study plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const addSubject = () => {
    if (newSubject.trim() !== "") {
      form.setValue("subjects", [
        ...form.getValues("subjects"),
        newSubject.trim(),
      ]);
      setNewSubject("");
    }
  };

  const removeSubject = (index: number) => {
    const subjects = form.getValues("subjects");
    subjects.splice(index, 1);
    form.setValue("subjects", subjects);
  };

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      form.setValue("goals", [...form.getValues("goals"), newGoal.trim()]);
      setNewGoal("");
    }
  };

  const removeGoal = (index: number) => {
    const goals = form.getValues("goals");
    goals.splice(index, 1);
    form.setValue("goals", goals);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Study Plan</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter study plan title" {...field} />
                </FormControl>
                <FormDescription>
                  Give your study plan a clear and concise title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your study plan"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a brief description of your study plan's objectives.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjects"
            render={() => (
              <FormItem>
                <FormLabel>Subjects</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {form.watch("subjects").map((subject, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                      >
                        {subject}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-auto p-0"
                          onClick={() => removeSubject(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <Input
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="Add a subject"
                        className="w-40"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addSubject}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Add the subjects you plan to study.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goals"
            render={() => (
              <FormItem>
                <FormLabel>Goals</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {form.watch("goals").map((goal, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-secondary text-secondary-foreground rounded-md px-3 py-2"
                      >
                        <span>{goal}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGoal(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <Input
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="Add a goal"
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addGoal}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Set specific goals for your study plan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          field.value.toLocaleDateString()
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date("2100-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Choose the start date for your study plan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Study Plan
          </Button>
        </form>
      </Form>
    </div>
  );
}
