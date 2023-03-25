import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { projesctFirestore } from "../../firebase/config";
import { useTheme } from "../../hooks/useTheme";

import "./Recipe.css";

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const { mode } = useTheme();

  useEffect(() => {
    setIsLoading(true);

    const unsub = projesctFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsLoading(false);
          setRecipe(doc.data());
        } else {
          setIsLoading(false);
          setError("Recipe not found");
        }
      });
    return () => {
      unsub();
    };
  }, [id]);

  const handleUpdate = () => {
    setIsLoading(true);
    projesctFirestore.collection("recipes").doc(id).update({
      title: "Pepper Ste",
      ingredients: recipe.ingredients,
      method: recipe.method,
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleUpdate}>Update</button>
        </>
      )}
    </div>
  );
}
