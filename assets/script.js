//hide the result container
$("#results").hide();
//get search button element ID
var generateResults = document.getElementById('search-button');
var previousSearchEl = document.getElementById("previousSearch");

var apiKey = "dbb930ff0emsh649dcb8a3228950p19ae08jsn5b7d964da6d1"
//global variable to get ingredient ID
var ingredientIDs = [];

var buttonvalue;

//back button function added
document.querySelector("#back-button").addEventListener("click", () => {
  window.location.reload(true);
})

//Event listener is added to search button
generateResults.addEventListener("click", getRecipe);

//Function getRecipe is invoked when search button is clicked.
//This function inturn calls getrecipeID to get top 5 ingredient ID's for the entered ingredient
//Ingredient IDs are then passed to getRecipe function to retrive information like Title, Image, PrepTime and Instructions 

//API used in getRecipeID function requires ingredient as required parameter and returns ingredient ID, this is passed to API in getRecipe function
//API used in getRecipe function requires ingredient ID as required parameter

//---------------------------Start of getRecipe function --------------------------------------------

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
  appendCurrentSearch();

  //clear the input field & prepare for next input
  $("#ingredient-input").val("");
  buttonvalue = undefined;
}

//------------------------------------end of getRecipe function-----------------------------------------------

//------------------------------------start of getrecipeID function ------------------------------------------

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
  addValuePreviousSearch();

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

//--------------------------------end of getRecipeID fucntion--------------------------------------------------

//this function gets auto invoked when page loads to check and display if there are any value stored in local storage
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
    var buttonEl = document.createElement("button");
    buttonEl.textContent = savedDetails;
    previousSearchEl.appendChild(listEl);
    listEl.appendChild(buttonEl);
  }
}

// clears any existing event listener and add event listener to previous search button
function addEventPrevSeachBtn() {
  $("li").off('click', 'button');
  $("li").on('click', 'button', function () {
    buttonvalue = this.textContent;
    $('#ingredient-input').val(buttonvalue);
    console.log(buttonvalue);
    getRecipe();
  })
}

//this function is invoked from getRecipe function to append the current search to previous search history div element
//and attaches event listener
function appendCurrentSearch() {
  if (buttonvalue === undefined) {
    var listEl = document.createElement("li");
    var buttonEl = document.createElement("button");
    buttonEl.textContent = $("#ingredient-input").val();
    previousSearchEl.appendChild(listEl);
    listEl.appendChild(buttonEl);
    addEventPrevSeachBtn();
  }
}

//this function is invoked from getRecipeID function to add new search ingredient to local storage
function addValuePreviousSearch() {
  if (buttonvalue === undefined) {
    var savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
    if (savedSearches === null) {
      var savedSearches = [];
    }
    savedSearches.push($("#ingredient-input").val());
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
  }
}

//clear search button
document.getElementById("clear-search").onclick = clear_me;
function clear_me() {
  localStorage.clear();
}