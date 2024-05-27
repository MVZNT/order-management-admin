import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";

import "./index.css";
import App from "./App.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Toaster/>
                <App/>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);