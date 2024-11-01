import React from "react";
import { Theater as TheaterType } from "../types/api-types";
import Theater from "./Theater";

interface TheaterListProps {
  theaters?: TheaterType[];
}

/**
 * Component that displays a list of theaters where a movie is showing
 * @param props - Component props containing theaters array
 * @returns JSX element displaying the list of theaters or null if empty
 */
const TheaterList: React.FC<TheaterListProps> = ({ theaters = [] }) => {
  if (!theaters.length) {
    return null;
  }

  return (
    <section className="mt-4">
      <h4>Now Showing Here</h4>
      <div className="row">
        {theaters.map((theater) => (
          <Theater key={theater.theater_id} theater={theater} />
        ))}
      </div>
    </section>
  );
};

export default TheaterList;
