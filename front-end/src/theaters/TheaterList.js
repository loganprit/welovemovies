import React, { useEffect, useState } from "react";
import Theater from "./Theater";
import ErrorAlert from "../shared/ErrorAlert";
import { listTheaters } from "../utils/api";

function TheaterList() {
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTheaters() {
      try {
        setError(null);
        const data = await listTheaters(abortController.signal);
        // Only set state if component is still mounted
        if (!abortController.signal.aborted) {
          setTheaters(data);
        }
      } catch (error) {
        // Only set error if component is still mounted and it's not an abort error
        if (error.name !== "AbortError" && !abortController.signal.aborted) {
          setError(error);
        }
      }
    }

    loadTheaters();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, []);

  const list = theaters.map((theater) => (
    <Theater key={theater.theater_id} theater={theater} />
  ));

  return (
    <main className="container">
      <ErrorAlert error={error} />
      <h2 className="font-poppins">All Theaters</h2>
      <hr />
      <section className="row">{list}</section>
    </main>
  );
}

export default TheaterList;
