"use client";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { FaBan } from "react-icons/fa";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";

export default function ModulesControls(
    { moduleName, setModuleName, addModule, facultyShow }:
    { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; facultyShow: string }) {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
        <Button variant="danger" onClick={handleShow} size="lg" className={`d-${facultyShow} me-1 float-end`} id="wd-add-module-btn">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Module</Button>
        <Dropdown className={`d-${facultyShow} float-end me-1`}>
            <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
                <GreenCheckmark /> Publish All
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem id="wd-publish-all-modules-and-items">
                    <GreenCheckmark /> Publish all modules and items
                </DropdownItem>
                <DropdownItem id="wd-publish-modules-only">
                    <GreenCheckmark /> Publish modules only
                </DropdownItem>
                <DropdownItem id="wd-unpublish-all-modules-and-items">
                    <FaBan className="fs-5"/> Unpublish all modules and items
                </DropdownItem>
                <DropdownItem id="wd-unpublish-modules-only">
                    <FaBan className="fs-5"/> Unpublish modules only
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Button variant="secondary" size="lg" className={`d-${facultyShow} me-1 float-end`} id="wd-view-progress">
            View Progress</Button>

        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-collapse-all">
            Collapse All</Button>

        <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
            moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
    </div>
  )
}
