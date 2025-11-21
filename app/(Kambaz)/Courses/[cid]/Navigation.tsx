"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { courses } from "../../Database";
export default function CourseNavigation(
) {
    const { cid } = useParams(); 
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const pathname = usePathname();

    return (
        <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <ListGroupItem key={link} as={Link} href={`/Courses/${cid}/${link}`}
                    className={`list-group-item border-0 
                        ${pathname.includes(link) ? "text-black" : "text-danger"}`}>
                    {link}
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}