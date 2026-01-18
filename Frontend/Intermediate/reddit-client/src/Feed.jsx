import { useEffect, useState } from "react";
import useFetch from "./tools/useFetch.jsx";
import Post from "./post_components/Post.jsx";

const homepage = "https://www.reddit.com";

const Feed = ({ subreddit, handleCloseLane }) => {
  const [query, setQuery] = useState(homepage + `/r/${subreddit}.json`);
  const [posts, setPosts] = useState([]);
  const { data, isLoading, error } = useFetch(query);

  useEffect(() => {
    if (!data) return;

    setPosts((prev) => {
      const ids = new Set(prev.map((p) => p.data.id));
      const unique = data.data.children.filter((p) => !ids.has(p.data.id));
      return [...prev, ...unique];
    });
  }, [data]);

  const loadMorePosts = () => {
    setQuery(
      `https://www.reddit.com/r/${subreddit}.json?after=${data.data.after}`,
    );
  };

  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <section className="flex-col h-screen overflow-y-auto">
      <header className="fixed flex pl-4 gap-4 bg-white h-6 w-full z-50">
        <button
          onClick={() => {
            handleCloseLane(subreddit);
          }}
          className="cursor-pointer"
        >
          X
        </button>
        <p>r/{subreddit}</p>
      </header>
      {posts &&
        posts.map((post) => {
          return (
            <Post
              key={post.data.id}
              data={post.data}
              copyToClipboard={copyToClipboard}
            />
          );
        })}
      {!isLoading && (
        <button
          onClick={loadMorePosts}
          className="px-4 py-px bg-orange-400 rounded-xl cursor-pointer"
        >
          View more posts
        </button>
      )}
      {isLoading && <p>Loading...</p>}

      {error && <p>{error.message}</p>}
    </section>
  );
};

export default Feed;
