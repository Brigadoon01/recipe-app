import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Trash from "../assets/delete.svg";
import { projesctFirestore } from "../firebase/config";

import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();
  if (recipes.length === 0) {
    return (
      <div className="error">
        <h2>No Recipes to Load...</h2>
      </div>
    );
  }
  const handleDelete = (id) => {
    projesctFirestore.collection("recipes").doc(id).delete();
  };
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipe/${recipe.id}`}>Cook This</Link>
          <img
            onClick={() => handleDelete(recipe.id)}
            src={Trash}
            className="delete"
            alt="delete button"
          />
        </div>
      ))}
    </div>
  );
}
