"use client";

import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
      ingredient,
    )}`,
  );

  const data = await response.json();
  return data.meals ?? [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  async function loadMealIdeas() {
    const results = await fetchMealIdeas(ingredient);
    setMeals(results);
  }

  useEffect(() => {
    loadMealIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredient]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-black">Meal Ideas</h2>
      <ul className="list-disc pl-5 space-y-1">
        {meals.map((meal) => (
          <li key={meal.idMeal} className="text-black">
            {meal.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}
