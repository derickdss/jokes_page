import React, { useEffect, useState } from "react";
import "./App.css";

interface IJokeCategories {
  selectedCategory: string;
  amount: number;
  categories: Array<string>;
}

const apiCall = async (category: string, amount: number) => {
  console.log("derd, in apiCall");
  let response = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?amount=${amount}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.jokes;
    });
  return response;
};

function App() {
  const [jokeCategories, editJokeCategories] = useState<IJokeCategories>({
    selectedCategory: "Programming",
    amount: 10,
    categories: ["Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"],
  });
  const [jokes, updateJokes] = useState();

  useEffect(() => {
    const fetchDataAsync = async () => {
      let { selectedCategory, amount } = jokeCategories;
      updateJokes(await apiCall(selectedCategory, amount));
      //await apiCall(selectedCategory, amount);
    };
    fetchDataAsync();
  }, [jokeCategories]);

  return (
    <div className="App">
      <div>Jokes Apart</div>
      <div>list of jokes</div>
    </div>
  );
}

export default App;
