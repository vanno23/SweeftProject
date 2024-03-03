import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import History from "./pages/History";
import Header from "./components/header/Header";
import { SearchHistoryProvider } from "./useContext/SearchContext";

function App() {
  return (
    <>
      <SearchHistoryProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </SearchHistoryProvider>
    </>
  );
}

export default App;
