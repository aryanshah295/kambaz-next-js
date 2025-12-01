"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import * as client from "../../../client";

export default function AssignmentPage() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  // Check if this is a new assignment or editing existing
  const isNew = aid === "new" || searchParams.get("new") === "true";
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  // Find existing assignment if editing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingAssignment = assignments.find((item: any) => item.course === cid && item._id === aid && aid !== "new");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [dueOn, setDueOn] = useState("");
  const [availableOn, setAvailableOn] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  // Initialize form with existing assignment data
  useEffect(() => {
    if (!isNew && existingAssignment) {
      setTitle(existingAssignment.title || "");
      setDescription(existingAssignment.description || "");
      setPoints(existingAssignment.points ?? 0);
      setDueOn(existingAssignment.dueOn?.slice(0, 16) || "");
      setAvailableOn(existingAssignment.availableOn?.slice(0, 16) || "");
      setAvailableUntil(existingAssignment.availableUntil?.slice(0, 16) || "");
    }
  }, [isNew, existingAssignment]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter an assignment name");
      return;
    }

    if (!cid || Array.isArray(cid)) return;

    try {
    if (isNew) {
      // Create new assignment
        const newAssignment = await client.createAssignmentForCourse(cid, {
          title,
          description,
          points,
          dueOn: dueOn || null,
          availableOn: availableOn || null,
          availableUntil: availableUntil || null,
        });
        dispatch(addAssignment(newAssignment));
    } else if (existingAssignment) {
      // Update existing assignment
        const updatedAssignment = await client.updateAssignment({
          ...existingAssignment,
          title,
          description,
          points,
          dueOn: dueOn || null,
          availableOn: availableOn || null,
          availableUntil: availableUntil || null,
        });
        dispatch(updateAssignment(updatedAssignment));
    }

    // Navigate back to assignments
    router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error(error);
      alert("Failed to save assignment. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  // Edit form for new or existing assignments
  return (
    <Container fluid id="wd-assignments-editor" className="py-2">
      <Form>
        {/* Assignment name */}
        <Row className="g-3 mb-4">
          <Col sm={12} md={8} lg={7}>
            <Form.Group controlId="wd-name">
              <Form.Label className="fw-semibold">Assignment Name</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter assignment name"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Description */}
        <Row className="g-3 mb-4">
          <Col sm={12} md={8} lg={7}>
            <Form.Group controlId="wd-description">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter assignment description"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Points */}
        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-points">Points</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <Form.Control
              id="wd-points"
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Col>
        </Row>

        {/* Assignment group */}
        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
              <option>ASSIGNMENTS</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Display grade */}
        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
              <option>Percentage</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission type */}
        <Row className="g-3 mb-4">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <div className="border rounded p-3">
              <Form.Select
                id="wd-submission-type"
                className="mb-3"
                defaultValue="Online"
              >
                <option>Online</option>
              </Form.Select>

              <div className="fw-semibold mb-2">Online Entry Options</div>

              <Form.Check
                id="wd-text-entry"
                className="mb-2"
                label="Text Entry"
              />
              <Form.Check
                id="wd-website-url"
                className="mb-2"
                label="Website URL"
                defaultChecked
              />
              <Form.Check
                id="wd-media-recordings"
                className="mb-2"
                label="Media Recordings"
              />
              <Form.Check
                id="wd-student-annotation"
                className="mb-2"
                label="Student Annotation"
              />
              <Form.Check id="wd-file-upload" label="File Uploads" />
            </div>
          </Col>
        </Row>

        {/* Assign section */}
        <Row className="g-3 mb-4">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label className="pt-2">Assign</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <div className="border rounded p-3">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assign-to" className="fw-semibold">
                  Assign to
                </Form.Label>
                <Form.Control id="wd-assign-to" defaultValue="Everyone" />
              </Form.Group>

              <Row className="g-3">
                <Col xs={12}>
                  <Form.Group controlId="wd-due-date">
                    <Form.Label className="fw-semibold">Due</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      step="60"
                      value={dueOn}
                      onChange={(e) => setDueOn(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="wd-available-from">
                    <Form.Label className="fw-semibold">Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      step="60"
                      value={availableOn}
                      onChange={(e) => setAvailableOn(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="wd-available-until">
                    <Form.Label className="fw-semibold">Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      step="60"
                      value={availableUntil}
                      onChange={(e) => setAvailableUntil(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={8} lg={7}>
            <hr className="my-4" />
          </Col>
        </Row>

        {/* Actions */}
        <Row>
          <Col sm={3} md={2} />
          <Col
            sm={9}
            md={6}
            lg={5}
            className="d-flex justify-content-end gap-2"
          >
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-light"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-danger"
            >
              Save
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
