"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import Button from "react-bootstrap/esm/Button";
import CardText from "react-bootstrap/esm/CardText";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardImg from "react-bootstrap/esm/CardImg";
import FormControl from "react-bootstrap/esm/FormControl";
import * as courseClient from "../Courses/client";
import * as userClient from "../Account/client";
import { useSelector } from "react-redux";
import type { User } from "../Account/reducer";

export type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  image?: string;
  enrolled?: boolean;
};

type CoursesState = {
  courses: Course[];
};

export default function Dashboard() {
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: User | null } }) => state.accountReducer);

  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "D123",
    credits: 0,
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const resetCourseForm = () => {
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      department: "D123",
      credits: 0,
      image: "/images/reactjs.jpg",
      description: "New Description",
    });
  };

  const findCoursesForUser = async () => {
    if (!currentUser?._id) return;
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(Array.isArray(courses) ? courses.filter((c: any) => c && c._id) : []);
    } catch (error) {
      console.error(error);
      setCourses([]);
    }
  };

  const fetchCourses = async () => {
    if (!currentUser?._id) return;
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
      const coursesWithEnrollment = (Array.isArray(allCourses) ? allCourses : [])
        .filter((course: any) => course && course._id)
        .map((course: any) => {
          if (Array.isArray(enrolledCourses) && enrolledCourses.find((c: any) => c && c._id === course._id)) {
            return { ...course, enrolled: true };
          } else {
            return course;
          }
        });
      setCourses(coursesWithEnrollment);
    } catch (error) {
      console.error(error);
      setCourses([]);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (!currentUser?._id) return;
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
      setCourses(
        courses.map((course) => {
          if (course._id === courseId) {
            return { ...course, enrolled: enrolled };
          } else {
            return course;
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    if (!course.name.trim() || !course.number.trim()) {
      return;
    }
    try {
      const newCourse = await courseClient.createCourse(course) as Course;
      setCourses([...courses, newCourse]);
      resetCourseForm();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const onDeleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="info"
          id="wd-enrollments-toggle"
          onClick={() => setEnrolling(!enrolling)}
        >
          {enrolling ? "Show Enrolled Only" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      {(currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY") && (
        <>
          <h5>
            New Course
            <Button
              className="float-end"
              variant="primary"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </Button>
            <Button
              className="float-end me-2"
              variant="warning"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
            >
              Update
            </Button>
          </h5>
          <br />

          <FormControl
            value={course.name}
            placeholder="Course Name"
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />

          <FormControl
            value={course.number}
            placeholder="Course Number"
            className="mb-2"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
          />

          <FormControl
            value={course.description}
            placeholder="Course Description"
            as="textarea"
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {enrolling ? "All Courses" : "Enrolled Courses"} ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.filter((course: Course) => course && course._id).map((course: Course) => (
            <Col
              key={course?._id || Math.random()}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course?._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={`/images/${course._id}.png`}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="primary">Go</Button>

                      <div>
                        {enrolling && (
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, !course.enrolled);
                            }}
                            className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} me-2`}
                          >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </Button>
                        )}
                        {!enrolling && (currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY") && (
                          <>
                            <Button
                              variant="warning"
                              className="me-2"
                              id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="danger"
                              id="wd-delete-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                onDeleteCourse(course._id);
                              }}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
