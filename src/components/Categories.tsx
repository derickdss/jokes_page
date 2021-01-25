import { IJokeCategories, IPostingJoke } from "./Interfaces";

export const Categories = ({
  jokeCategories,
  editJokeCategories,
  postingMode,
  postJoke,
  setPostJoke,
}: {
  jokeCategories: IJokeCategories;
  editJokeCategories: (jokeCategories: IJokeCategories) => void;
  postingMode: boolean;
  postJoke: IPostingJoke;
  setPostJoke: (postJoke: IPostingJoke) => void;
}) => {
  return (
    <div className={"FilterInputs"}>
      <span>Category: </span>
      {jokeCategories.categories.length ? (
        <select
          onChange={(e) =>
            !postingMode
              ? editJokeCategories({
                  ...jokeCategories,
                  selectedCategory: e.target.value,
                })
              : setPostJoke({
                  ...postJoke,
                  payload: { ...postJoke.payload, category: e.target.value },
                })
          }
        >
          {jokeCategories.categories.map((category, index) => {
            return (
              <option key={`category${index}`} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      ) : null}
    </div>
  );
};
