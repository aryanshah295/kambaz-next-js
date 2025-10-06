"use client";

import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
export default function AssignmentsControls() {
  return (
    <div id="wd-assignment-controls" className="text-nowrap">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-group-btn"
      >
        + Group
      </Button>
      <div className="float-start" style={{ width: "300px" }}>
        <span className="d-flex align-items-center border rounded px-2 py-1">
          <span className="p-2">
            <IoSearchOutline />
          </span>
          <FormControl
            size="lg"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            id="wd-search-assignment"
            className="border-0"
          />
        </span>
      </div>
    </div>
  );
}