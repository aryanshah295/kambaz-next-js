"use client";
import React from 'react'
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from '../Modules/GreenCheckmark';
import { FaTrash } from 'react-icons/fa6';
import { useState } from "react";
import AssignmentDeleteModal from './AssignmentDeleteModal';


export default function AssignmentLessonButtons({assignmentId, deleteAssignment, deleteShow}: {
    assignmentId: string; deleteAssignment: (assignmentId: string) => void; deleteShow: string
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  if (deleteShow === "block") {
    deleteShow = "inline"
  }

  return (
    <div className="float-end text-nowrap">
        <FaTrash className={`d-${deleteShow} text-danger me-3 mb-1`} onClick={handleShow}/>
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4" />

        <AssignmentDeleteModal show={show} dialogTitle='Delete Assignment' 
          assignmentId={assignmentId} deleteAssignment={(assignmentId) => deleteAssignment(assignmentId)}
          handleClose={handleClose}/>
    </div>
  )
}