import React from 'react'
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";


export default function AssignmentListButtons() {
  return (
    <div className="float-start text-nowrap">
        <BsGripVertical className="me-2 fs-3"/>
        <MdOutlineAssignment className="me-2 fs-3 text-success"/>
    </div>
  )
}
