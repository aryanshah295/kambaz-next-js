"use client";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  FormControl,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { addEnrollment, removeEnrollment } from "./Enrollments/reducer";
import { redirect } from "next/navigation";
export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.png",
    description: "New Description",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (!currentUser) {
    redirect("/Account/Signin");
  }
  const studentView = currentUser.role === "STUDENT";
  const facultyView = currentUser.role === "FACULTY";

  const [showEnrollments, setShowEnrollments] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  return (
    <Container id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {!studentView && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={(e) => {
                e.preventDefault();
                const newCourse = { ...course, _id: uuidv4() };
                dispatch(addNewCourse(newCourse));
                dispatch(
                  addEnrollment({
                    _id: uuidv4(),
                    user: currentUser._id,
                    course: newCourse._id,
                  })
                );
                setCourse({
                  _id: "0",
                  name: "New Course",
                  number: "New Number",
                  startDate: "2023-09-10",
                  endDate: "2023-12-15",
                  image: "/images/reactjs.png",
                  description: "New Description",
                });
              }}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses (
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          courses.filter((course: any) =>
            enrollments.some(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (enrollment: any) =>
                enrollment.course === course._id &&
                enrollment.user === currentUser._id
            )
          ).length
        }
        )
        {studentView && (
          <Button
            variant="primary"
            className="float-end"
            style={{ marginTop: "-4px" }}
            onClick={() => setShowEnrollments(!showEnrollments)}
          >
            Enrollments
          </Button>
        )}
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((course: any) =>
              showEnrollments
                ? true
                : enrollments.some(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (enrollment: any) =>
                      enrollment.user === currentUser._id &&
                      enrollment.course === course._id
                  )
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((course: any) => (
              <Col
                className="wd-dashboard-course"
                key={course._id}
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (
                        !enrollments.some(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (enrollment: any) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
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
                      {!showEnrollments && (
                        <Button variant="primary"> Go </Button>
                      )}
                      {showEnrollments &&
                        !enrollments.some(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (enrollment: any) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                        ) && (
                          <Button
                            variant="success"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(
                                addEnrollment({
                                  _id: uuidv4(),
                                  user: currentUser._id,
                                  course: course._id,
                                })
                              );
                            }}
                          >
                            Enroll
                          </Button>
                        )}
                      {showEnrollments &&
                        enrollments.some(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (enrollment: any) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                        ) && (
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(
                                removeEnrollment(
                                  enrollments.find(
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (enrollment: any) =>
                                      enrollment.user === currentUser._id &&
                                      enrollment.course === course._id
                                  )
                                )
                              );
                            }}
                          >
                            Unenroll
                          </Button>
                        )}
                      {facultyView && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </Container>
  );
}