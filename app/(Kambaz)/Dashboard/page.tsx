'use client';
import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button } from 'react-bootstrap';
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (6)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
            <Link href="/Courses/1234/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
              <Card.Body>
              <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
              <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Full Stack software developer</Card.Text>
              <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
            <Link href="/Courses/456/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/node.jpg" width="100%" height={160}/>
              <Card.Body>
              <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS456 Node JS</Card.Title>
              <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Backend software developer</Card.Text>
              <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
            <Card>
              <Link href="/Courses/678/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/mongo.webp" width="100%" height={160}/>
                <Card.Body>
                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS678 MongoDB</Card.Title>
                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  NoSQL Database</Card.Text>
                <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{width: "300px" }}>
            <Card>
            <Link href="/Courses/1234/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
              <Card.Body>
              <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
              <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Full Stack software developer</Card.Text>
              <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{width: "300px" }}>
            <Card>
            <Link href="/Courses/1234/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
              <Card.Body>
              <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
              <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Full Stack software developer</Card.Text>
              <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{width: "300px" }}>
            <Card>
            <Link href="/Courses/1234/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
              <Card.Body>
              <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
              <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Full Stack software developer</Card.Text>
              <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
);}

