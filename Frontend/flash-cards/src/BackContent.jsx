import questions from "./questions.json";

const BackContent = ({ questionID }) => {
  const question = questions.find((q) => q.id == questionID);

  if (!question) {
    return <p className="font-semibold">Question not found</p>;
  }
  return (
    <p className="max-w-xs max-h-full text-center text-xl cursor-default">{question.answer}</p>
  );
};

export default BackContent;
