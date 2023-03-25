import { BrowserRouter, Route, Routes } from "react-router-dom";
//style
import "./App.css";

// page components
import Navbar from "./components/Navbar";
import Home from "./Pages/home/Home";
import Create from "./Pages/create/Create";
import Search from "./Pages/search/Search";
import Recipe from "./Pages/recipe/Recipe";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode }`}>
      <BrowserRouter>
        <Navbar />
        <main>
          <ThemeSelector />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
