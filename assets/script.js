//hide the result container
$("#results").hide();
//get search button element ID
var generateResults = document.getElementById('search-button');
var previousSearchEl = document.getElementById("previousSearch");

var apiKey = "dbb930ff0emsh649dcb8a3228950p19ae08jsn5b7d964da6d1"
//global variable to get ingredient ID
var ingredientIDs = [];
var savedSearches = [];
//back button function added
document.querySelector("#back-button").addEventListener("click",()=>{
  window.location.reload(true);
} )
//Event listener is added to search button
generateResults.addEventListener("click", getRecipe);

//Function getRecipe is invoked when search button is clicked.
//This function inturn calls getrecipeID to get top 5 ingredient ID's for the entered ingredient
//Ingredient IDs are then passed to getRecipe function to retrive information like Title, Image, PrepTime and Instructions 

// The reason behind two API calls is that API used in getRecipe function requires 
async function getRecipe() {

  await getReceipeID();
  console.log(ingredientIDs);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  $("img").remove();
  for (var i = 0; i < 5; i++) {
    await fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + ingredientIDs[i] + '/information', options)
      .then(function (res) {
        return res.json();
      })
      .then(function (data1) {
        console.log("recipe details", data1);
        $("#title_" + i).text(data1.title);
        var img = document.createElement("IMG");
        img.src = data1.image;

        $("#recipe_" + i).append(img);

        $("#prepTime_" + i).text(data1.readyInMinutes);
        $("#instruction_" + i).text(data1.instructions);

      })

      .catch(err => console.error(err));

  }
  $("#results").show();

  //apends current search to previous searches
  var listEl = document.createElement("li");
  listEl.textContent = $("#ingredient-input").val();
  previousSearchEl.appendChild(listEl);

  //clear the input field & prepare for next input
  $("#ingredient-input").val("");
}

//This API call converts the user entered ingredient and fetchs corresponding ID
async function getReceipeID() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  //get the value of the input field
  var ingredientSearch = $("#ingredient-input").val();

  //add new input to saved Searches array & set key,value in local storage
  savedSearches.push(ingredientSearch);
  localStorage.setItem("savedSearches", JSON.stringify(savedSearches));


  await fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=' + ingredientSearch, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("receipe id", data);
      ingredientIDs = [];
      for (var i = 0; i < 5; i++) {
        ingredientIDs[i] = data[i].id;
      }
      console.log("ingredient id", ingredientIDs);

    })
    .catch(err => console.error(err));
}

//this function gets auto invoked when page loads
init();

function init() {
  var storedSearches = JSON.parse(localStorage.getItem("savedSearches"));
  if (storedSearches != null) {
    displayPrevSearchHistory(storedSearches);
  }
}

//this function get the saved searches from local storage and displays in on the screen
function displayPrevSearchHistory(storedSearches) {
  for (var i = 0; i < storedSearches.length; i++) {
    var savedDetails = storedSearches[i];
    var listEl = document.createElement("li");
    listEl.textContent = savedDetails;
    previousSearchEl.appendChild(listEl);
  }
}