//  True/False Question Editor - Bhavya/Sandra

//we need handle addQuestions

//we need handle editquestion --> i think this already exists?

//handle delete question
import { Form } from "react-bootstrap";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  question: any;
  setQuestion: (q: any) => void;
}

export default function TFEditor({ question, setQuestion }: Props) {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion({
      ...question,
      [name]: name === "points" ? Number(value) || 0 : value,
    });
  };

  const handleCorrectChange = (value: string) => {
    setQuestion({ ...question, correctAnswer: value });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Question Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="questionText"
          value={question.questionText}
          onChange={handleFieldChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" style={{ maxWidth: "150px" }}>
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          name="points"
          value={question.points}
          onChange={handleFieldChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Correct Answer</Form.Label>

        <div className="d-flex flex-column gap-2">
          <Form.Check
            type="radio"
            label="True"
            checked={question.correctAnswer === "true"}
            onChange={() => handleCorrectChange("true")}
          />
          <Form.Check
            type="radio"
            label="False"
            checked={question.correctAnswer === "false"}
            onChange={() => handleCorrectChange("false")}
          />
        </div>
      </Form.Group>

      <div className="text-muted small">
        <strong>Correct Answer:</strong> {question.correctAnswer}
      </div>
    </>
  );
}
