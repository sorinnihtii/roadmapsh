import questions from "./questions.json";

const BackContent = ({ questionID }) => {
  const question = questions.find((q) => q.id == questionID);

  if (!question) {
    return <p>ERROR: Question not found!</p>;
  }
  return (
    <p className="max-w-xs max-h-full text-center font-bold text-xl">
      {question.answer}
    </p>
  );
};

export default BackContent;
