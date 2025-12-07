// Quiz List Page - Aarushi
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ListGroup,
  ListGroupItem,
  Button,
  FormControl,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { BsPlus, BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaCheckCircle, FaCircle } from "react-icons/fa";
import { IoEllipsisVertical, IoRocketOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";
import "../../../styles.css";

/* eslint-disable */

// --- Green Checkmark icon (matching assignments) ---
function GreenCheckmark({ faded = false }: { faded?: boolean }) {
  return (
    <span
      className="position-relative d-inline-block me-2"
      style={{ width: "20px", height: "20px", opacity: faded ? 0.3 : 1 }}
    >
      <FaCircle className="text-white fs-6 position-absolute top-0 start-0" />
      <FaCheckCircle className="text-success fs-5 position-absolute top-0 start-0" />
    </span>
  );
}

// --- Quiz group header buttons (matching assignments) ---
function QuizControlButtons() {
  return (
    <div className="d-flex align-items-center">
      <div className="d-flex justify-content-center align-items-center me-3 px-3 py-2 rounded-pill border bg-light text-dark small">
        10% of Total
      </div>
      <BsPlus className="fs-4 me-3" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 === 0 ? 12 : hours % 12;
  return `${formattedDate} at ${hours}:${minutes}${ampm}`;
}

export default function Quizzes() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [studentScores, setStudentScores] = useState<{
    [quizId: string]: number;
  }>({});

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { role: string; _id: string } | null;

  const fetchQuizzes = async () => {
    if (!courseId) return;
    const data = await client.findQuizzesForCourse(courseId);
    setQuizzes(data);

    // Fetch student scores if student
    if (currentUser?.role === "STUDENT") {
      const scores: { [quizId: string]: number } = {};
      for (const quiz of data) {
        try {
          const latestAttempt = await client.findLatestAttempt(
            quiz._id,
            currentUser._id
          );
          if (latestAttempt && latestAttempt.isSubmitted) {
            scores[quiz._id] = latestAttempt.score;
          }
        } catch (error) {
          // No attempt yet
        }
      }
      setStudentScores(scores);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [courseId, currentUser]);

  const handleDelete = (quiz: any) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
    setDropdownOpen(null);
  };

  const confirmDelete = async () => {
    if (selectedQuiz) await client.deleteQuiz(selectedQuiz._id);
    setShowModal(false);
    fetchQuizzes();
  };

  const handleTogglePublish = async (quiz: any) => {
    if (currentUser?.role !== "FACULTY") return;
    await client.updateQuiz(quiz._id, { published: !quiz.published });
    fetchQuizzes();
    setDropdownOpen(null);
  };

  const handleAddQuiz = async () => {
    if (currentUser?.role !== "FACULTY") return;
    const newQuiz = await client.createQuiz(courseId, { title: "New Quiz" });
    fetchQuizzes();
    router.push(`/Courses/${courseId}/Quizzes/${newQuiz._id}`);
  };

  const handleEdit = (quizId: string) => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
    setDropdownOpen(null);
  };

  const handleQuizClick = (quizId: string) => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <FormControl
          type="search"
          placeholder="Search for Quiz"
          className="me-auto"
          style={{ maxWidth: "300px" }}
        />
        <div className="d-flex align-items-center gap-1">
          {currentUser?.role === "FACULTY" && (
            <>
              <Button
                variant="danger"
                className="d-flex align-items-center"
                onClick={handleAddQuiz}
              >
                <BsPlus className="fs-5 me-1" /> Quiz
              </Button>
              <Button variant="light" className="border">
                <IoEllipsisVertical className="fs-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <hr className="my-2" style={{ borderColor: "#dee2e6" }} />

      <ListGroup className="rounded-0" id="wd-quizzes-list">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title d-flex justify-content-between align-items-center px-3 py-3 rounded bg-light border-bottom border-dark">
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <span className="fw-bold fs-6">Assignment Quizzes</span>
            </span>
            <QuizControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0 mt-0">
            {quizzes.length === 0 && (
              <ListGroupItem className="text-center text-muted py-4">
                No quizzes yet. Click <b>+ Quiz</b> to add one.
              </ListGroupItem>
            )}

            {quizzes.map((quiz: any, idx: number) => {
              const now = new Date();
              const availableDate = new Date(quiz.availableDate || now);
              const availableUntil = new Date(quiz.availableUntil || now);

              let availabilityText = "";
              if (now < availableDate) {
                availabilityText = `Not available until ${formatDate(
                  quiz.availableDate
                )}`;
              } else if (now > availableUntil) {
                availabilityText = "Closed";
              } else {
                availabilityText = "Available";
              }

              const score =
                currentUser?.role === "STUDENT"
                  ? studentScores[quiz._id]
                  : null;

              return (
                <ListGroupItem
                  key={idx}
                  className="wd-lesson d-flex justify-content-between align-items-start px-3 py-3"
                  style={{ borderLeft: "3px solid green" }}
                >
                  <div className="d-flex align-items-start w-100">
                    <BsGripVertical className="me-3 fs-4 text-secondary mt-1" />
                    <IoRocketOutline
                      className="me-3 text-success fs-5 mt-1"
                      style={{ transform: "rotate(-45deg)" }}
                    />
                    <div className="flex-grow-1">
                      <div
                        className="fw-bold mb-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleQuizClick(quiz._id)}
                      >
                        {quiz.title}
                      </div>
                      <div className="small text-muted">
                        <span className="text-dark">
                          <b>{availabilityText}</b>
                        </span>
                        {" | "}
                        <span className="text-dark">
                          <b>Due</b>{" "}
                          {quiz.availableUntil ? (
                            formatDate(quiz.availableUntil)
                          ) : (
                            <span className="text-danger">Multiple Dates</span>
                          )}
                        </span>
                        {" | "}
                        {quiz.points} pts |{" "}
                        {quiz.numberOfQuestions ?? quiz.questions?.length ?? 0}{" "}
                        Questions
                        {score != null && (
                          <>
                            {" | "}
                            <b>Score:</b> {score}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    {currentUser?.role === "FACULTY" ? (
                      <>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleTogglePublish(quiz)}
                          title={quiz.published ? "Published" : "Unpublished"}
                        >
                          {quiz.published ? (
                            <GreenCheckmark />
                          ) : (
                            <span
                              style={{
                                fontSize: "1.25rem",
                                marginRight: "8px",
                              }}
                            >
                              🚫
                            </span>
                          )}
                        </span>

                        <Dropdown
                          show={dropdownOpen === quiz._id}
                          onToggle={(isOpen) =>
                            setDropdownOpen(isOpen ? quiz._id : null)
                          }
                        >
                          <Dropdown.Toggle
                            as="span"
                            id={`dropdown-${quiz._id}`}
                            style={{ cursor: "pointer" }}
                          >
                            <IoEllipsisVertical className="fs-4" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={() => handleEdit(quiz._id)}>
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(quiz)}>
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleTogglePublish(quiz)}
                            >
                              {quiz.published ? "Unpublish" : "Publish"}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    ) : (
                      <GreenCheckmark faded={!quiz.published} />
                    )}
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{selectedQuiz?.title}</strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
