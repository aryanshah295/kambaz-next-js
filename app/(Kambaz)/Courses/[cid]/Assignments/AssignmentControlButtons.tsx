import React from 'react'
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";


export default function AssignmentControlButtons() {
  return (
    <div className="float-end text-nowrap">
      <div className="d-flex align-items-center">
        <span className="fs-5 pt-1 pb-1 ps-2 pe-2 assignment-span-border me-2">
            40% of Total</span>
        <BsPlus className="me-4 fs-2"/>
        <IoEllipsisVertical className="fs-4"/>
      </div>
    </div>
  )
}
