// Quiz Details - Emily
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function QuizDetails() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const quizId = params.qid as string;

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { role: string; _id: string } | null;

  const [quiz, setQuiz] = useState<any>(null);

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

  const handlePreview = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/Preview`);
  };

  const handleEdit = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/Editor`);
  };

  const handleStartQuiz = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/questions/page.tsx`);
  };

  if (!currentUser || !quiz) return <div className="p-3">Loading...</div>;

  // Format date helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Calculate total points
  const totalPoints =
    quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) ||
    0;

  // STUDENT VIEW
  if (currentUser.role === "STUDENT") {
    const now = new Date();
    const availableDate = quiz.availableDate
      ? new Date(quiz.availableDate)
      : null;
    const availableUntil = quiz.availableUntil
      ? new Date(quiz.availableUntil)
      : null;
    const isAvailable =
      quiz.published &&
      (!availableDate || now >= availableDate) &&
      (!availableUntil || now <= availableUntil);

    return (
      <div className="p-4">
        <h3 className="mb-4">{quiz.title}</h3>

        {/* Student Info Table */}
        <Table bordered className="mb-4">
          <tbody>
            <tr>
              <td className="text-end fw-bold" style={{ width: "200px" }}>
                Due
              </td>
              <td>{formatDate(quiz.dueDate)}</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Points</td>
              <td>{totalPoints}</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Questions</td>
              <td>{quiz.questions?.length || 0}</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Available from</td>
              <td>{formatDate(quiz.availableDate)}</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Until</td>
              <td>{formatDate(quiz.availableUntil)}</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Time Limit</td>
              <td>
                {typeof quiz.timeLimit === "number" ? quiz.timeLimit : 20}{" "}
                Minutes
              </td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Allowed Attempts</td>
              <td>{quiz.multipleAttempts ? quiz.howManyAttempts || 1 : 1}</td>
            </tr>
          </tbody>
        </Table>

        {/* Start Quiz Button */}
        <div className="text-center">
          <Button
            variant="danger"
            size="lg"
            onClick={handleStartQuiz}
            disabled={!isAvailable}
          >
            {isAvailable ? "Start Quiz" : "Quiz Not Available"}
          </Button>
        </div>
      </div>
    );
  }

  // FACULTY VIEW
  return (
    <div className="p-4">
      {/* Header with Preview and Edit buttons */}
      <div className="d-flex justify-content-end mb-3 gap-2">
        <Button variant="light" className="border" onClick={handlePreview}>
          Preview
        </Button>
        <Button variant="light" className="border" onClick={handleEdit}>
          ✏️ Edit
        </Button>
      </div>

      {/* Quiz Title */}
      <h3 className="mb-4">{quiz.title}</h3>

      {/* Quiz Details Table */}
      <Table bordered className="mb-4">
        <tbody>
          <tr>
            <td className="text-end fw-bold" style={{ width: "200px" }}>
              Quiz Type
            </td>
            <td>{quiz.type || "Graded Quiz"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Points</td>
            <td>{totalPoints}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Assignment Group</td>
            <td>{quiz.assignmentGroup || "QUIZZES"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Time Limit</td>
            <td>
              {typeof quiz.timeLimit === "number" ? quiz.timeLimit : 20} Minutes
            </td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">View Responses</td>
            <td>Always</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers ? "Immediately" : "Never"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">
              Require Respondus LockDown Browser
            </td>
            <td>No</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Required to View Quiz Results</td>
            <td>No</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </Table>

      {/* Date Table */}
      <Table bordered>
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>Everyone</td>
            <td>{formatDate(quiz.availableDate)}</td>
            <td>{formatDate(quiz.availableUntil)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
