"use client";
import { ReactNode, useEffect } from "react";
import { useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";
import { Button } from "react-bootstrap";
import { RootState } from "../../store";
import * as client from "../client";


export default function CoursesLayout(
    { children }: Readonly<{ children: ReactNode }>) {
        const { cid } = useParams();
        // const { courses } = useSelector((state: RootState) => state.coursesReducer);
        // const course = courses.find((course: any) => course._id === cid);
        const [open, setOpen] = useState("block");
        
        const handleOpen = () => {
            open === "block" ? setOpen("none") : setOpen("block")
        }

        const [course, setCourse] = useState<any>()
        
        const getSpecificCourse = async () => {
            const course = await client.getSpecificCourse(String(cid));
            setCourse(course);
        }

        useEffect(() => {
            getSpecificCourse();
        }, []);

        return (

            <div id="wd-courses">
                <h2 className="text-danger">
                    <Button onClick={handleOpen} variant="none" className="text-danger me-4" >
                        <FaAlignJustify className="fs-4 mb-1 text-danger" />
                    </Button>
                    {course?.name}
                    
                </h2> <hr />
                <div className="d-flex">
                    <div className={`d-none d-md-${open}`}>
                        <CourseNavigation />
                    </div>
                    <div className="flex-fill">
                        {children}
                    </div>
                </div>
            </div>
        );
    }