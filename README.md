
Please use master as the default branch for now.

Notes:

The Page:
This is a react app consisting of a page of jokes that will be displayed. These jokes could be from different genres and lengths.
The jokes can be filtered based on their categories, types(1 or 2 part) or phrase/string search.
The landing page consists of jokes with no specific category or type. The jokes can then be filtered based on category, type or phrases/words.
The search is dynamic and youd wouldnt need to click a button to initiate the search.

React:
The page uses functional programming with hooks to take care of the state. I did consider using Redux using hooks and possibly thunks for async, but considered time constraints and as the page wasn't too complicated yet, stuck to hooks. I would use redux moving forwards in order to simplify and centralize the store usage.
The page also uses Typescript in order to define types. I have tried to define the functionalities and JSX bits using seperate functions to reduce redundant code and also have re-usable components.

I was moving onto the functionality to add new Jokes using the dry-run parameter but prioritized making the code more readable before having maximum functionality. 
