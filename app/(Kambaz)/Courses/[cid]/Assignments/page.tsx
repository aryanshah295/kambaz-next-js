"use client";

import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import IndvAssignmentControlButtons from "./IndvAssignmentControlButtons";
import { MdAssignment } from "react-icons/md";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { deleteAssignment } from "./reducer";
import { useState } from "react";
import AssignmentDeleter from "./AssignmentDeleter";
const formatDateToMonthDayYear = (dateString: string) => {
  const date = new Date(dateString); // Create a Date object from your date string
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector(
    (state: any) => state.assignmentsReducer
  );
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [aid, setAid] = useState<string>("");

  const { currentUser } = useSelector(
    (state: any) => state.accountReducer
  );
  return (
    <div id="wd-assignments">
      <AssignmentControls />
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
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
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
                        | Not available until&nbsp;
                        {formatDateToMonthDayYear(assignment.availableDate)} |
                        Due&nbsp;
                        {formatDateToMonthDayYear(assignment.dueDate)} |
                        {assignment.points} pts
                      </div>
                    </div>
                    {currentUser.role === "FACULTY" && (
                      <FaTrash
                        className="text-danger me-2 float-end"
                        onClick={() => {
                          setAid(assignment._id);
                          handleShow();
                        }}
                      />
                    )}
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
      <AssignmentDeleter
        show={show}
        handleClose={handleClose}
        dialogTitle="Delete Assignment"
        assignmentName={
          assignments.find(
            (a: any) => a._id === aid
          )?.title || ""
        }
        deleteAssignment={() =>
          dispatch(
            deleteAssignment(assignments.find((a: any) => a._id === aid))
          )
        }
      />
    </div>
  );
}