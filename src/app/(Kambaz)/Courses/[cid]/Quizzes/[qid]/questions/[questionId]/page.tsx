"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form } from "react-bootstrap";
import * as client from "../../../client";
import MCQEditor from "./mcq";
import TFEditor from "./tf";
import FIBEditor from "./fib";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function QuestionEditorPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = params.cid as string;
  const quizId = params.qid as string;
  const questionId = params.questionId as string;

  const [quiz, setQuiz] = useState<any | null>(null);
  const [question, setQuestion] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load quiz AND current question (or default new which is the multiple choice!)
  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizById(quizId);
      const questions = data.questions || [];

      let current: any | undefined;

      if (questionId === "new") {
        current = {
          type: "MCQ",
          questionText: "New Question",
          points: 1,
          choices: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: "Option 1",
        };
      } else {
        current = questions.find(
          (q: any) =>
            q._id === questionId ||
            q._id?.toString?.() === questionId ||
            q._id?.$oid === questionId
        );
      }

      setQuiz(data);
      setQuestion(
        current || {
          type: "MCQ",
          questionText: "",
          points: 1,
          choices: ["Option 1", "Option 2"],
          correctAnswer: "Option 1",
        }
      );
      setLoading(false);
    };

    load();
  }, [quizId, questionId]);

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/questions`);
  };

  const handleSave = async () => {
    if (!quiz || !question) return;

    const existing = quiz.questions || [];
    let updatedQuestions: any[];

    if (questionId === "new") {
      updatedQuestions = [...existing, question];
    } else {
      updatedQuestions = existing.map((q: any) => {
        if (
          q._id === questionId ||
          q._id?.toString?.() === questionId ||
          q._id?.$oid === questionId
        ) {
          return { ...q, ...question };
        }
        return q;
      });
    }

    const totalPoints = updatedQuestions.reduce(
      (sum: number, q: any) => sum + (q.points || 0),
      0
    );

    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      points: totalPoints,
      numberOfQuestions: updatedQuestions.length,
    };

    await client.updateQuiz(quizId, updatedQuiz);
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/questions`);
  };

  const handleTypeChange = (newType: string) => {
    if (!question) return;

    setQuestion((prev: any) => {
      const base = {
        ...prev,
        type: newType,
        questionText: prev.questionText || "",
        points: prev.points ?? 1,
      };

      if (newType === "TF") {
        return {
          ...base,
          correctAnswer:
            prev.correctAnswer === "false" || prev.correctAnswer === false
              ? "false"
              : "true",
        };
      }

      if (newType === "FIB") {
        return {
          ...base,
          answers: prev.answers || [""],
        };
      }

      // Multiple Choice default answer
      return {
        ...base,
        choices:
          prev.choices && prev.choices.length
            ? prev.choices
            : ["Option 1", "Option 2"],
        correctAnswer: prev.correctAnswer || "Option 1",
      };
    });
  };

  if (loading || !quiz || !question) {
    return <div className="p-3">Loading question...</div>;
  }

  const type = (question.type || "MCQ").toUpperCase();

  let editorBody;
  if (type === "TF") {
    editorBody = <TFEditor question={question} setQuestion={setQuestion} />;
  } else if (type === "FIB") {
    editorBody = <FIBEditor question={question} setQuestion={setQuestion} />;
  } else {
    editorBody = <MCQEditor question={question} setQuestion={setQuestion} />;
  }

  return (
    <div className="p-3">
      <Card className="mb-3">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <strong>Question Editor</strong>
          <Form.Select
            style={{ maxWidth: "220px" }}
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="MCQ">Multiple Choice</option>
            <option value="TF">True / False</option>
            <option value="FIB">Fill in the Blank</option>
          </Form.Select>
        </Card.Header>
        <Card.Body>{editorBody}</Card.Body>
      </Card>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save Question
        </Button>
      </div>
    </div>
  );
}
