export interface INumberOfJokes {
  jokesRequested: number;
  jokesReturned: number;
  jokesAvailable: number;
}

export interface IJokeCategories {
  selectedCategory: string;
  selectedType: string;
  safeMode: true;
  categories: Array<string>;
  types: Array<string>;
}

export interface IJokeResponse {
  category: string;
  delivery: string;
  flags: IJokeResponseFlags;
  id: number;
  lang: string;
  safe: boolean;
  setup: string;
  type: string;
}

export interface IJokeResponseFlags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
}

export interface IPostingJoke {
  postingMode: boolean;
  payload: {
    formatVersion: number;
    category: string;
    type: string;
    joke?: string;
    setup?: string;
    delivery?: string;
    flags: {
      nsfw: boolean;
      religious: boolean;
      political: boolean;
      racist: boolean;
      sexist: boolean;
      explicit: boolean;
    };
    lang: string;
  };
}
