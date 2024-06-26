import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeContextProvider from "./context/ThemeContext.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 15,  // 15 seconds
			gcTime: 1000 * 30,  // 30 seconds
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ThemeContextProvider>
					<App />
				</ThemeContextProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);
