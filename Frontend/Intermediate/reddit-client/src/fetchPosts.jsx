import { useEffect, useState } from "react";

const fetchPosts = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setIsPending(true);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, []);

  return { data, isPending, error };
};

export default fetchPosts;
