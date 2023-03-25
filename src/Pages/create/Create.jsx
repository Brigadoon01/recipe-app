import "./Create.css";
import { useRef, useState, useEffect } from "react";
import { projesctFirestore } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {
      title,
      method,
      cookingTime: cookingTime + `minutes`,
      ingredients,
    }
    try {
      projesctFirestore.collection("recipes").add(doc)
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

 
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };
  const { color } = useTheme();

  return (
    <div>
      <div className="create">
        <h2 className="page-title">Add a New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Recipe Title:</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            <span>Recipe Ingredients:</span>
            <div className="ingredients">
              <input
                type="text"
                onChange={(e) => setNewIngredient(e.target.value)}
                value={newIngredient}
                ref={ingredientInput}
              />
              <button
                onClick={handleAdd}
                className="btn"
                style={{ background: color }}
              >
                Add
              </button>
            </div>
          </label>
          <p>
            Current Ingredients:
            {ingredients.map((ing) => (
              <em key={ing}> {ing}, </em>
            ))}
          </p>

          <label>
            <span>Recipe Method:</span>
            <textarea
              required
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </label>

          <label>
            <span>Cooking Time(minutes):</span>
            <input
              type="number"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            />
          </label>

          <button type="submit" className="btn" style={{ background: color }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
