import React, {useEffect, useState} from 'react'; // React Hooks - https://reactjs.org/docs/hooks-overview.html
import Recipe from './Recipe.js';
import './App.css';

function App() {
  //JS
  const APP_ID = '4e15f1e8';
  const APP_KEY = 'fc89e751ccaae5f719c5b372eb6820f7';

  /* Declare state variable recipes and later set it to the data that comes back to us from the API after the fetch request has been made. 
  However, initially its just an empty array because chrome dev tools told us that it will be returned in an array when we did console.log(data)
  after making the request. React Hooks - https://reactjs.org/docs/hooks-intro.html */
  const [recipes, setRecipes] = useState([]);

  // declare state variable search initially set to empty string. Search bar input is a string
  const [search, setSearch] = useState('');

  // create state that submits itself only after we click the search button - finished text after search button clicked
  const [query, setQuery] = useState('chicken');

  /*In the useEffect, make a fetch request to the API. UseEffect runs everytime the application is rendered. It runs only once 
  (when the app is 1st rendered) when we add []. It runs every time the query changes. Therefore, parameter is [query]. Query changes when the 
  search button is clicked (when form is submitted) - https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects */ 
  useEffect(() => {
    getRecipes();
  }, [query]);
 
  /*Make a fetch (GET) request to the API. The response isn't immediate because its a promise. Therefore wait for the response by using await. 
  Extract the JSON body from the HTTP response by doing response.json(). Set the state variable recipes to data.hits because chrome dev tools tells us
  that all data (recipes) received from API are stored in data.hits. Fetch requests must be made with async await or just promises with .then()
  Use await whenever the return is a promise. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261*/
  async function getRecipes() {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  /* 2nd way
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data)
  }*/
  /* 3rd way
  async function getRecipes() {
    const response = fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`).then(response => {response.json()});
  }*/

  /*function updateSearch(e) {
    setSearch(e.target.value);
  }*/

  // run this when form is submitted
  function getSearch(e) {
    e.preventDefault(); // prevent page refresh when form is submitted
    setQuery(search);
    setSearch('');
  }
  return (
    //JSX
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={e => setSearch(e.target.value)}/>
        <button className="search-button" type="submit">Search</button>
      </form>

      <div className="recipes">
        {recipes.map(recipe => 
        <Recipe 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image} 
          ingredients={recipe.recipe.ingredients}
          key={recipe.recipe.calories}
        />)}
        {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map, https://reactjs.org/docs/lists-and-keys.html */}
      </div>  
    </div>
  );
}

export default App;