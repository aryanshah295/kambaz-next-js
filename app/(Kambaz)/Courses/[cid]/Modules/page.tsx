"use client"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import * as client from "../../client";
import { useDispatch, useSelector } from "react-redux";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { RootState } from "../../../store";


export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    const fetchModules = async () => {
        const modules = await client.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    }

    const onCreateModuleForCourse = async () => {
        if (!cid) return;
        const newModule = { name: moduleName, course: cid };
        const m = await client.createModuleForCourse(String(cid), newModule);
        dispatch(setModules([...modules, m]));
    };

    const onRemoveModule = async (moduleId: string) => {
        await client.deleteModule(moduleId);
        dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
    };

    const onUpdateModule = async (module: any) => {
        await client.updateModule(module);
        const newModules = modules.map((m: any) => m._id === module._id ? module: m);
        dispatch(setModules(newModules));
    }

    const userRole = currentUser?.role;

    let facultyShow = "block"

    if (currentUser?.role !== "FACULTY") {
        facultyShow = "none"
    }

    useEffect(() => {
        fetchModules();
    }, []);

    return (
        <div>
            <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={onCreateModuleForCourse} 
                facultyShow={facultyShow}/>
            <br /><br /><br /><br />
            <ListGroup id="wd-modules" className="rounded-0">
                {modules
                    .map((module) => (
                        <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between">
                                <div><BsGripVertical className="me-2 fs-3" />
                                    {!module.editing && module.name}
                                    { module.editing && (
                                        <FormControl className="w-50 d-inline-block"
                                            onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value}))}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onUpdateModule({ ...module, editing: false });
                                                }
                                            
                                            }} 
                                            defaultValue={module.name} />
                                            )}
                                </div> 
                                    <ModuleControlButtons 
                                        moduleId={module._id} deleteModule={(moduleId) => { onRemoveModule(moduleId) }} 
                                        editModule={(moduleId) => dispatch(editModule(moduleId))}
                                        facultyShow={facultyShow}/>
                            </div>
                            {module.lessons && (
                                <ListGroup className="wd-lessons rounded-0">
                                    {module.lessons.map((lesson) => (
                                        <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                                            <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    ))}
            </ListGroup>
        </div>
    )
}