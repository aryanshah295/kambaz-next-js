"use client";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaCalendarAlt } from "react-icons/fa";
import EditorButtons from "./EditorButtons";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, updateAssignment } from "../reducer";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../../store";
import Link from "next/link";
import * as client from "../../../client";




 
export default function AssignmentEditor() {

    const { cid, aid } = useParams();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    const dispatch = useDispatch();

    const get_t = (a: Date) => {
        const date = a.toLocaleDateString('en-US', {month: 'short', day: '2-digit'});
        const t = a.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}).substring(0, 5);
        const z = a.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}).substring(6, 8).toLowerCase();
        return `${date} by ${t}${z}`;
    }

    const onUpdateAssignment = async (assignment: any) => {
        await client.updateAssignment(assignment);
        const newAssignments = assignments.map((a: any) => a._id === assignment._id ? assignment : a );
        dispatch(setAssignments(newAssignments));
    }
    
  return (
        <div id="wd-assignments-editor">
            {
            currentUser?.role === "FACULTY" ? 
            assignments
                .filter((assignment) => assignment.course === cid)
                .filter((assignment) => assignment._id === aid)
                .map((assignment) => (
                    <div key={assignment._id}>
                        <Form className="mb-4">
                            <Form.Group className="mb-3" id="wd-name">
                                <Form.Label>Assignment Name</Form.Label>
                                <Form.Control onChange={(e) => {if (currentUser?.role === "FACULTY") {dispatch(updateAssignment( {...assignment, title: e.target.value}))}}} type="text" placeholder="Enter assignment name" defaultValue={assignment.title} />
                            </Form.Group>
                            <Form.Control as="textarea" rows={14} onChange={(e) => {if (currentUser?.role === "FACULTY") {dispatch(updateAssignment( {...assignment, description: e.target.value}))}}}
                            defaultValue={assignment.description}/>
                        </Form>

                        <div className="pe-2">
                            <Row className="mb-3" id="wd-points">
                                <Form.Label sm="4" className="text-end" column>Points</Form.Label>
                                <Col sm="8"><Form.Control onChange={(e) => {if (currentUser?.role === "FACULTY") {dispatch(updateAssignment( {...assignment, points: e.target.value}))}}} type="number" defaultValue={assignment.points} /></Col>
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
                                            <Form.Control  onChange={(e) => {if (currentUser?.role === "FACULTY") {dispatch(updateAssignment( {...assignment, due: e.target.value}))}}} type="datetime-local" defaultValue={assignment.due} />
                                        </Form.Group>

                                        <Row>
                                            <Col id="wd-available-from">
                                                <Form.Label><b>Available from</b></Form.Label>
                                                <Form.Control  onChange={(e) => {if (currentUser?.role === "FACULTY") {dispatch(updateAssignment( {...assignment, available: e.target.value}))}}} type="datetime-local" defaultValue={assignment.available} />
                                            </Col>
                                            <Col id="wd-available-until">
                                                <Form.Label><b>Until</b></Form.Label> 
                                                <Form.Control  onChange={(e) => {if (currentUser?.role === "FACULTY") {dispatch(updateAssignment( {...assignment, until: e.target.value}))}}} type="datetime-local" defaultValue={assignment.until} />
                                            </Col>
                                        </Row>
                                    </fieldset>
                                </Col>
                            </Row>
                        </div>
                                        <br /><hr />
                <EditorButtons prev={`${cid}`} assignment={assignment} updateAssignment={(assignment) => onUpdateAssignment(assignment)} />
                    </div>
                ))
            :

            assignments.filter((assignment) => assignment.course === cid)
            .filter((assignment) => assignment._id === aid)
            .map((assignment) => (
                <div key={assignment._id}>
                    <h3>{assignment.title}</h3>
                    <hr />
                    <div className="d-flex">
                        <div><b>Due</b>: {get_t(new Date(assignment.due))}</div>
                        <div className="ms-5"><b>Points</b>: {assignment.points} </div>
                        <div> </div>
                    </div>
                    <hr />

                    <br /><br /><br /><br />

                    <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary">
                        Previous
                    </Link>
                </div>

            ))
            }


        </div>
  );
}