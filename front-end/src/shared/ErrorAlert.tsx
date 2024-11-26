import React from "react";
import { ApiError } from "../types/api-types";

interface ErrorAlertProps {
  error: ApiError | null;
}

/**
 * Displays a Tailwind-styled alert for error messages
 * @param props - Component props containing error object
 * @returns JSX element displaying error message in an alert, or null if no error
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div 
      className="my-2 px-4 py-3 border border-red-400 rounded bg-red-100 text-red-700" 
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error.message}</span>
    </div>
  );
};

export default ErrorAlert;
