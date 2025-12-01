"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentControlButtons({
  currentUser,
}: {
  currentUser?: { role: string } | null;
}) {
  const { cid } = useParams<{ cid: string }>();


  const canEdit = currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY";

  return (
    <div className="float-end">
      {canEdit && (
        <Link
          href={`/Courses/${cid}/Assignments/new?new=true`}
          className="btn btn-link text-decoration-none text-dark p-0 me-2"
          id="wd-add-assignment-btn"
        >
          <BsPlus className="fs-2" />
        </Link>
      )}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}