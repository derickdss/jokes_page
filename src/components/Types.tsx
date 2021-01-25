import { IJokeCategories, IPostingJoke } from "./Interfaces";

export const Types = ({
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
  const { types } = jokeCategories;
  return (
    <div className={"FilterInputs"}>
      <span>Type: </span>
      {jokeCategories.types.length ? (
        <select
          onChange={(e) =>
            !postingMode
              ? editJokeCategories({
                  ...jokeCategories,
                  selectedType: e.target.value,
                })
              : setPostJoke({
                  ...postJoke,
                  payload: { ...postJoke.payload, type: e.target.value },
                })
          }
        >
          {types.map((type, index) => {
            return (
              <option key={`type${index}`} value={type}>
                {type}
              </option>
            );
          })}
        </select>
      ) : null}
    </div>
  );
};
