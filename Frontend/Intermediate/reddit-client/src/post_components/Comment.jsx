import { useState } from "react";
import Replies from "./Replies";
import { convertTime } from "../tools/tools";
import { memo } from "react";

const Comment = ({ data }) => {
  const [isOpenReplies, setIsOpenReplies] = useState(false);

  function handleViewReplies() {
    setIsOpenReplies(true);
  }

  return (
    <article className="w-150 mt-6">
      <header className="flex text-sm">
        <a className="font-semibold">u/{data.author}</a>
        <p className="before:content-['•'] before:px-2">
          {convertTime(data.created_utc * 1000)}
        </p>
      </header>
      <p>{data.body}</p>
      {data.replies && (
        <footer className="ml-4 my-2 pl-2 border-l border-l-black">
          {!isOpenReplies ? (
            <button
              className="text-xs border-b border-b-gray-400 cursor-pointer"
              onClick={handleViewReplies}
            >
              View Replies
            </button>
          ) : (
            <Replies replies={data.replies} />
          )}
        </footer>
      )}
    </article>
  );
};

export default Comment;
