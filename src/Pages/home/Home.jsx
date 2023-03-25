import "./Home.css";
import { projesctFirestore } from "../../firebase/config";
import RecipeList from "../../components/RecipeList";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    const unsub = projesctFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No Recipes to load");
          setIsLoading(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsLoading(false);
        }
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
      {!data && error && <p className="no-recipes">No recipes found</p>}
    </div>
  );
}
