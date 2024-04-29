import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { priorityToString, statusToString } from "@/lib/convert";
import { ITaskItem } from "@/types/ITaskItem";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Progress from "./Progress";

export default function NewTask() {
  return (
    <>
      <h2>Create a new task</h2>
    </>
  );
}
