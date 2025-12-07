// Quiz Editor - Emily
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function QuizEditor() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const quizId = params.qid as string;

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { role: string; _id: string } | null;

  const [quiz, setQuiz] = useState<any>({
    title: "Unnamed Quiz",
    description: "",
    type: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    hasTimeLimit: true,
    multipleAttempts: false,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    availableDate: "",
    dueDate: "",
    availableUntil: "",
    published: false,
    questions: [],
  });

  const [showUnpublishMenu, setShowUnpublishMenu] = useState(false);

  const fetchQuiz = async () => {
    if (!quizId) return;
    const data = await client.findQuizById(quizId);
    if (data) {
      setQuiz({
        ...quiz,
        ...data,
        points:
          data.questions?.reduce(
            (sum: number, q: any) => sum + (q.points || 0),
            0
          ) || 0,
        hasTimeLimit: data.timeLimit > 0,
      });
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setQuiz((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSave = async () => {
    const totalPoints = quiz.questions.reduce(
      (sum: number, q: any) => sum + (q.points || 0),
      0
    );
    const updatedQuiz = {
      ...quiz,
      points: totalPoints,
      numberOfQuestions: quiz.questions.length,
      timeLimit: quiz.hasTimeLimit ? quiz.timeLimit : 0,
    };
    await client.updateQuiz(quizId, updatedQuiz);
    router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handleSaveAndPublish = async () => {
    const totalPoints = quiz.questions.reduce(
      (sum: number, q: any) => sum + (q.points || 0),
      0
    );
    const updatedQuiz = {
      ...quiz,
      points: totalPoints,
      numberOfQuestions: quiz.questions.length,
      timeLimit: quiz.hasTimeLimit ? quiz.timeLimit : 0,
      published: true,
    };
    await client.updateQuiz(quizId, updatedQuiz);
    router.push(`/Courses/${courseId}/Quizzes`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Quizzes`);
  };

  const handleUnpublish = async () => {
    const updatedQuiz = {
      ...quiz,
      published: false,
    };
    await client.updateQuiz(quizId, updatedQuiz);
    setQuiz(updatedQuiz);
    setShowUnpublishMenu(false);
  };

  if (!currentUser || currentUser.role !== "FACULTY") {
    return <div className="p-3">Access Denied</div>;
  }

  const calculatePoints = () => {
    return quiz.questions.reduce(
      (sum: number, q: any) => sum + (q.points || 0),
      0
    );
  };

  const getWordCount = (text: string) => {
    if (!text || text.trim() === "") return 0;
    return text.trim().split(/\s+/).length;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* Header with Points and Status */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <div className="d-flex align-items-center gap-3 text-muted">
          <span>Points {calculatePoints()}</span>
          <span className="d-flex align-items-center gap-2">
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: quiz.published ? "#28a745" : "#6c757d",
                display: "inline-block",
              }}
            ></span>
            {quiz.published ? "Published" : "Not Published"}
          </span>
          <div style={{ position: "relative" }}>
            <Button
              variant="link"
              className="text-muted p-0"
              onClick={() => setShowUnpublishMenu(!showUnpublishMenu)}
            >
              ⋮
            </Button>
            {showUnpublishMenu && quiz.published && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  minWidth: "150px",
                  zIndex: 1000,
                }}
              >
                <Button
                  variant="link"
                  className="text-dark text-decoration-none d-block w-100 text-start px-3 py-2"
                  onClick={handleUnpublish}
                  style={{ fontSize: "14px" }}
                >
                  Unpublish Quiz
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/Courses/${courseId}/Quizzes/${quizId}/questions`);
            }}
          >
            Questions
          </a>
        </li>
      </ul>

      {/* Quiz Title */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          className="border-0 border-bottom rounded-0 px-0"
          style={{ fontSize: "1rem" }}
        />
      </Form.Group>

      {/* Quiz Instructions */}
      <Form.Group className="mb-4">
        <Form.Label>Quiz Instructions:</Form.Label>
        <div className="border rounded">
          {/* WYSIWYG Toolbar
          <div className="bg-light border-bottom p-2 d-flex gap-2 align-items-center flex-wrap">
            <Form.Select size="sm" style={{ width: "auto" }}>
              <option>Edit</option>
            </Form.Select>
            <Form.Select size="sm" style={{ width: "auto" }}>
              <option>View</option>
            </Form.Select>
            <Form.Select size="sm" style={{ width: "auto" }}>
              <option>Insert</option>
            </Form.Select>
            <Form.Select size="sm" style={{ width: "auto" }}>
              <option>Format</option>
            </Form.Select>
            <Form.Select size="sm" style={{ width: "auto" }}>
              <option>Tools</option>
            </Form.Select>
            <Form.Select size="sm" style={{ width: "auto" }}>
              <option>Table</option>
            </Form.Select>
            <div className="ms-auto">
              <span className="text-success">● 100%</span>
            </div> */}
          {/* </div> */}

          {/* Format Toolbar */}
          <div className="bg-light border-bottom p-2 d-flex gap-2 align-items-center flex-wrap">
            <Form.Select size="sm" style={{ width: "70px" }}>
              <option>12pt</option>
            </Form.Select>
            <Form.Select size="sm" style={{ width: "120px" }}>
              <option>Paragraph</option>
            </Form.Select>
            <div className="btn-group btn-group-sm">
              <Button variant="light" className="border">
                <strong>B</strong>
              </Button>
              <Button variant="light" className="border">
                <em>I</em>
              </Button>
              <Button variant="light" className="border">
                <u>U</u>
              </Button>
              <Button variant="light" className="border">
                A
              </Button>
            </div>
          </div>

          {/* Text Area */}
          <Form.Control
            as="textarea"
            rows={5}
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            className="border-0 rounded-0"
          />

          {/* Footer */}
          <div className="border-top p-2 d-flex justify-content-between align-items-center">
            <small className="text-muted">p</small>
            <div className="d-flex gap-2 align-items-center">
              <small className="text-danger">{getWordCount(quiz.description)} words</small>
              <Button variant="link" size="sm" className="p-0 text-muted">
                &lt;/&gt;
              </Button>
            </div>
          </div>
        </div>
      </Form.Group>

      {/* Quiz Type */}
      <Row className="mb-3">
        <Col xs={4} className="text-end">
          <Form.Label className="mt-2">Quiz Type</Form.Label>
        </Col>
        <Col xs={8}>
          <Form.Select name="type" value={quiz.type} onChange={handleChange}>
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Assignment Group */}
      <Row className="mb-4">
        <Col xs={4} className="text-end">
          <Form.Label className="mt-2">Assignment Group</Form.Label>
        </Col>
        <Col xs={8}>
          <Form.Select
            name="assignmentGroup"
            value={quiz.assignmentGroup}
            onChange={handleChange}
          >
            <option>ASSIGNMENTS</option>
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Project</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Options Section */}
      <div className="text-center mb-4">
        <h6>Options</h6>
      </div>

      <Row className="mb-2">
        <Col xs={4}></Col>
        <Col xs={8}>
          <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            name="shuffleAnswers"
            checked={quiz.shuffleAnswers}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-2 align-items-center">
        <Col xs={4}></Col>
        <Col xs={8}>
          <div className="d-flex align-items-center gap-2">
            <Form.Check
              type="checkbox"
              label="Time Limit"
              checked={quiz.hasTimeLimit}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  hasTimeLimit: e.target.checked,
                  timeLimit: e.target.checked ? 20 : 0,
                })
              }
            />
            <Form.Control
              type="number"
              name="timeLimit"
              value={quiz.timeLimit}
              onChange={handleChange}
              disabled={!quiz.hasTimeLimit}
              style={{ width: "80px" }}
              size="sm"
            />
            <span className="text-muted">Minutes</span>
          </div>
        </Col>
      </Row>

       <Row className="mb-2 align-items-center">
        <Col xs={4}></Col>
        <Col xs={8}>
          <div className="d-flex align-items-center gap-2">
            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  multipleAttempts: e.target.checked,
                  howManyAttempts: e.target.checked ? 2 : 1,
                })
              }
            />
            <Form.Control
              type="number"
              name="howManyAttempts"
              value={quiz.howManyAttempts}
              onChange={handleChange}
              disabled={!quiz.multipleAttempts}
              style={{ width: "80px" }}
              size="sm"
              min="1"
            />
            <span className="text-muted">Attempts</span>
          </div>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col xs={4}></Col>
        <Col xs={8}>
          <Form.Check
            type="checkbox"
            label="Show Correct Answers"
            name="showCorrectAnswers"
            checked={quiz.showCorrectAnswers}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-2 align-items-center">
        <Col xs={4}></Col>
        <Col xs={8}>
          <div className="d-flex align-items-center gap-2">
            <Form.Label className="mb-0" style={{ minWidth: "100px" }}>
              Access Code
            </Form.Label>
            <Form.Control
              type="text"
              name="accessCode"
              value={quiz.accessCode}
              onChange={handleChange}
              placeholder=""
              size="sm"
              style={{ maxWidth: "200px" }}
            />
          </div>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col xs={4}></Col>
        <Col xs={8}>
          <Form.Check
            type="checkbox"
            label="One Question at a Time"
            name="oneQuestionAtATime"
            checked={quiz.oneQuestionAtATime}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col xs={4}></Col>
        <Col xs={8}>
          <Form.Check
            type="checkbox"
            label="Webcam Required"
            name="webcamRequired"
            checked={quiz.webcamRequired}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={4}></Col>
        <Col xs={8}>
          <Form.Check
            type="checkbox"
            label="Lock Questions After Answering"
            name="lockQuestionsAfterAnswering"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={handleChange}
          />
        </Col>
      </Row>

      {/* Assign Section */}
      <div className="text-start mb-3">
        <h6>Assign</h6>
      </div>

      <div className="border rounded p-3 mb-4" style={{ backgroundColor: "#f8f9fa" }}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Assign to</Form.Label>
          <div className="border rounded p-2 bg-white d-flex align-items-center">
            <span className="badge bg-secondary me-2">Everyone</span>
            <Button variant="link" size="sm" className="ms-auto p-0 text-dark">
              ×
            </Button>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Due</Form.Label>
          <div className="position-relative">
            <Form.Control
              type="datetime-local"
              name="dueDate"
              value={
                quiz.dueDate
                  ? new Date(quiz.dueDate).toISOString().slice(0, 16)
                  : ""
              }
              onChange={handleChange}
            />
            <span
              className="position-absolute"
              style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
            >
              📅
            </span>
          </div>
        </Form.Group>

        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Available from</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="datetime-local"
                  name="availableDate"
                  value={
                    quiz.availableDate
                      ? new Date(quiz.availableDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
                >
                  📅
                </span>
              </div>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Until</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="datetime-local"
                  name="availableUntil"
                  value={
                    quiz.availableUntil
                      ? new Date(quiz.availableUntil).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
                >
                  📅
                </span>
              </div>
            </Form.Group>
          </Col>
        </Row>

      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-3 pt-4">
        <Button
          variant="outline-secondary"
          onClick={handleCancel}
          style={{ minWidth: "120px" }}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleSave}
          style={{ minWidth: "120px" }}
        >
          Save
        </Button>
        {!quiz.published && (
          <Button
            variant="danger"
            onClick={handleSaveAndPublish}
            style={{ minWidth: "150px" }}
          >
            Save & Publish
          </Button>
        )}
      </div>
    </div>
  );
}