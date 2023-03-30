import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, Link } from "react-router-dom";
import Container from "./components/Container";
import DetailCard from "./components/DetailCard";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Link to={"/"}>
          <div className="text-md flex justify-center font-bold text-black">
            Pokedex
          </div>
        </Link>
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/:id" element={<DetailCard />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
