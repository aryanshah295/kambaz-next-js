"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
    const params = useParams<{ cid: string }>();
    const pathname = usePathname();
    const cid = params.cid;
    const encodedCid = encodeURIComponent(cid);
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((label) => {
                const href =
                    label === "People"
                        ? `/Courses/${encodedCid}/People/Table`
                        : `/Courses/${encodedCid}/${label}`;
                const isActive = pathname?.startsWith(href);
                const linkId = `wd-course-${label.toLowerCase()}-link`;
                return (
                    <Link
                        key={label}
                        href={href}
                        id={linkId}
                        className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}
