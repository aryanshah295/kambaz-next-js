import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
  currentUser,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
  currentUser?: { role: string } | null;
}) {
  // Check if user is ADMIN or FACULTY
  const canEdit = currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY";

  return (
    <div className="float-end">
      {canEdit && (
        <>
          <FaPencil
            onClick={() => editModule(moduleId)}
            className="text-primary me-3"
            style={{ cursor: "pointer" }}
          />
          <FaTrash
            className="text-danger me-3 mb-1"
            onClick={() => deleteModule(moduleId)}
            style={{ cursor: "pointer" }}
          />
        </>
      )}
      <GreenCheckmark />
      {canEdit && <BsPlus className="fs-1" />}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}