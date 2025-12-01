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
import * as client from "../Courses/client";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollments, enrollCourse, unenrollCourse, type Enrollment } from "./reducer";
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
};

type EnrollmentsState = {
  enrollments: Enrollment[];
};

export default function Enrollments() {
  const [courses, setCourses] = useState<Course[]>([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: User | null } }) => state.accountReducer);
  const { enrollments } = useSelector((state: { enrollmentsReducer: EnrollmentsState }) => state.enrollmentsReducer);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch ALL courses for enrollments screen
        const allCourses = await client.fetchAllCourses() as [];
        setCourses(allCourses);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEnrollments = async () => {
      if (!currentUser) return;
      try {
        const fetchedEnrollments = await client.findEnrollmentsForUser() as [];
        dispatch(setEnrollments(fetchedEnrollments));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
    fetchEnrollments();
  }, [currentUser, dispatch]);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: Enrollment) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser?._id) return;
    try {
      const enrollment = await client.enrollUserInCourse(courseId);
      dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
      // Refresh enrollments to reflect enrollment
      const fetchedEnrollments = await client.findEnrollmentsForUser() as [];
      dispatch(setEnrollments(fetchedEnrollments));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser?._id) return;
    try {
      await client.unenrollUserFromCourse(courseId);
      dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
      // Refresh enrollments to reflect unenrollment
      const fetchedEnrollments = await client.findEnrollmentsForUser() as [];
      dispatch(setEnrollments(fetchedEnrollments));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="wd-enrollments" className="p-4">
      <h1 id="wd-enrollments-title">Enrollments</h1>
      <hr />

      <h2 id="wd-enrollments-published">
        All Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-enrollments-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: Course) => (
            <Col
              key={course._id}
              className="wd-enrollments-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-enrollments-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-enrollments-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-enrollments-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="primary">Go</Button>

                      <div>
                        {isEnrolled(course._id) ? (
                          <Button
                            variant="danger"
                            className="me-2"
                            id={`wd-unenroll-course-${course._id}`}
                            onClick={(event) => {
                              event.preventDefault();
                              handleUnenroll(course._id);
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            className="me-2"
                            id={`wd-enroll-course-${course._id}`}
                            onClick={(event) => {
                              event.preventDefault();
                              handleEnroll(course._id);
                            }}
                          >
                            Enroll
                          </Button>
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

