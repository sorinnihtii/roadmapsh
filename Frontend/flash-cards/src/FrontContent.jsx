import questions from "./questions.json";

const FrontContent = ({ questionID }) => {
  const question = questions.find((q) => q.id == questionID);

  if (!question) {
    return <p>ERROR: Question not found!</p>;
  }

  return (
    <p className="max-w-xs text-center text-3xl font-bold">
      {question.question}
    </p>
  );
};

export default FrontContent;
