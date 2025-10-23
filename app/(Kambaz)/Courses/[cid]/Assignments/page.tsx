"use client";

import Link from "next/link";
import AssignmentsControls from "./AssignmentControls";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import IndvAssignmentControlButtons from "./IndvAssignmentControlButtons";
import { MdAssignment } from "react-icons/md";
import { useParams } from "next/navigation";

import { assignments } from "../../../Database";

const formatDateToMonthDayYear = (dateString: string) => {
  const date = new Date(dateString); // Create a Date object from your date string
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function Assignments() {
  const { cid, aid } = useParams();
  return (
    <Container id="wd-assignments">
      <AssignmentsControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS
            <AssignmentControlButtons />
            <Badge
              bg="light"
              text="dark"
              className="me-2 rounded-pill px-3 py-2 float-end"
            >
              40% of Total
            </Badge>
          </div>
          <ListGroup className="wd-assignment-list rounded-0">
            {assignments
              .filter((assignment) => assignment.course === cid)
              .map((assignment) => (
                <ListGroup.Item
                  key={assignment._id}
                  className="wd-assignment-item p-3 ps-1"
                >
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <MdAssignment className="me-2 fs-3" />
                    <div className="flex-grow-1 p-1">
                      <Link
                        href={`/Courses/${cid}/Assignments/${assignment._id}`}
                        className="text-decoration-none text-dark w-bold fs-5"
                      >
                        {assignment.title}
                      </Link>
                      <div className="mt-1">
                        <span className="text-danger me-2">
                          {assignment.modules
                            ? assignment.modules.length > 1
                              ? "Multiple Modules"
                              : "Single Module"
                            : "No Module"}
                        </span>
                        | Not available until
                        {formatDateToMonthDayYear(assignment.availableDate)} |
                        Due
                        {formatDateToMonthDayYear(assignment.dueDate)} |
                        {assignment.points} pts
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}