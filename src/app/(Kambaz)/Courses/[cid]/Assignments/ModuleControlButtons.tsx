import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  onDelete,
  currentUser,
}: {
  onDelete?: () => void;
  currentUser?: { role: string } | null;
}) {
  
  const canEdit = currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY";

  return (
    <span className="d-flex align-items-center me-2 float-end">
      {canEdit && onDelete && (
        <FaTrash
          className="text-danger me-3 mb-1"
          onClick={onDelete}
          style={{ cursor: "pointer" }}
          title="Delete assignment"
        />
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </span>
  );
}