"use client"
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentListButtons from "./AssignmentListButtons";
import AssignmentDropButton from "./AssignmentDropButton";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { RootState } from "../../../store";

import { useSelector, useDispatch } from "react-redux";
import { setAssignments, addAssignment, deleteAssignment, updateAssignment, editAssignment } from "./reducer";
import { useState, useEffect } from "react";
import AssignmentLessonButtons from "./AssignmentLessonButton";
import LessonControlButtons from "../Modules/LessonControlButtons";
import * as client from "../../client";

export default function Assignments() {
    const { cid } = useParams();
    const get_t = (a: Date) => {
        const date = a.toLocaleDateString('en-US', {month: 'short', day: '2-digit'});
        const t = a.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}).substring(0, 5);
        const z = a.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}).substring(6, 8).toLowerCase();
        return `${date} at ${t}${z}`;
    }

    const { currentUser } = useSelector((state: RootState) => state.accountReducer)

    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const dispatch = useDispatch();

    const fetchAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(String(cid));
        dispatch(setAssignments(assignments));
    }

    const onDeleteAssignment = async (assignmentId: string) => {
        await client.deleteAssignment(assignmentId);
        dispatch(setAssignments([...assignments.filter((assignment: any) => assignment._id !== assignmentId)]))
    }

    let open = "block"

    if (currentUser?.role !== "FACULTY") {
        open = "none"
    }

    useEffect(() => {
        fetchAssignments();
    }, [])

    return (
        <div id="wd-assignments">
            <AssignmentControls
                assignmentCId={cid} show={open}
            /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-assignment-list">
                <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
                    <div className="p-3 ps-2 pb-4 pt-4 bg-secondary d-flex align-items-center justify-content-between">
                        <div>
                            <AssignmentDropButton />
                            <span id="wd-assignments-title" className="fs-4"><b>ASSIGNMENTS</b></span> 
                        </div>
                        <AssignmentControlButtons />
                    </div>

                    <ListGroup className="rounded-0">
                        {assignments
                            .filter((assignment) => assignment.course === cid)
                            .map((assignment) => (
                                <ListGroupItem key={assignment._id} className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <AssignmentListButtons />
                                        <div className="ms-3 me-5">
                                            <Link onClick={() => dispatch(editAssignment(assignment._id))} href={`/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link text-black text-decoration-none">
                                                <b>{assignment.title}</b> <br />
                                            </Link>
                                            <span className="fs-6 mb-0"><span className="text-danger">Multiple Modules</span> | <b>Not available until </b> 
                                                  {get_t(new Date(assignment.available))} | <b>Due</b> {get_t(new Date(assignment.due))} | {assignment.points} pts</span>
                                        </div>
                                    </div>
                                    <AssignmentLessonButtons assignmentId={assignment._id} 
                                        deleteAssignment={(assignmentId) => {onDeleteAssignment(assignmentId)}} deleteShow={open}/>
                                </ListGroupItem>
                            ))}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>

        </div>
    )
}