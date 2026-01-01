import questions from "./questions.json";

const FrontContent = ({ questionID }) => {
  const question = questions.find((q) => q.id == questionID);

  if (!question) {
    return <p className="font-semibold">Question not found</p>;
  }

  return (
    <p className="max-w-xs text-center text-3xl font-bold cursor-default">
      {question.question}
    </p>
  );
};

export default FrontContent;
