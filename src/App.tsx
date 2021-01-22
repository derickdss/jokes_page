import React, { useEffect, useState } from "react";
import "./App.css";

interface INumberOfJokes {
  jokesRequested: number;
  jokesReturned: number;
}

interface IJokeCategories {
  selectedCategory: string;
  selectedType: string;
  categories: Array<string>;
  types: Array<string>;
}

interface IJokeResponse {
  category: string;
  delivery: string;
  flags: IJokeResponseFlags;
  id: number;
  lang: string;
  safe: boolean;
  setup: string;
  type: string;
}

interface IJokeResponseFlags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
}

const apiCall = async (
  category: string,
  type: string,
  numberOfJokesRequested: number,
  searchValue: string
) => {
  console.log("derd, in apiCall category", category);
  console.log("derd, in apiCall type", type);
  let searchString = searchValue ? `&contains=${searchValue}` : "";
  let jokeType = type === "single" || "twopart" ? `&type=${type}` : "";
  let response = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?safe-mode${searchString}${jokeType}&amount=${numberOfJokesRequested}`
  )
    .then((response) => response.json())
    .then((data) => data);
  return response;
};

const jokeBox = (jokes: any) => {
  const jokesContainer = jokes.map((joke: any, index: number) => {
    if (joke.type === "twopart") {
      return (
        <div className={"IndividualJokeContainer1"}>
          <div>2 liners:</div>
          <div>Setup: {joke.setup}</div>
          <div>Delivery: {joke.delivery}</div>
        </div>
      );
    } else {
      return (
        <div className={"IndividualJokeContainer2"}>
          <div>1 liner:</div>
          <div>Joke: {joke.joke}</div>
        </div>
      );
    }
  });
  return jokesContainer;
};

function App() {
  const [pageTitle, setPageTitle] = useState("Jokes Apart!!");
  const [jokeCategories, editJokeCategories] = useState<IJokeCategories>({
    selectedCategory: "Programming",
    selectedType: "any",
    categories: ["Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"],
    types: ["any", "single", "twopart"],
  });
  const [numberOfJokes, editNumberOfJokes] = useState({
    jokesRequested: 10,
    jokesReturned: 0,
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [jokes, updateJokes] = useState<IJokeResponse>();

  let { selectedCategory, selectedType, types } = jokeCategories;
  let { jokesRequested } = numberOfJokes;
  let { jokesReturned } = numberOfJokes;

  useEffect(() => {
    const fetchDataAsync = async () => {
      let jokesReturned = await apiCall(
        selectedCategory,
        selectedType,
        jokesRequested,
        searchValue
      );
      editNumberOfJokes({
        ...numberOfJokes,
        jokesReturned: jokesReturned.amount,
      });
      console.log("derd, jokes retunred", jokesReturned);
      updateJokes(jokesReturned.jokes);
    };
    fetchDataAsync();
  }, [jokeCategories, searchValue]);

  return (
    <div className="App">
      <div className="PageTitle">{pageTitle}</div>
      <div className={"CategorySelection"}>
        <div className={"FilterInputs"}>
          <input
            type="text"
            value={searchValue}
            placeholder={`Search in ${selectedCategory}`}
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
        </div>
        <div className={"FilterInputs"}>
          <span>Category: </span>
          {jokeCategories ? (
            <select
              onChange={(e) =>
                editJokeCategories({
                  ...jokeCategories,
                  selectedCategory: e.target.value,
                })
              }
            >
              {jokeCategories.categories.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          ) : null}
        </div>
        <div className={"FilterInputs"}>
          <span>Type: </span>
          {jokeCategories ? (
            <select
              onChange={(e) =>
                editJokeCategories({
                  ...jokeCategories,
                  selectedType: e.target.value,
                })
              }
            >
              {jokeCategories.types.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          ) : null}
        </div>
      </div>
      <div className={"DisplayingResultsText"}>
        <span>
          {jokesReturned
            ? `Displaying ${jokesReturned} jokes in
          ${selectedCategory}`
            : `No results found!`}
        </span>
        <span></span>
      </div>
      <div className={"JokesContainer"}>
        {jokes ? jokeBox(jokes) : `No results found!`}
      </div>
    </div>
  );
}

export default App;
