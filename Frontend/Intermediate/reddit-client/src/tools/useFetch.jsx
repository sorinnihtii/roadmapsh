import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(url);
        setError(null);
        setIsLoading(true);

        const response = await fetch(url, {
          headers: {
            "User-Agent":
              "multilane-reddit-client:1.0 (github.com/sorinnihtii/roadmapsh/tree/main/Frontend/Intermediate/reddit-client)",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
