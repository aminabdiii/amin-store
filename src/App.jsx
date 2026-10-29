import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import ScrollTop from "./ui/ScrollTop";
import AppRoutes from "./AppRoutes";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0, retry: 2, refetchOnMount: true },
  },
});

function App() {
  useEffect(() => {
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

    if (isFirefox) {
      document.documentElement.classList.remove("scroll-smooth");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        draggable={true}
        stacked
        autoClose={3000}
        closeButton={true}
      />
      <BrowserRouter>
        <ScrollTop />

        <AppRoutes />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
