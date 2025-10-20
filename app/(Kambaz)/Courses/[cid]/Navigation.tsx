"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CourseNavigation() {
  const path = usePathname();
  const cid = path.split("/")[2];
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          href={`/Courses/${cid}/${link}`}
          id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item border-0
            ${path.includes(link) ? "active" : "text-danger"}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}