"use client";
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { User } from "../../Account/reducer";
import { setCourses } from "../reducer";
import * as client from "../client";

type Course = {
  _id: string;
  name: string;
  [key: string]: unknown;
};

type CoursesState = {
  courses: Course[];
};

export default function CoursesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { courses } = useSelector((state: { coursesReducer: CoursesState }) => state.coursesReducer);
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: User | null } }) => state.accountReducer);

  const course = courses.filter((c: Course) => c && c._id).find((course: Course) => course._id === cid);

  useEffect(() => {
    if (currentUser && courses.length === 0) {
      const fetchCourses = async () => {
        try {
          const fetchedCourses = await client.findMyCourses();
          dispatch(setCourses(fetchedCourses));
        } catch (error) {
          console.error(error);
        }
      };
      fetchCourses();
    }
  }, [currentUser, courses.length, dispatch]);

  useEffect(() => {
    if (currentUser && cid && !Array.isArray(cid)) {
      if (courses.length === 0) {
        return;
      }
      const isEnrolled = courses.filter((c: Course) => c && c._id).some((c: Course) => c._id === cid);
      const isFaculty = currentUser.role === "FACULTY";

      if (!isEnrolled && !isFaculty) {
        router.push("/Dashboard");
      }
    }
  }, [currentUser, cid, courses, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
