import React from "react";
import { useLocalStorageState } from "../utils/usePersistentStorage";

type RequestStatus = "notStarted" | "loading" | "success" | "failed";

/** 5 hours in milisecons */
const MaxCacheAge = 1.8e7;

/** Shows number of recovered cases */
export const RecoveredCount: React.FC = props => {
  const [status, setStatus] = React.useState<RequestStatus>("notStarted");
  const [recovered, setRecovered] = useLocalStorageState("recoveredCount");
  const [dataDate, setDataDate] = useLocalStorageState("recoveredDate");
  const [cacheDate, setCacheDate] = useLocalStorageState("cacheDateTime");

  React.useEffect(() => {
    setStatus("loading");

    // Check if cache exists, and if it is older than 5 hours.
    if (
      cacheDate &&
      !Number.isNaN(Number(recovered)) &&
      new Date().valueOf() - new Date(cacheDate).valueOf() > MaxCacheAge
    ) {
      // If cache is older than 5 hours, fetch new data.
      fetch(".netlify/functions/covidCount")
        .then(response => response.json())
        .then(data => {
          setRecovered(String(data.recovered));
          setDataDate(new Date(data.date).toUTCString());
          setCacheDate(new Date().toUTCString());
          setStatus("success");
        })
        .catch(err => {
          console.log("Error:", err);
          setStatus("failed");
        });
    } else {
      // If cache is new enough, set the status as successful
      setStatus("success");
    }
  }, []);
  return (
    <div>
      {status === "loading" ? (
        "Loading data"
      ) : status === "success" ? (
        <div>
          As of {new Date(dataDate).getDate()}, there are{" "}
          {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
            Number(recovered)
          )}{" "}
          cases!
        </div>
      ) : status === "failed" ? (
        "Sorry, something went wrong"
      ) : (
        ":)"
      )}
    </div>
  );
};
