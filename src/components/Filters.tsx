import { Categories } from "./Categories";
import { Types } from "./Types";
import { IJokeCategories, IPostingJoke } from "./Interfaces";

export const Filters = ({
  searchValue,
  setSearchValue,
  jokeCategories,
  editJokeCategories,
  postingMode,
  postJoke,
  setPostJoke,
}: {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  jokeCategories: IJokeCategories;
  editJokeCategories: (jokeCategories: IJokeCategories) => void;
  postingMode: boolean;
  postJoke: IPostingJoke;
  setPostJoke: (postJoke: IPostingJoke) => void;
}) => {
  const { selectedCategory, types } = jokeCategories;
  return (
    <div className={"CategorySelection"}>
      <div className={"FilterInputs"}>
        <span>String search:</span>
        <input
          type="text"
          value={searchValue}
          placeholder={`Search in ${selectedCategory}`}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
      </div>
      <Categories
        jokeCategories={jokeCategories}
        editJokeCategories={editJokeCategories}
        postingMode={postingMode}
        postJoke={postJoke}
        setPostJoke={setPostJoke}
      />
      <Types
        jokeCategories={jokeCategories}
        editJokeCategories={editJokeCategories}
        postingMode={postingMode}
        postJoke={postJoke}
        setPostJoke={setPostJoke}
      />
    </div>
  );
};
