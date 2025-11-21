"use client";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaCalendarAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setAssignments, addAssignment } from "../reducer";
import AddAssignmentButtons from "./AddAssignmentButtons";
import { RootState } from "../../../../store";
import * as client from "../../../client";


export default function AddAssignmentEditor() {

    const { cid } = useParams();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    

    const [ assignmentTitle, setNewAssignmentTitle ] = useState("New Assignment");
    const [ assignmentPoint, setNewAssignmentPoint ] = useState(0);
    const [ assignmentAvailable, setNewAssignmentAvailable ] = useState("2023-01-16T07:59:00");
    const [ assignmentDue, setNewAssignmentDue ] = useState("2023-01-16T07:59:00");
    const [ assignmentUntil, setNewAssignmentUntil ] = useState("2023-01-16T07:59:00");
    const [ assignmentDescription, setNewAssigmentDescription ] = useState("New Description");

    const onCreateAssignmentForCourse = async () => {
        if (!cid) return;
        const newAssignment = { title: assignmentTitle, points: assignmentPoint, available: assignmentAvailable,
                                due: assignmentDue, until: assignmentUntil, description: assignmentDescription, 
                                course: cid };
        const assignment = await client.createAssignmentForCourse(String(cid), newAssignment);
        dispatch(setAssignments([...assignments, assignment]));
    }
    
  return (
    <div id="wd-assignments-editor">
                <div >
                    <Form className="mb-4">
                        <Form.Group className="mb-3" id="wd-name">
                            <Form.Label>Assignment Name</Form.Label>
                            <Form.Control onChange={(e) => {setNewAssignmentTitle(e.target.value)}} type="text" placeholder="Enter assignment name" defaultValue={assignmentTitle} />
                        </Form.Group>
                        <Form.Control as="textarea" rows={14} onChange={(e) =>{setNewAssigmentDescription(e.target.value)} }
                        defaultValue={assignmentDescription}/>
                    </Form>

                    <div className="pe-2">
                        <Row className="mb-3" id="wd-points">
                            <Form.Label sm="4" className="text-end" column>Points</Form.Label>
                            <Col sm="8"><Form.Control type="number" defaultValue={100}
                                onChange={(e) => {
                                    setNewAssignmentPoint(parseInt(e.target.value))}} />
                            </Col>
                        </Row>

                        <Row className="mb-3" id="wd-group">
                            <Form.Label sm="4" className="text-end" column>Assignment Group</Form.Label>
                            <Col sm="8">
                                <Form.Select>
                                    <option value="ASSIGNMENTS" defaultChecked>ASSIGNMENTS</option>
                                    <option value="QUIZZES">QUIZZES</option>
                                    <option value="EXAMS">EXAMS</option>
                                    <option value="PROJECTS">PROJECTS</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="mb-3" id="wd-display-grade-as">
                            <Form.Label sm="4" className="text-end" column>Display Grade as</Form.Label>
                                <Col sm="8">
                                    <Form.Select>
                                        <option value="PERCENTAGE" defaultChecked>Percentage</option>
                                        <option value="POINTS">Points</option>
                                        <option value="LETTERGRADE">Letter Grade</option>
                                    </Form.Select>
                                </Col>
                        </Row>

                        <Row as={Row} className="mb-3" id="wd-submission-type">
                            <Form.Label sm="4" className="text-end" column>Submission Type</Form.Label>
                            <Col sm="8">
                                <fieldset className="assignment-field-border pt-3 pb-3 ps-3 pe-3">
                                    <Form.Select id="wd-submission-type" className="mb-4">
                                        <option value="Online">Online</option>
                                        <option value="External">External Tool</option>
                                        <option value="Offline">Offline</option>
                                    </Form.Select>

                                    <Form.Group id="wd-online-entry">
                                        <Form.Label className="mb-3"><b>Online Entry Options</b></Form.Label>
                                        <Form.Check className="mb-3" label="Text Entry" name="check-online-entry-options" id="wd-text-entry" />
                                        <Form.Check className="mb-3" label="Website URL" name="check-online-entry-options" id="wd-website-url" />
                                        <Form.Check className="mb-3" label="Media Recordings" name="check-online-entry-options" id="wd-media-recordings" />
                                        <Form.Check className="mb-3" label="Student Annotation" name="check-online-entry-options" id="wd-student-annotation" />
                                        <Form.Check className="mb-3" label="File Uploads" name="check-online-entry-options" id="wd-file-upload" />        
                                    </Form.Group>   
                                </fieldset>
                            </Col>
                        </Row>

                        <Row as={Row} id="wd-assign-to">  
                            <Form.Label sm="4" className="text-end" column>Assign</Form.Label>
                            <Col>
                                <fieldset className="assignment-field-border pt-3 pb-3 ps-3 pe-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label><b>Assign To</b></Form.Label>
                                        <Form.Group className="assignment-field-border pt-2 pb-2 ps-2 pe-2">
                                            <InputGroup>
                                                <InputGroupText>Everyone</InputGroupText>
                                                <InputGroupText className="border-left-none"><RxCross2 className="fs-6"/></InputGroupText>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Group>

                                    <Form.Group id="wd-due-date" className="mb-3">
                                        <Form.Label><b>Due</b></Form.Label>
                                        <Form.Control onChange={(e) => setNewAssignmentDue(e.target.value)}
                                            type="datetime-local" defaultValue={assignmentDue} />
                                    </Form.Group>

                                    <Row>
                                        <Col id="wd-available-from">
                                            <Form.Label><b>Available from</b></Form.Label>
                                            <Form.Control onChange={(e) => setNewAssignmentAvailable(e.target.value)}
                                                type="datetime-local" defaultValue={assignmentAvailable} />
                                        </Col>
                                        <Col id="wd-available-until">
                                            <Form.Label><b>Until</b></Form.Label>
                                            <Form.Control onChange={(e) => {setNewAssignmentUntil(e.target.value)}}
                                                type="datetime-local" defaultValue={assignmentUntil} />
                                        </Col>
                                    </Row>
                                </fieldset>
                            </Col>
                        </Row>
                    </div>
                    <br /><hr />
                    <AddAssignmentButtons prev={`${cid}`} addAssignment={onCreateAssignmentForCourse}/>
                </div>
    </div>
  );
}