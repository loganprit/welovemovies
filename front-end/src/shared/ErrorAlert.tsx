import React from "react";
import { ApiError } from "../types/api-types";

interface ErrorAlertProps {
  error: ApiError | null;
}

/**
 * Displays a bootstrap danger alert if the specified error is truthy.
 * @param props - Component props containing error object
 * @returns JSX element displaying error message in a bootstrap alert, or null if no error
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div 
      className="alert alert-danger m-2" 
      role="alert"
    >
      Error: {error.message}
    </div>
  );
};

export default ErrorAlert;
