"use client";

import Link from 'next/link'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { RootState } from "../../../../store";


export default function EditorButtons({prev, assignment, updateAssignment}: { prev: string; assignment: any; updateAssignment: (assignment: any) => void;
}) {

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  

  return (
    <div className="mt-2 mb-3">
        <Link onClick={() => updateAssignment(assignment)} href={`/Courses/${prev}/Assignments`} className="btn btn-danger btn-lg me-1 text-nowrap float-end">
            Save
        </Link>

        <Link href={`/Courses/${prev}/Assignments`} className="btn btn-secondary btn-lg me-1 text-nowrap float-end">
            Cancel
        </Link>
    </div>
  )
}