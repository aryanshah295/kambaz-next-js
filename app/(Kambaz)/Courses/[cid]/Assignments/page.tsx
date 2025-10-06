'use client';

import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import IndvAssignmentControlButtons from "./IndvAssignmentControlButtons";
import { MdAssignment } from "react-icons/md";

export default function Assignments() {
  return (
    <Container id="wd-assignments">
      <AssignmentControls />
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
            <ListGroup.Item className="wd-assignment-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3" />
                <div className="flex-grow-1 p-1">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="text-decoration-none text-dark w-bold fs-5"
                  >
                    A1 - ENV + HTML
                  </Link>
                  <div className="mt-1">
                    <span className="text-danger me-2">Multiple Modules</span>|
                    Not available until May 6 at 12:00am | Due May 13 at 11:59pm
                    | 100 pts
                  </div>
                </div>
                <IndvAssignmentControlButtons />
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className="wd-assignment-list rounded-0">
            <ListGroup.Item className="wd-assignment-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3" />
                <div className="flex-grow-1 p-1">
                  <Link
                    href="/Courses/1234/Assignments/234"
                    className="text-decoration-none text-dark w-bold fs-5"
                  >
                    A2 - CSS + BOOTSTRAP
                  </Link>
                  <div className="mt-1">
                    <span className="text-danger me-2">Multiple Modules</span>|
                    Not available until Sep 6 at 12:00am | Due Sep 10 at 11:59pm
                    | 100 pts
                  </div>
                </div>
                <IndvAssignmentControlButtons />
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className="wd-assignment-list rounded-0">
            <ListGroup.Item className="wd-assignment-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3" />
                <div className="flex-grow-1 p-1">
                  <Link
                    href="/Courses/1234/Assignments/345"
                    className="text-decoration-none text-dark w-bold fs-5"
                  >
                    A3 - JAVASCRIPT + REACT
                  </Link>
                  <div className="mt-1">
                    <span className="text-danger me-2">Multiple Modules</span>|
                    Not available until Sep 13 at 12:00am | Due Sep 17 at
                    11:59pm | 100 pts
                  </div>
                </div>
                <IndvAssignmentControlButtons />
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className="wd-assignment-list rounded-0">
            <ListGroup.Item className="wd-assignment-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3" />
                <div className="flex-grow-1 p-1">
                  <Link
                    href="/Courses/1234/Assignments/456"
                    className="text-decoration-none text-dark w-bold fs-5"
                  >
                    A4 - NODE + EXPRESS
                  </Link>
                  <div className="mt-1">
                    <span className="text-danger me-2">Multiple Modules</span>|
                    Not available until Sep 20 at 12:00am | Due Sep 24 at
                    11:59pm | 100 pts
                  </div>
                </div>
                <IndvAssignmentControlButtons />
              </div>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}