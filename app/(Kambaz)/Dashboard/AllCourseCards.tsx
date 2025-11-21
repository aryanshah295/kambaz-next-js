import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setEnrollments, addEnrollment, deleteEnrollment } from '../Enrollment/reducer';
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer"; 

import { RootState } from "../store";
import * as client from "../Courses/client";



export default function AllCourseCards({userId} : {
    
    userId: string
}) {
        const { courses } = useSelector((state: RootState) => state.coursesReducer);
        const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
        const { currentUser } = useSelector((state: RootState) => state.accountReducer);

        const dispatch = useDispatch();

        const fetchCourses = async () => {
                try {
                    const courses = await client.findMyCourses();
                    dispatch(setCourses(courses))
                } catch (error) {
                    console.error(error);
                }
            };

        const [nmcourses, setnotmycourse] = useState<any>([]);
        
        const fetchNotCourses = async () => {
                try {
                    const notcourses = await client.findNotMyCourses();
                    setnotmycourse(notcourses);
                } catch (error) {
                    console.error(error);
                }
        }

        const fetchEnrollments = async () => {
            try {
                const enrollments = await client.getAllEnrollments();
                dispatch(setEnrollments(enrollments));
            } catch (error) {
                console.error(error);
            }
        }

        let enrollment = {_id: 0, user: "", course: ""}

        const onAddNewEnrollment = async (courseId: string) => {
            const newEnrollment = await client.createEnrollment(enrollment, courseId);
            fetchCourses();
            fetchNotCourses();
            dispatch(setEnrollments([...enrollments, newEnrollment]))
        }

        const onDeleteEnrollment = async (currentUserId: string, courseId: string) => {
            const courseEnrolled = enrollments.find((e) => e.course === courseId && e.user === currentUserId);
            if (courseEnrolled) {
                const status = await client.deleteEnrollment(courseEnrolled._id);
                dispatch(setEnrollments(enrollments.filter((enrollment) => enrollment._id !== courseEnrolled._id)));
            }
            fetchCourses();
            fetchNotCourses();
        }

        useEffect(() => {
            fetchEnrollments();
            fetchCourses();
            fetchNotCourses();
        }, [currentUser])

        
        

  return (
    <div>
        
        <Row xs={1} md={5} className="g-4">
        {
            courses
                .map((course: any) => (
                    <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px "}}>
                        <Card>
                            <Link href={`/Courses/${course._id}/Home`} 
                                className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <CardImg src={course.image} variant="top" width="100%" height={160} />
                                    <CardBody className="card-body">
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {course.name} </CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            {course.description} </CardText>

                                        <div className="d-flex justify-content-end">
                                        <Button onClick={(event) => {
                                            event.preventDefault();
                                            onDeleteEnrollment(currentUser._id, course._id);
                                            }}
                                            className="btn btn-danger " >Unenroll</Button>

                                        </div>
                                    </CardBody>
                            </Link>
                        </Card>
                    </Col> ))           
        }

        {   
            nmcourses
                ?.map((course: any) => (
                    <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px "}}>
                        <Card>
                            <Link href={`/Dashboard`} 
                                className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <CardImg src={course.image} variant="top" width="100%" height={160} />
                                    <CardBody className="card-body">
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {course.name} </CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            {course.description} </CardText>

                                        <div className="d-flex justify-content-end">
                                        <Button onClick={(event) => {
                                            event.preventDefault();
                                            enrollment = {...enrollment, user: currentUser._id, course: course._id }
                                            onAddNewEnrollment(course._id);

                                        }} className="btn-success float-end">Enroll</Button>

                                        </div>

                                    </CardBody>
                            </Link>
                        </Card>
                    </Col> )) 
        }
    
        </Row>
    </div>
  )
}
