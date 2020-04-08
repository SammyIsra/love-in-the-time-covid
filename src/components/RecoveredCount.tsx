import React from "react";

type RequestStatus = "notStarted" | "started" | "success" | "failed";

export const RecoveredCount: React.FC = (props) => {
  const [status, setStatus] = React.useState<RequestStatus>("notStarted");
  const [recovered, setRecovered] = React.useState<number>();
  const [dataDate, setDataDate] = React.useState<Date>();

  React.useEffect(() => {
    setStatus("started");
    fetch(".netlify/functions/covidCount")
      .then((response) => response.json())
      .then((data) => {
        setRecovered(data.recovered);
        setDataDate(new Date(data.date));
        setStatus("success");
      })
      .catch((err) => {
        console.log("Error:", err);
        setStatus("failed");
      });
  }, []);
  return (
    <div>
      {status === "started"
        ? "Loading data"
        : status === "success"
        ? recovered
        : status === "failed"
        ? "Sorry, something went wrong"
        : ":)"}
    </div>
  );
};
