// Quiz Questions Page - showing all Questions - Bhavya/Sandra
// app/Courses/[cid]/Quizzes/[qid]/questions/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, ListGroup, Nav } from "react-bootstrap";
import { BsPlus, BsTrash } from "react-icons/bs";
import * as client from "../../client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function QuizQuestionsList() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const quizId = params.qid as string;

  const [quiz, setQuiz] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loadQuiz = async () => {
    const data = await client.findQuizById(quizId);
    setQuiz({
      ...data,
      questions: data.questions || [],
    });
    setLoading(false);
  };

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  const handleAddQuestion = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/questions/new`);
  };

  const handleEditQuestion = (question: any) => {
    router.push(
      `/Courses/${courseId}/Quizzes/${quizId}/questions/${question._id}`
    );
  };

  const handleDeleteQuestion = async (index: number) => {
    if (!quiz) return;

    const updatedQuestions = quiz.questions.filter(
      (_: any, i: number) => i !== index
    );

    const totalPoints =
      updatedQuestions?.reduce(
        (sum: number, q: any) => sum + (q.points || 0),
        0
      ) ?? 0;

    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      points: totalPoints,
      numberOfQuestions: updatedQuestions.length,
    };

    const saved = await client.updateQuiz(quizId, updatedQuiz);
    // refresh local state from server response
    setQuiz({
      ...saved,
      questions: saved.questions || [],
    });
  };

  const handleCancel = () => {
    // GO BACK TO THE QUIZ DETAILS!
    router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handleSave = async () => {
    if (!quiz) return;

    // recompute points & numberOfQuestions from current quiz.questions
    const totalPoints =
      quiz.questions?.reduce(
        (sum: number, q: any) => sum + (q.points || 0),
        0
      ) ?? 0;

    const updatedQuiz = {
      ...quiz,
      points: totalPoints,
      numberOfQuestions: quiz.questions.length,
    };

    await client.updateQuiz(quizId, updatedQuiz);
    router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
  };

  if (loading || !quiz) {
    return <div className="p-3">Loading questions...</div>;
  }

  const totalPoints =
    quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) ??
    0;

  return (
    <div className="p-3">
      <Nav variant="tabs" defaultActiveKey="questions" className="mb-3">
        <Nav.Item>
          <Nav.Link
            eventKey="details"
            onClick={() =>
              router.push(`/Courses/${courseId}/Quizzes/${quizId}/Editor`)
            }
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="questions">Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Header: count + New Question + total points */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-0">Questions ({quiz.questions.length})</h5>
          <small className="text-muted">
            Points: <strong>{totalPoints}</strong>
          </small>
        </div>
        <Button variant="danger" onClick={handleAddQuestion}>
          <BsPlus className="fs-5" /> New Question
        </Button>
      </div>

      {quiz.questions.length === 0 && (
        <Card className="text-center p-4 mb-3">
          <Card.Body>
            <p className="text-muted">
              No questions yet. Click &quot;New Question&quot; to create one.
            </p>
          </Card.Body>
        </Card>
      )}

      <ListGroup>
        {quiz.questions.map((question: any, qIndex: number) => (
          <Card key={question._id ?? qIndex} className="mb-3">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>
                Question {qIndex + 1}
                {question.questionText ? `: ${question.questionText}` : ""}
              </strong>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleEditQuestion(question)}
                  disabled={!question._id}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteQuestion(qIndex)}
                >
                  <BsTrash />
                </Button>
              </div>
            </Card.Header>
          </Card>
        ))}
      </ListGroup>

      <hr className="mt-4" />

      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}