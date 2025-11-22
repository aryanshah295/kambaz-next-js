"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer"; 
import Link from "next/link";
import * as client from "../Courses/client";

import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import AllCourseCards from "./AllCourseCards";
import { RootState } from "../store";
import { redirect } from "next/navigation";
import { setEnrollments, addEnrollment, deleteEnrollment } from '../Enrollment/reducer';



export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const [filterEnrollment, setFilterEnrollment ] = useState(true);
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    })

    const fetchCourses = async () => {
        try {
            const courses = await client.findMyCourses();
            dispatch(setCourses(courses))
        } catch (error) {
            console.error(error);
        }
    };

    const [nmcourse, setnotmycourse] = useState([]);

    const fetchNotCourses = async () => {
        try {
            const notcourses = await client.findNotMyCourses() as [];
            setnotmycourse(notcourses)
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

    const onAddNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        fetchCourses();
        fetchNotCourses();
        fetchEnrollments();
        dispatch(setCourses([ ...courses, newCourse ]));
    };

    const onDeleteCourse = async (courseId: string) => {
        const status = await client.deleteCourse(courseId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
    };

    const onUpdateCourse = async () => {
        await client.updateCourse(course);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatch(setCourses(courses.map((c: any) => {
            if (c._id === course._id) {return course;}
            else { return c;}
        })));};


    if (currentUser === null) {
        redirect("/Account/Signin");
    }

    useEffect(() => {
        fetchCourses();
        fetchNotCourses();
    }, [currentUser]);


    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
    
            <Button onClick={() => setFilterEnrollment(!filterEnrollment)} className="float-end ms-2">Enrollment</Button>
            
            <div id="wd-dashboard-courses">        
                    {
                    currentUser?.role === "FACULTY" ? 
                        <div>
                            <h5>New Course
                                <button className="btn btn-primary float-end"
                                    id="wd-add-new-course-click"
                                    onClick={onAddNewCourse} > Add </button>

                                <button className="btn btn-warning float-end me-2"
                                    id="wd-upate-new-course-click"
                                    onClick={onUpdateCourse} > Update </button>
                            </h5><br />
                            <FormControl value={course.name} className="mb-2" 
                                onChange={(e) => setCourse({ ...course, name: e.target.value})}/>
                            <FormControl as="textarea" value={course.description} rows={3} 
                                onChange={(e) => setCourse({...course, description: e.target.value})}/>

                            <hr />
                            
                            {filterEnrollment ? 
                            <div>
                            <h2 id="wd-dashboard-published">Published Courses ({(enrollments.filter((e) => e.user === currentUser?._id)).length})</h2>
                            <Row xs={1} md={5} className="g-4">
                                {/* // eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {courses.map((course: any) => (
                                    <Col key={course?._id} className="wd-dashboard-course" style={{ width: "300px "}}>
                                            <Card>
                                                <Link href={`/Courses/${course._id}/Home`} 
                                                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                                                    <CardImg src={`/images/${course._id}.png`} variant="top" width="100%" height={160} />
                                                    <CardBody className="card-body">
                                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                                            {course.name} </CardTitle>
                                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                                            {course.description} </CardText>

                                                        <Button variant="primary"> Go </Button>
                                            
                                                        <Button onClick={(event) => {
                                                            event.preventDefault();
                                                            onDeleteCourse(course._id);
                                                            }} className="btn btn-danger float-end"
                                                            id="wd-delete-course-click">
                                                            Delete </Button>
                                                        <Button id="wd-edit-course-click"
                                                            onClick={(e) => {
                                                            e.preventDefault();
                                                            setCourse(course) }}
                                                            className="btn btn-warning me-2 float-end">
                                                            Edit </Button>
                                                    </CardBody>
                                                </Link>
                                            </Card>

                                        </Col>
                                    )
                                )}
                                </Row>
                                </div>

                            :
                                <div>
                                <h2 id="wd-dashboard-published">Published Courses ({courses.length + nmcourse.length})</h2>
                                <AllCourseCards userId={currentUser ? currentUser._id : ""}/> 
                                </div>
                            }
                        </div>

                    :
                            
                            filterEnrollment ? 
                                <div>
                                <h2 id="wd-dashboard-published">Published Courses ({(enrollments.filter((e) => e.user === currentUser?._id)).length})</h2><hr />
                                <Row xs={1} md={5} className="g-4">
                                    {courses
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        .map((course: any) => (
                                            course !== undefined ? 
                                            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px "}}>
                                                <Card>
                                                    <Link href={`/Courses/${course._id}/Home`} 
                                                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                                                        <CardImg src={`/images/${course._id}.png`} variant="top" width="100%" height={160} />
                                                        <CardBody className="card-body">
                                                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                                                {course.name} </CardTitle>
                                                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                                                {course.description} </CardText>

                                                            <Button variant="primary"> Go </Button>
                                                
                                                        </CardBody>
                                                    </Link>
                                                </Card>

                                            </Col> : "null"
                                        )
                                    )}
                                    </Row>
                                    </div>

                                :
                                    <div>
                                    <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
                                    <hr />
                                    <AllCourseCards userId={currentUser ? currentUser._id : ""} /> 

                                    </div>
                            
                    }
                        
            </div>
        </div>
    )
}