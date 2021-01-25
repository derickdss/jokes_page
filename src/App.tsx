import React, { useEffect, useState } from "react";
import {
  IJokeCategories,
  INumberOfJokes,
  IJokeResponse,
  IJokeResponseFlags,
  IPostingJoke,
} from "./components/Interfaces";
import { Filters } from "./components/Filters";
import "./App.css";

// can refactor and create a seperate apiCall function

const fetchJokes = async (
  category: string,
  type: string,
  safe: boolean,
  numberOfJokesRequested: number,
  searchValue: string
) => {
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

const fetchJokesData = async () => {
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
  const pageTitle = "Jokes Apart!!";
  const [jokeCategories, editJokeCategories] = useState<IJokeCategories>({
    selectedCategory: "Any",
    selectedType: "Any",
    safeMode: true,
    categories: [],
    types: [],
  });
  const [numberOfJokes, editNumberOfJokes] = useState<INumberOfJokes>({
    jokesRequested: 10,
    jokesReturned: 0,
    jokesAvailable: 0,
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [jokes, updateJokes] = useState<IJokeResponse>();
  const [postJoke, setPostJoke] = useState<IPostingJoke>({
    postingMode: false,
    payload: {
      formatVersion: 3,
      type: "single",
      category: "",
      joke: "A horse walks into a bar...",
      flags: {
        nsfw: true,
        religious: false,
        political: true,
        racist: false,
        sexist: false,
        explicit: false,
      },
      lang: "en",
    },
  });

  let { selectedCategory, selectedType, types, safeMode } = jokeCategories;
  let { jokesRequested, jokesReturned, jokesAvailable } = numberOfJokes;
  let { postingMode } = postJoke;

  const submitJokeHandler = () => {
    console.log("derd is submit");
    setPostJoke({
      ...postJoke,
      postingMode: false,
    });
  };

  useEffect(() => {
    const fetchJokesDataAsync = async () => {
      let categoriesReturnedObject = await fetchJokesData();
      console.log("derd appcall2", categoriesReturnedObject);
      let {
        jokes: { categories, types, totalCount },
      } = categoriesReturnedObject;

      if (safeMode) {
        categories.splice(categories.indexOf("Dark"), 1);
      }

      types.unshift("Any");

      editNumberOfJokes({
        ...numberOfJokes,
        jokesAvailable: totalCount,
      });

      editJokeCategories({
        ...jokeCategories,
        categories: categories,
        types: types,
      });
    };
    fetchJokesDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchJokesAsync = async () => {
      let jokesReturned = await fetchJokes(
        selectedCategory,
        selectedType,
        safeMode,
        jokesRequested,
        searchValue
      );
      console.log("derd, jokes returned", jokesReturned);
      editNumberOfJokes({
        ...numberOfJokes,
        jokesReturned: jokesReturned.amount,
      });
      updateJokes(jokesReturned.jokes);
    };
    fetchJokesAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jokeCategories, searchValue]);

  return (
    <div className="App">
      <div className="PageTitle">{pageTitle}</div>
      <div className="FilterPostJokeOptions">
        {!postingMode ? (
          <div>
            <div className={"FilterSectionTitle"}>Filters:</div>
            <Filters
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              jokeCategories={jokeCategories}
              editJokeCategories={editJokeCategories}
              postingMode={postingMode}
              postJoke={postJoke}
              setPostJoke={setPostJoke}
            />
          </div>
        ) : null}
      </div>
      <div className={"DisplayingResultsText"}>
        <span>
          {jokesReturned
            ? `Displaying ${jokesReturned} jokes in
          ${selectedCategory} category. A total of ${jokesAvailable} are available in all categories.`
            : `No results found!`}
        </span>
      </div>
      <div className={"JokesContainer"}>
        {jokes ? jokeBox(jokes) : `No results found!`}
      </div>
    </div>
  );
}

export default App;
