import { Button, Form } from "react-bootstrap";

//students select one multiple choice 
/* eslint-disable @typescript-eslint/no-explicit-any */


//MUST BE ABLE TO CHANGE TITLE (TEXT INPUT)
//POINTS (NUMBER INPUT)
//QUESTION: 
//CHOICES (TEXT AREA): FACULTY CAN ADD OR REMOVE ANY # OF CHOICES 
//CANCEL BUTTON THAT DISCARDS CHANGES 

interface Props {
  question: any;
  setQuestion: (q: any) => void;
}

//react component that recieves the mcq auestion 
export default function MCQEditor({ question, setQuestion }: Props) {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion({
      ...question,
      [name]: name === "points" ? Number(value) || 0 : value,
    });
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updated = [...question.choices];
    updated[index] = value;
    setQuestion({ ...question, choices: updated });
  };

  const handleAddChoice = () => {
    setQuestion({
      ...question,
      choices: [...question.choices, `Option ${question.choices.length + 1}`],
    });
  };

  const handleRemoveChoice = (index: number) => {
    const updated = question.choices.filter((_: string, i: number) => i !== index);

    let correct = question.correctAnswer;
    if (!updated.includes(correct) && updated.length > 0) {
      correct = updated[0];
    }

    setQuestion({ ...question, choices: updated, correctAnswer: correct });
  };

  const handleCorrectChange = (choice: string) => {
    setQuestion({ ...question, correctAnswer: choice });
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
        <Form.Label>Answer Choices</Form.Label>
        {question.choices.map((choice: string, index: number) => (
          <div key={index} className="d-flex align-items-center mb-2 gap-2">
            <Form.Check
              type="radio"
              name="correctChoice"
              checked={question.correctAnswer === choice}
              onChange={() => handleCorrectChange(choice)}
              className="me-2"
            />
            <Form.Control
              type="text"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            />
            {question.choices.length > 2 && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleRemoveChoice(index)}
              >
                ✕
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline-secondary"
          size="sm"
          className="mt-2"
          onClick={handleAddChoice}
        >
          + Add Choice
        </Button>
      </Form.Group>

      <div className="text-muted small">
        <strong>Correct Answer:</strong> {question.correctAnswer}
      </div>
    </>
  );
}
