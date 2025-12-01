"use client";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import type { Assignment } from "./Assignments/reducer";

export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
  const pathname = usePathname();
  const params = useParams();
  const { assignments } = useSelector((state: { assignmentsReducer: { assignments: Assignment[] } }) => state.assignmentsReducer);
  
  const last = pathname?.split("/").filter(Boolean).pop();
  let section = last === "Table" && pathname?.includes("/People/") ? "People" : last || "Home";
  
  if (pathname?.includes("/Assignments/")) {
    const aid = (params as any).aid;
    if (aid && aid !== "new" && !Array.isArray(aid)) {
      const assignment = assignments.find((a: Assignment) => a._id === aid);
      if (assignment) {
        section = assignment.title;
      }
    }
  }
  
  return (
    <span>
      {course?.name} &gt; {section}
    </span>
  );
}
