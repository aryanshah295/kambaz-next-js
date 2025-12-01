"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";

export default function ModulesControls({
  currentUser,
}: {
  currentUser?: { role: string } | null;
}) {
  const { cid } = useParams<{ cid: string }>();

  // Check if user is ADMIN or FACULTY
  const canEdit = currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY";

  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <div className="input-group me-1 float-start" style={{ maxWidth: 500, height: "48px" }}>
        <span
          className="input-group-text bg-white"
          id="wd-search-assignment"
          style={{ height: "48px", borderRight: "none" }}
        >
          <BsSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for Assignment"
          id="wd-search-assignment"
          style={{ height: "48px", borderLeft: "none" }}
        />
      </div>
      {canEdit && (
        <>
          <Link 
            href={`/Courses/${cid}/Assignments/new?new=true`} 
            className="btn btn-danger btn-lg me-1 float-end" 
            id="wd-add-assignment"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Link>
          
        </>
      )}
      <Button 
            variant="secondary" 
            size="lg" 
            className="me-1 float-end" 
            id="wd-add-assignment-group"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
    </div>
  );
}