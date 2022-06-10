import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./style.module.css";

const MealsAvailable = () => {
  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMeals = async () => {
    const res = await fetch(
      "https://meals-6f865-default-rtdb.firebaseio.com/meals.json"
    );

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await res.json();
    const loadedMeals = [];
    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(loadedMeals);
    setLoading(false);
  };
  useEffect(() => {
    fetchMeals().catch((err) => {
      setLoading(false);
      setHttpError(err.message);
    });
  }, []);

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {meals?.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
          {loading && <p className={styles.mealsLoading}>Loading...</p>}
          {httpError && <p className={styles.mealsLoading}>{httpError}.</p>}
        </ul>
      </Card>
    </section>
  );
};

const MealsSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};
const Meals = () => {
  return (
    <>
      <MealsSummary />
      <MealsAvailable />
    </>
  );
};

export default Meals;
