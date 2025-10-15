
import { defaultRecipe } from "./defaultRecipes.js";
import { youtubeVideoSearch } from "./youtubeSearch.js";


const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id'); // gets the ID from URL

const pageTitle = document.getElementById('pageTitle'); // H1
const pageTitleTag = document.getElementById('pageTitleTag'); // <title>
const image = document.getElementById('image');
const detailsWrapper = document.getElementById('detailsWrapper');
const servings = document.getElementById('servings');
const pricePerServing = document.getElementById('pricePerServing');
const readyInMinutes = document.getElementById('readyInMinutes');
const cookingMinutes = document.getElementById('cookingMinutes');
const preparationMinutesEl = document.getElementById('preparationMinutes');
const healthScoreEl = document.getElementById('healthScore');
const spoontacularScoreEl = document.getElementById('spoontacularScore');
const sourceUrl = document.getElementById('sourceUrl');
const ingredientsWrapper = document.getElementById('ingredientsWrapper');
const youtubeSearch = document.getElementById('youtubeSearch');



let data = defaultRecipe;
const apiKey = "144f4b41496b496f80a1fc74b5b9e0a5";


// Populate all the data on the detailed recipe page
async function populateRecipePage(id) {
    
    try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
            );
    
            if (!response.ok) throw new Error("API request failed");
    
            data = await response.json();           
            
        } catch (error) {
            console.error('Error fetching recipes:', error);
            // fallback to default data
            data = defaultRecipe;
        }
    

    

        pageTitle.textContent = data.title;
        pageTitleTag.textContent = data.title;
        image.src = data.image;
        image.alt = data.title;
        servings.textContent = data.servings || 'N/A';;
        pricePerServing.textContent = "$" + data.pricePerServing  || 'N/A';;
        readyInMinutes.textContent = data.readyInMinutes || 'N/A';;
        cookingMinutes.textContent = data.cookingMinutes || 'N/A';;
        preparationMinutesEl.textContent = data.preparationMinutes || 'N/A';
        healthScoreEl.textContent = data.healthScore || 'N/A';
        spoontacularScoreEl.textContent = data.spoonacularScore || 'N/A';
        document.getElementById('creditsText').textContent = data.creditsText;
        document.getElementById('cheap').textContent = data.cheap;
        document.getElementById('dairyFree').textContent = data.dairyFree;
        document.getElementById('glutenFree').textContent = data.glutenFree;
        document.getElementById('ketogenic').textContent = data.ketogenic;
        document.getElementById('lowFodmap').textContent = data.lowFodmap;
        document.getElementById('sustainable').textContent = data.sustainable;
        document.getElementById('vegan').textContent = data.vegan;
        document.getElementById('vegetarian').textContent = data.vegetarian;
        document.getElementById('veryHealthy').textContent = data.veryHealthy;
        document.getElementById('veryPopular').textContent = data.veryPopular;
        document.getElementById('whole30').textContent = data.whole30;
        document.getElementById('gaps').textContent = data.gaps;
        document.getElementById('cuisines').textContent = data.cuisines.length ? data.cuisines.join(', ') : 'None';
        document.getElementById('diets').textContent = data.diets.length ? data.diets.join(', ') : 'None';
        document.getElementById('occasions').textContent = data.occasions.length ? data.occasions.join(', ') : 'None';
        document.getElementById('instructions').textContent = data.instructions || 'None';
        document.getElementById('weightWatcherSmartPoints').textContent = data.weightWatcherSmartPoints || 'N/A';

        data.extendedIngredients.forEach(ingredient => {
            // Create a container for each ingredient
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add('ingredient-item');

            // Construct the text for this ingredient
            // Example: "1 tbsp butter (grated)"
            let metaText = ingredient.meta.length ? ` (${ingredient.meta.join(', ')})` : '';
            let ingredientText = `${ingredient.measures.us.amount} ${ingredient.measures.us.unitShort} ${ingredient.name}${metaText}`;

            ingredientDiv.textContent = ingredientText;

            // Append to the container
            ingredientsWrapper.appendChild(ingredientDiv);
        });

        sourceUrl.setAttribute('href', data.sourceUrl);
        youtubeSearch.addEventListener('click', () => {
            youtubeSearch(data.title);
        })

        

}






// Call the function with the ID from URL
if (recipeId) {
  populateRecipePage(recipeId);
} else {
  // No ID passed, just show default recipe
  pageTitle.textContent = data.title;
  pageTitleTag.textContent = data.title;
  image.src = data.image;
  image.alt = data.title;
  servings.textContent = data.servings || 'N/A';;
  pricePerServing.textContent = "$" + data.pricePerServing  || 'N/A';;
  readyInMinutes.textContent = data.readyInMinutes || 'N/A';;
  cookingMinutes.textContent = data.cookingMinutes || 'N/A';;
  preparationMinutesEl.textContent = data.preparationMinutes || 'N/A';
  healthScoreEl.textContent = data.healthScore || 'N/A';
  spoontacularScoreEl.textContent = data.spoonacularScore + "%" || 'N/A';
  document.getElementById('creditsText').textContent = data.creditsText;
  document.getElementById('cheap').textContent = data.cheap;
  document.getElementById('dairyFree').textContent = data.dairyFree;
  document.getElementById('glutenFree').textContent = data.glutenFree;
  document.getElementById('ketogenic').textContent = data.ketogenic;
  document.getElementById('lowFodmap').textContent = data.lowFodmap;
  document.getElementById('sustainable').textContent = data.sustainable;
  document.getElementById('vegan').textContent = data.vegan;
  document.getElementById('vegetarian').textContent = data.vegetarian;
  document.getElementById('veryHealthy').textContent = data.veryHealthy;
  document.getElementById('veryPopular').textContent = data.veryPopular;
  document.getElementById('whole30').textContent = data.whole30;
  document.getElementById('gaps').textContent = data.gaps;
  document.getElementById('cuisines').textContent = data.cuisines.length ? data.cuisines.join(', ') : 'None';
  document.getElementById('diets').textContent = data.diets.length ? data.diets.join(', ') : 'None';
  document.getElementById('occasions').textContent = data.occasions.length ? data.occasions.join(', ') : 'None';
  document.getElementById('instructions').textContent = data.instructions || 'None';
  document.getElementById('weightWatcherSmartPoints').textContent = data.weightWatcherSmartPoints || 'N/A';
  

  data.extendedIngredients.forEach(ingredient => {
    // Create a container for each ingredient
    const ingredientDiv = document.createElement('div');
    ingredientDiv.classList.add('ingredient-item');

    // Construct the text for this ingredient
    // Example: "1 tbsp butter (grated)"
    let metaText = ingredient.meta.length ? ` (${ingredient.meta.join(', ')})` : '';
    let ingredientText = `${ingredient.measures.us.amount} ${ingredient.measures.us.unitShort} ${ingredient.name}${metaText}`;

    ingredientDiv.textContent = ingredientText;

    // Append to the container
    ingredientsWrapper.appendChild(ingredientDiv);


    });


    sourceUrl.setAttribute('href', data.sourceUrl);
    youtubeSearch.addEventListener('click', () => {
            youtubeVideoSearch(data.title);
        })
}