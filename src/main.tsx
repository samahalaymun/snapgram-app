
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { Suspense } from "react";
import PreLoaderPage from "./components/shared/PreLoaderPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<PreLoaderPage/>}>
     <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
  </Suspense>
 
);
