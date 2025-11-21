"use client";

import Link from 'next/link'
import React from 'react'

export default function AddAssignmentButtons({prev, addAssignment}: { 
  prev: string; addAssignment: () => void;
}) {
  return (
    <div className="mt-2 mb-3">
        <Link onClick={addAssignment} href={`/Courses/${prev}/Assignments`} className="btn btn-danger btn-lg me-1 text-nowrap float-end">
            Save
        </Link>

        <Link href={`/Courses/${prev}/Assignments`} className="btn btn-secondary btn-lg me-1 text-nowrap float-end">
            Cancel
        </Link>
    </div>
  )
}