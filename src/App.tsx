import React, { useEffect, useState } from "react";
import "./App.css";

interface INumberOfJokes {
  jokesRequested: number;
  jokesReturned: number;
}

interface IJokeCategories {
  selectedCategory: string;
  selectedType: string;
  safeMode: true;
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
  safe: boolean,
  numberOfJokesRequested: number,
  searchValue: string
) => {
  console.log("derd, in apiCall category", category);
  console.log("derd, in apiCall type", type);
  let searchString = searchValue ? `&contains=${searchValue}` : "";
  let safeMode = safe ? "safe-mode" : "";
  let typeLowercase = type.toLowerCase();
  let jokeType =
    typeLowercase === "single" || "twopart" ? `&type=${typeLowercase}` : "";
  let response = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?${safeMode}${searchString}${jokeType}&amount=${numberOfJokesRequested}`
  )
    .then((response) => response.json())
    .then((data) => data);
  return response;
};

const apiCall2 = async () => {
  let response = await fetch(`https://v2.jokeapi.dev/info`)
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
    selectedCategory: "Any",
    selectedType: "Any",
    safeMode: true,
    categories: [],
    types: ["Any", "Single", "Twopart"],
  });
  const [numberOfJokes, editNumberOfJokes] = useState({
    jokesRequested: 10,
    jokesReturned: 0,
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [jokes, updateJokes] = useState<IJokeResponse>();

  let { selectedCategory, selectedType, types, safeMode } = jokeCategories;
  let { jokesRequested } = numberOfJokes;
  let { jokesReturned } = numberOfJokes;

  useEffect(() => {
    const fetchJokesCategoryDataAsync = async () => {
      let categoriesReturnedObject = await apiCall2();
      console.log("derd appcall2", categoriesReturnedObject);
      let {
        jokes: { categories },
      } = categoriesReturnedObject;

      if (safeMode) {
        categories.splice(categories.indexOf("Dark"), 1);
      }
      editJokeCategories({
        ...jokeCategories,
        categories: categories,
      });
    };
    fetchJokesCategoryDataAsync();
  }, []);

  useEffect(() => {
    const fetchJokesDataAsync = async () => {
      let jokesReturned = await apiCall(
        selectedCategory,
        selectedType,
        safeMode,
        jokesRequested,
        searchValue
      );
      editNumberOfJokes({
        ...numberOfJokes,
        jokesReturned: jokesReturned.amount,
      });
      console.log("derd, categories", jokeCategories);
      console.log("derd, jokes retunred", jokesReturned);
      updateJokes(jokesReturned.jokes);
    };
    fetchJokesDataAsync();
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
          {jokeCategories.categories ? (
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
              {types.map((type, index) => {
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
