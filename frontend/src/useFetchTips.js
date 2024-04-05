import { useEffect, useState } from "react";

const useFetchTips = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

      fetch(url, {signal: abortController.signal})
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data for that resource.");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch aborted!");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });

    return () => abortController.abort();
  }, [url]);

  return [data, isPending, error]; // Can be an array or object
};

export default useFetchTips;
