import { IJokeCategories, IPostingJoke } from "./Interfaces";
import { Categories } from "./Categories";
import { Types } from "./Types";

export const PostJoke = ({
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
    <div className={"CategorySelection"}>
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
