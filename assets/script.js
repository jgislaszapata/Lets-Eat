// Initializes variable for search button results
var generateResults = document.getElementById('search-button');
 
// API key for Spoontacular food recipe API
var apiKey = "4e9c1647bamsh75f9980fca9fd27p176220jsn6936ac7b1a28"

// Global variable to get ingredient ID
var ingredientIDs = [];

// Event listener is added to search button
$("#results").hide();

// Sets generateResults element to the results of the get recipe function when search-button is clicked
generateResults.addEventListener("click", getRecipe);

// EXPLAINATION OF PRIMARY SCRIPT FUNCTION
// ************************************************************************************************************************
// 1) Function getRecipe() is invoked when search button is clicked
// 2) This function inturn calls getrecipeID() to get the top 5 ingredient ID's for the entered ingredient
// 3) Ingredient IDs are then passed to getRecipe() function to retrive information like Title, Image, PrepTime and Instructions
// ************************************************************************************************************************

// The reason behind two API calls is that API used in getRecipe function requires 
async function getRecipe() {

await getReceipeID(); // Halt function execution until API results are fully returned
  
console.log(ingredientIDs); // Print incredient ID to the browser console for verification

// APU pull method ("GET") & header variables ("apiKey", API host URL)
const options = {
  method: 'GET', // API command to retrieve results
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

// Set results ID elements in the HTML and displays
$("#results").show();
  for (var i = 0; i < 5; i++) { // Loop returning 6 total results from the search "i,0,6"
  await fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + ingredientIDs[i] + '/information', options)
  .then(function (res) {
    return res.json(); // Return API results as a JSON object
  })
  .then(function (data1) {
    console.log("recipe details" ,data1); // Log receipe results to browser console for dev validation
    $("#title_" + i).text(data1.title); // Applies title value from API to the coorresponding (i) HTML element
    const imgEl = document.getElementById("img_"+i); // Create an element iteratively for each result image
    imgEl.src = data1.image; // Set the iterative image elements to a cooresponding photo
    $("#prepTime_" + i).text(data1.readyInMinutes); // Apply prep time from API to the corresponding (i) HTML element
    $("#instruction_" + i).text(data1.instructions); // Apply instructions from API to the corresponding (i) HTML element
  })
  .catch(err => console.error(err)); // Error catch from API call to console log an error
  }

} // End getRecipe() function

//This API call converts the user entered ingredient and fetchs corresponding ID
async function getReceipeID() {
  //API query values
  const options = {
    method: 'GET', // GET method for API to return results
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  
  // Initialize variable based on user text input value requesting ingredient name
  var ingredientSearch = $("#location-input").val();
    await fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=' + ingredientSearch, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("receipe id" ,data); // Console log recipe ID and corresponding data to browser console
      ingredientIDs = []; // Empty array to store ingredient IDs
      // Loop retrieving 6 ingredient IDs i,0,6
      for (var i = 0; i < 5; i++) {
        ingredientIDs[i] = data[i].id;
      }
      console.log("ingredient id", ingredientIDs); // Print ingredient ID's to browser console
    })
    .catch(err => console.error(err)); // API call error handling

} // End of the getRecipeID() function

