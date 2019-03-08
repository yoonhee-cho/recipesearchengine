// Recipe API Key : (4a668db9f77c49f48de5846b040cba21)
var api = 'https://www.food2fork.com/api/search';
var apiKey = '4a668db9f77c49f48de5846b040cba21';
/* 
  Grab a reference to HTML elements that we need to work with 
*/
var searchTermEl = document.querySelector('.search-term');
var searchBtnEl = document.querySelector('.search-btn');
var formEl = document.querySelector('.search-form');
var listEl = document.querySelector('.recipes-list');
var notFoundEl = document.querySelector('.not-found');

var recipeImage = document.querySelector('.recipeImage');



var searchTerm = '';

	
/* 
    I wrote this function so you don't have to write out a lot of code to call an API.
    Using the following function, you just give it:
    - what URL to hit
    - what to do when the result is received from the API
*/

// fetch(path).then(callback)

function getJSON(path, callback) {
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', path, true);
  req.setRequestHeader('Accept', 'application/json');
  req.onload = function() {
    callback(req.response);
    //loadingEl.classList.add('hidden');
  };
  req.send();
}


// An array to hold our `joke` objects. We don't NEED this necessarily.
var recipes = [];

/* 
*/

function searchTerm2(ing) {

  searchTerm = ing;
 

  var endpointURL = 
      'https://www.food2fork.com/api/search'
      +'?key=4a668db9f77c49f48de5846b040cba21'
      +'&q='
      + searchTerm;
  console.log('endpoint URL is: ', endpointURL);
  /* 
    Call the API, and call `populateJokes` whenever the call finishes. 
    `populateJokes` is our "callback function" here.
  */
  getJSON(endpointURL, populateRecipes);
}


formEl.addEventListener('submit', function(event) {
  /* 
    Prevent page refresh. 
    When you submit any form, the browser will automaically refresh your page.
    the following line prevents this behavior.
  */
 	event.preventDefault();
  /* 
    Read the contents of what the user has written in the search input.
  */
  	searchTerm = searchTermEl.value;
  /* 
    construct our final API URL.
  */

  // this is what it should look like
  // wwww.foo.com/thing?name=value -- anything after the `?` is called a `Search Parameter or Query Parameter
  // https://www.food2fork.com/api/search?key=123&q=sandwich
  	var endpointURL = 
      'https://www.food2fork.com/api/search'
      +'?key=4a668db9f77c49f48de5846b040cba21'
      +'&q='
      + searchTerm;
  console.log('endpoint URL is: ', endpointURL);
  /* 
    Call the API, and call `populateJokes` whenever the call finishes. 
    `populateJokes` is our "callback function" here.
  */
  getJSON(endpointURL, populateRecipes);
});

/*populate Recipes*/

function populateRecipes(recipeData) {
  var recipesListEl = document.querySelector('.recipes-list');

  // clear the list. whatever was here from the last search, should be cleared off.
	recipesListEl.innerHTML = '';

  console.log('populateRecipes says I got recipe data!', recipeData);
  /* 
    `jokeData` is the response we got from our API.
    It has some stuff in it. But we are only interested in its `results` property, which holds our jokes inside of it.
  */
  var results = recipeData.recipes;
  /* 
    If `results` includes anything in it:
  */
  //debugger;
  if (results.length) {
    // hide the `Not found` message, if it's not already hidden.
    // notFoundEl.classList.add('hidden');
    // loop through all the jokes - the `results` array.
    for(var i = 0; i < results.length; i++) {
      // create a new `Joke` instance, using the `Joke` constructur (class) below.
      var recipe = new Recipe(results[i], recipesListEl); 

      // call `render` on the joke we just created, so it's added to our HTML
      recipe.render();
      // put this joke inside the `jokes` URL. From your browser console, now you can type in `jokes` and see all the jokes.
      recipes.push(recipe);
    }
  } else {
    // if no results found, just show the `no jokes found` message.
    notFoundEl.classList.remove('hidden');
  }
  
}

/* 
  A `class` to create `joke` instances
*/

// function searchRecipe(clicked_id) {
//   console.log(clicked_id);
//     selectedIngredient = clicked_id;
//     searchInput.value = selectedPokemon;
//     searchGiphy();
// }




function Recipe(recipeData, container) {
	this.title = recipeData.title;
	this.container = container;
	this.render = function render() {
   this.element = document.createElement('div'); 
   this.element.className = 'result-image';
   document.body.appendChild(this.element);
   // this.list = document.createElement('li');
	 // this.element = document.createElement('li'); 
   this.image = document.createElement('img');
   this.imageSrc = recipeData.image_url;
   this.titleEl = document.createElement('p');
   this.titleEl.innerText = this.title
   this.image.setAttribute('src', this.imageSrc);
   this.image.classList.add('recipe-img');
   console.log(this.imageSrc);
   // this.element.append(this.list);
   this.element.append(this.image);
	 this.element.append(this.titleEl);
	 this.container.append(this.element);

	}
}