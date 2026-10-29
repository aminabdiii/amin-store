import QueryError from "./QueryError";

function AppErrorFallback({ resetErrorBoundary }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <QueryError onRetry={resetErrorBoundary} />
      <a className="underline" href="/home">
        Back to home
      </a>
    </main>
  );
}

export default AppErrorFallback;
