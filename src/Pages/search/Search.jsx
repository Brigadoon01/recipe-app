import "./Search.css";
import { useLocation } from "react-router-dom";
import useFetch from "./../../hooks/useFetch";
import RecipeList from "./../../components/RecipeList";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("query");

  const url = "http://localhost:3003/recipes?q=" + query;

  const { data, isLoading, error } = useFetch(url);
  return (
    <div>
      {data && <h2 className="page-title">Recipes including "{query}"</h2>}
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading... </p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
