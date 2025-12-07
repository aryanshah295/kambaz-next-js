// Fill-in-the-Blank Question Editor - Bhavya/Sandra
import { Form, Button } from "react-bootstrap";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  question: any;
  setQuestion: (q: any) => void;
}

export default function FIBEditor({ question, setQuestion }: Props) {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion({
      ...question,
      [name]: name === "points" ? Number(value) || 0 : value,
    });
  };

  const answers: string[] = (
    question.answers && question.answers.length ? question.answers : [""]
  ) as string[];

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;

    setQuestion({
      ...question,
      answers: newAnswers,
      // keep a primary correct answer for grading
      correctAnswer: newAnswers[0] || "",
    });
  };

  const addAnswer = () => {
    const newAnswers = [...answers, ""];
    setQuestion({
      ...question,
      answers: newAnswers,
    });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);

    if (newAnswers.length === 0) {
      newAnswers.push("");
    }

    setQuestion({
      ...question,
      answers: newAnswers,
      correctAnswer: newAnswers[0] || "",
    });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Question Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="questionText"
          value={question.questionText || ""}
          onChange={handleFieldChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" style={{ maxWidth: "150px" }}>
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          name="points"
          value={question.points ?? 1}
          onChange={handleFieldChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label> Fill in the answer (one per blank)</Form.Label>

        {answers.map((ans, index) => (
          <div className="d-flex gap-2 mb-2" key={index}>
            <Form.Control
              type="text"
              value={ans}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={
                index === 0 ? "Answer #1" : `Additional answer ${index + 1}`
              }
            />
            {index > 0 && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeAnswer(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="primary"
          size="sm"
          onClick={addAnswer}
          className="mt-1"
        >
          Add another field
        </Button>
      </Form.Group>

      <div className="text-muted small">
        <strong>Primary Correct Answer:</strong>{" "}
        {answers[0] ? answers[0] : "None yet"}
      </div>
    </>
  );
}
