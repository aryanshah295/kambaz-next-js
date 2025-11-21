"use client";
import React from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import { CiSearch } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import { useState } from "react";
import { redirect } from "next/dist/client/components/navigation";
import { ParamValue } from 'next/dist/server/request/params';
import Link from 'next/link';
import { addAssignment } from "./reducer";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";




export default function AssignmentControls({assignmentCId, show} : {
  assignmentCId: ParamValue; show: string}
) {

  const dispatch = useDispatch();

  return (
    <div className="mt-2 mb-3">
        <InputGroup size="lg" className="w-50 float-start">
            <InputGroupText className="bg-white pe-2 ps-2 border-right-none"><CiSearch className="fs-4"/></InputGroupText>
            <FormControl className="border-left-none ps-0" placeholder="Search..." />
        </InputGroup>


        <Link href={`/Courses/${assignmentCId}/Assignments/AddAssignment`}
            className={`d-${show} btn btn-danger btn-lg me-1 text-nowrap float-end`}>
             <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> Assignment
        </Link>

        <Button variant="secondary" size="lg" className="me-1 text-nowrap float-end">
             <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> Group
        </Button>
    </div>
  )
}
