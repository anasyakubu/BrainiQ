"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Code,
  Calculator,
  Beaker,
  Pencil,
  CheckCircle,
  Trash2,
} from "lucide-react";

// Helper function to get icon component based on subject name
const getSubjectIcon = (subject: string) => {
  switch (subject.toLowerCase()) {
    case "math":
      return <Calculator className="mr-1 h-4 w-4" />;
    case "science":
      return <Beaker className="mr-1 h-4 w-4" />;
    case "literature":
      return <BookOpen className="mr-1 h-4 w-4" />;
    case "programming":
      return <Code className="mr-1 h-4 w-4" />;
    default:
      return <Pencil className="mr-1 h-4 w-4" />;
  }
};

// Study plan type definition
type StudyPlan = {
  id: number;
  title: string;
  description: string;
  subjects: string[];
  goals: string[];
  dailySchedule: { time: string; task: string }[];
  createdAt: string;
  updatedAt: string;
};

// Sample data
const studyPlans: StudyPlan[] = [
  {
    id: 1,
    title: "Computer Science Fundamentals",
    description: "A comprehensive study plan covering core CS concepts",
    subjects: ["Programming", "Data Structures", "Algorithms"],
    goals: [
      "Complete 3 coding challenges daily",
      "Implement 1 data structure weekly",
      "Solve 5 algorithm problems weekly",
    ],
    dailySchedule: [
      { time: "9:00 AM", task: "Review yesterday's material" },
      { time: "10:00 AM", task: "Study new concepts" },
      { time: "2:00 PM", task: "Practice coding" },
      { time: "4:00 PM", task: "Work on projects" },
    ],
    createdAt: "2024-11-01",
    updatedAt: "2024-11-15",
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    description: "Dive deep into advanced mathematical concepts",
    subjects: ["Calculus", "Linear Algebra", "Statistics"],
    goals: [
      "Solve 10 calculus problems daily",
      "Complete 1 linear algebra chapter weekly",
      "Analyze 2 statistical datasets weekly",
    ],
    dailySchedule: [
      { time: "8:00 AM", task: "Calculus practice" },
      { time: "11:00 AM", task: "Linear algebra study" },
      { time: "2:00 PM", task: "Statistics problems" },
      { time: "5:00 PM", task: "Review and summarize" },
    ],
    createdAt: "2024-11-05",
    updatedAt: "2024-11-18",
  },
];

export default function Component() {
  const [plans, setPlans] = useState(studyPlans);

  const handleDelete = (id: number) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const handleMarkComplete = (id: number) => {
    // This is a placeholder. In a real app, you'd update the plan's status.
    console.log(`Marked plan ${id} as complete`);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-5">Study Plans (2)</h1>
      {plans.map((plan) => (
        <Card key={plan.id} className="w-full">
          <CardHeader>
            <CardTitle>{plan.title}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Subjects:</h3>
                <div className="flex flex-wrap gap-2">
                  {plan.subjects.map((subject, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center"
                    >
                      {getSubjectIcon(subject)}
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Goals:</h3>
                <ul className="space-y-2">
                  {plan.goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <Checkbox
                        id={`goal-${plan.id}-${index}`}
                        className="mr-2 mt-1"
                      />
                      <label
                        htmlFor={`goal-${plan.id}-${index}`}
                        className="text-sm"
                      >
                        {goal}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Daily Schedule:</h3>
                <ScrollArea className="h-[100px] w-full rounded-md border p-4">
                  <ul className="space-y-2">
                    {plan.dailySchedule.map((item, index) => (
                      <li key={index} className="flex justify-between text-sm">
                        <span className="font-medium">{item.time}</span>
                        <span>{item.task}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>Created on {new Date(plan.createdAt).toLocaleDateString()}</p>
              <p>
                Last updated: {new Date(plan.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/study-plans/${plan.id}/edit`} passHref>
                <Button variant="outline" size="sm">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMarkComplete(plan.id)}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(plan.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
