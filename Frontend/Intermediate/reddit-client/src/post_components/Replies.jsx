import { memo } from "react";
import Comment from "./Comment";

const Replies = ({ replies }) => {
  console.log("replies:", replies);

  return (
    <>
      {replies.data.children.map((reply) => {
        return <Comment data={reply.data} />;
      })}
    </>
  );
};

export default Replies;
