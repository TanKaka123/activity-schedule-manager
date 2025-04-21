import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SchedulePage } from "./components/schedule-page";
import { useState } from "react";
import { SheduleLogicProvider } from "./contexts/schedule-logic-context";
import "./App.css";
import "./styles/schedule.css";
import "./styles/modal.css";
import "./styles/button.css";
import "./styles/loader.css";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SheduleLogicProvider>
        <SchedulePage />
      </SheduleLogicProvider>
    </QueryClientProvider>
  );
}

export default App;
