import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./Styles/index.css";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "./ui/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={NotFound}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
