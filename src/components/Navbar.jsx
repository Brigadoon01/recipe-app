import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Navbar.css";

export default function Navbar() {
  const { color } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Chef Cheffings</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
