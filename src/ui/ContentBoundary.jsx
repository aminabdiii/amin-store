import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import QueryError from "./QueryError";

function ContentBoundary({ children }) {
  const { pathname, search } = useLocation();
  return (
    <ErrorBoundary
      resetKeys={[pathname, search]}
      fallbackRender={({ resetErrorBoundary }) => (
        <QueryError onRetry={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export default ContentBoundary;
