import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { FaPencil, FaTrash } from "react-icons/fa6";

export default function ModuleControlButtons(
  { moduleId, deleteModule, editModule, facultyShow }: {
      moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void; facultyShow: string}) {

    if (facultyShow === "block") {
      facultyShow = "inline"
    }
  return (
    <div className="float-end text-nowrap">
        <FaPencil onClick={() => editModule(moduleId)} className={`d-${facultyShow} text-primary me-3`} />
        <FaTrash className={`d-${facultyShow} text-danger me-3 mb-1`} onClick={() => deleteModule(moduleId)}/>
        <GreenCheckmark />
        <BsPlus className="fs-2"/>
        <IoEllipsisVertical className="fs-4" />
    </div>
  )
}
