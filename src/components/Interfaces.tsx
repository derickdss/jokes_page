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

export interface IPostingjoke {
  postingMode: boolean;
  joke: {};
}
