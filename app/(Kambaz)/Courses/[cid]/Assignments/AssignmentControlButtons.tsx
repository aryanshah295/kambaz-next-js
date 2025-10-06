import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <FaPlus className="me-2"/>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}