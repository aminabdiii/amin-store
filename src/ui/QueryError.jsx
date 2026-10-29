function QueryError({ onRetry }) {
  return (
    <section
      role="alert"
      className="mx-auto flex max-w-xl flex-col items-center gap-4 p-8 text-center"
    >
      <p>We couldn&apos;t load this page. Please try again.</p>
      <button
        type="button"
        onClick={() => onRetry()}
        className="rounded-xl bg-violet-500 px-5 py-3 text-white"
      >
        Try again
      </button>
    </section>
  );
}

export default QueryError;
