// Quiz Preview - Emily, Dylan
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

export default function QuizPreview() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const quizId = params.qid as string;

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { role: string; _id: string } | null;

  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    points: 0,
    questions: [],
    timeLimit: 20,
  });

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lastSavedTime, setLastSavedTime] = useState<string>("");

  const fetchQuiz = async () => {
    if (!quizId) return;
    const data = await client.findQuizById(quizId);
    if (data) {
      setQuiz(data);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    if (isSubmitted) return; // Don't allow changes after submission
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
    updateSavedTime();
  };

  const updateSavedTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setLastSavedTime(timeString);
  };

  const calculateScore = () => {
    let totalScore = 0;
    quiz.questions.forEach((question: any, index: number) => {
      const userAnswer = selectedAnswers[index];

      if (!userAnswer) return; // Skip unanswered questions

      // Check if answer is correct (case-insensitive comparison)
      const correctAnswer = question.correctAnswer
        ?.toString()
        .trim()
        .toLowerCase();
      const providedAnswer = userAnswer.toString().trim().toLowerCase();

      if (correctAnswer === providedAnswer) {
        totalScore += question.points || 0;
      }
    });
    return totalScore;
  };

  const handleSubmit = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const handleEditQuiz = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/questions`);
  };

  const handleBack = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      updateSavedTime();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      updateSavedTime();
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    updateSavedTime();
  };

  const isAnswerCorrect = (questionIndex: number) => {
    const question = quiz.questions[questionIndex];
    const userAnswer = selectedAnswers[questionIndex];

    if (!userAnswer || !question.correctAnswer) return false;

    const correctAnswer = question.correctAnswer
      .toString()
      .trim()
      .toLowerCase();
    const providedAnswer = userAnswer.toString().trim().toLowerCase();

    return correctAnswer === providedAnswer;
  };

  if (!currentUser) return null;

  const totalPoints = quiz.questions.reduce(
    (sum: number, q: any) => sum + (q.points || 0),
    0
  );

  return (
    <div className="p-3">
      {/* Top Navigation */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>{quiz.title}</h3>
          {isSubmitted && (
            <div className="mt-2">
              <Alert
                variant={score === totalPoints ? "success" : "info"}
                className="mb-0 py-2"
              >
                <strong>
                  Quiz Score: {score} / {totalPoints} points
                </strong>
              </Alert>
            </div>
          )}
        </div>
        <div className="d-flex gap-2">
          {currentUser.role === "FACULTY" && !isSubmitted && (
            <Button variant="secondary" onClick={handleEditQuiz}>
              ✏️ Edit
            </Button>
          )}
          <Button variant="secondary" onClick={handleBack}>
            Back to Details
          </Button>
        </div>
      </div>

      {/* Header Alert */}
      <Alert variant="danger" className="mb-3">
        ⓘ This is a preview of the published version of the quiz
      </Alert>

      {/* Quiz Info */}
      {!isSubmitted && (
        <div className="mb-4">
          <p className="mb-2">
            Started:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          {quiz.description && <p className="mb-2">{quiz.description}</p>}
          <h4>Quiz Instructions</h4>
          <hr />
        </div>
      )}

      {/* No Questions Message */}
      {quiz.questions.length === 0 && (
        <Card className="text-center p-4">
          <Card.Body>
            <p className="text-muted">This quiz has no questions yet.</p>
          </Card.Body>
        </Card>
      )}

      {/* Single Question Display */}
      {quiz.questions.length > 0 &&
        (() => {
          const qIndex = currentQuestionIndex;
          const question = quiz.questions[qIndex];
          const correct = isSubmitted && isAnswerCorrect(qIndex);
          const incorrect = isSubmitted && selectedAnswers[qIndex] && !correct;

          return (
            <Card
              className={`mb-3 ${
                isSubmitted
                  ? correct
                    ? "border-success"
                    : incorrect
                    ? "border-danger"
                    : ""
                  : ""
              }`}
              style={isSubmitted ? { borderWidth: "2px" } : {}}
            >
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  {isSubmitted && (
                    <span className="me-2">
                      {correct ? (
                        <span className="text-success"></span>
                      ) : incorrect ? (
                        <span className="text-danger"></span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </span>
                  )}
                  <strong>Question {qIndex + 1}</strong>
                </div>
                <span className="text-muted">{question.points} pts</span>
              </Card.Header>
              <Card.Body>
                <p className="mb-3">{question.questionText}</p>

                <Form>
                  {/* Multiple Choice or True/False */}
                  {question.choices && question.choices.length > 0 ? (
                    question.choices.map((choice: string, cIndex: number) => {
                      const isSelected = selectedAnswers[qIndex] === choice;
                      const isCorrectChoice =
                        isSubmitted &&
                        choice.toLowerCase().trim() ===
                          question.correctAnswer?.toLowerCase().trim();

                      return (
                        <Form.Check
                          key={cIndex}
                          type="radio"
                          name={`question-${qIndex}`}
                          id={`q${qIndex}-choice${cIndex}`}
                          label={
                            <span>
                              {choice}
                              {isSubmitted && isCorrectChoice && (
                                <span className="ms-2 text-success fw-bold">
                                  Correct
                                </span>
                              )}
                              {isSubmitted &&
                                isSelected &&
                                !isCorrectChoice && (
                                  <span className="ms-2 text-danger fw-bold">
                                    Your answer
                                  </span>
                                )}
                            </span>
                          }
                          value={choice}
                          checked={isSelected}
                          onChange={(e) =>
                            handleAnswerChange(qIndex, e.target.value)
                          }
                          className={`mb-2 ${
                            isSubmitted && isCorrectChoice
                              ? "text-success fw-bold"
                              : ""
                          }`}
                          disabled={isSubmitted}
                        />
                      );
                    })
                  ) : (
                    /* Fill in the Blank */
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Enter your answer"
                        value={selectedAnswers[qIndex] || ""}
                        onChange={(e) =>
                          handleAnswerChange(qIndex, e.target.value)
                        }
                        disabled={isSubmitted}
                        className={
                          isSubmitted
                            ? correct
                              ? "border-success"
                              : "border-danger"
                            : ""
                        }
                      />
                      {isSubmitted && (
                        <Form.Text
                          className={correct ? "text-success" : "text-danger"}
                        >
                          {correct ? (
                            <span>Correct!</span>
                          ) : (
                            <span>
                              Correct answer: {question.correctAnswer}
                            </span>
                          )}
                        </Form.Text>
                      )}
                    </Form.Group>
                  )}
                </Form>
              </Card.Body>
            </Card>
          );
        })()}

      {/* Navigation Buttons */}
      {quiz.questions.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          {currentQuestionIndex > 0 ? (
            <Button variant="secondary" onClick={handlePreviousQuestion}>
              ‹ Previous
            </Button>
          ) : (
            <div></div>
          )}
          {currentQuestionIndex < quiz.questions.length - 1 && (
            <Button variant="secondary" onClick={handleNextQuestion}>
              Next ›
            </Button>
          )}
        </div>
      )}

      {/* Submit Button */}
      {!isSubmitted && quiz.questions.length > 0 && (
        <Card className="mt-4 mb-4">
          <Card.Body className="d-flex justify-content-end align-items-center gap-3">
            <span className="text-muted">
              {lastSavedTime && `Quiz saved at ${lastSavedTime}`}
            </span>
            <Button variant="secondary" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Question Navigation */}
      {quiz.questions.length > 0 && (
        <div className="mt-4 mb-4">
          <h5 className="mb-3">Questions</h5>
          <div className="d-flex flex-column gap-2 ms-3">
            {quiz.questions.map((_: any, idx: number) => {
              const isCurrent = idx === currentQuestionIndex;

              return (
                <a
                  key={idx}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleJumpToQuestion(idx);
                  }}
                  style={{
                    color: "red",
                    fontWeight: isCurrent ? "bold" : "normal",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Question {idx + 1}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* After Submission */}
      {isSubmitted && (
        <Card className="mt-4 mb-4">
          <Card.Body className="text-center">
            <h5>
              Quiz submitted at{" "}
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </h5>
            <div className="mt-3">
              <Button
                variant="secondary"
                onClick={handleEditQuiz}
                className="me-2"
              >
                ✏️ Edit
              </Button>
              <Button variant="primary" onClick={handleBack}>
                Back to Quiz Details
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}