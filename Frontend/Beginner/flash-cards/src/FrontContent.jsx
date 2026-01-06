import questions_en from "./questions/en.json";
import questions_ro from "./questions/ro.json";
import questions_ru from "./questions/ru.json";

const FrontContent = ({ questionID, lang }) => {
  let question;
  if (lang == "en") question = questions_en.find((q) => q.id == questionID);
  if (lang == "ro") question = questions_ro.find((q) => q.id == questionID);
  if (lang == "ru") question = questions_ru.find((q) => q.id == questionID);

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
