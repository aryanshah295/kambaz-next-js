
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGripVertical } from "react-icons/bs";

export default function AssignmentDropButton() {
  return (
    <div className="float-start">
        <BsGripVertical className="me-2 fs-3"/>
        <IoMdArrowDropdown className="me-2"/>
     </div>
  )
}
