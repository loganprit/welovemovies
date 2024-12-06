import React, { Component, ErrorInfo, ReactNode } from "react";
import { useTheme } from "../theme/ThemeContext";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Something went wrong
          </h2>
          <p className="mt-2 text-red-700 dark:text-red-300">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary: React.FC<Props> = (props) => {
  const { theme } = useTheme();
  
  return (
    <ErrorBoundaryClass
      {...props}
      fallback={
        <div className={`p-4 rounded-lg ${
          theme === "dark" 
            ? "bg-red-900/20 text-red-200" 
            : "bg-red-50 text-red-800"
        }`}>
          <h2 className="text-lg font-semibold">Something went wrong</h2>
          <p className="mt-2">Please try refreshing the page</p>
        </div>
      }
    />
  );
}; 