import React from "react";
import { Theater as TheaterType } from "../types/api-types";

interface TheaterProps {
  theater: TheaterType;
}

/**
 * Component that displays information about a single theater
 * @param props - Component props containing theater data
 * @returns JSX element displaying theater details
 */
const Theater: React.FC<TheaterProps> = ({ theater }) => {
  if (!theater) {
    return <div>Theater information unavailable</div>;
  }

  return (
    <article className="col-sm-12 col-md">
      <div className="card">
        <div className="card-body">
          <h5>{theater.name}</h5>
          <address>
            {theater.address_line_1}
            <br />
            {theater.address_line_2 ? theater.address_line_2 : null}
            {theater.city}, {theater.state} {theater.zip}
          </address>
        </div>
      </div>
    </article>
  );
};

export default Theater;
