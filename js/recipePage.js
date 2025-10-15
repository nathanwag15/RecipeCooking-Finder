
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


const apiKey = "144f4b41496b496f80a1fc74b5b9e0a5";


// Populate all the data on the detailed recipe page

async function populateRecipePage(id) {
  let data;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
    );
    if (!response.ok) throw new Error("API request failed");
    data = await response.json();
  } catch (error) {
    console.warn("Falling back to default recipe:", error);
    data = defaultRecipe; // fallback
  }
  console.log(data);
  renderRecipe(data);
}

function renderRecipe(data) {
  pageTitle.textContent = data.title;
  pageTitleTag.textContent = data.title;
  image.src = data.image;
  image.alt = data.title;
  servings.textContent = data.servings || "N/A";
  pricePerServing.textContent = "$" + (data.pricePerServing || "N/A");
  readyInMinutes.textContent = data.readyInMinutes || "N/A";
  cookingMinutes.textContent = data.cookingMinutes || "N/A";
  preparationMinutesEl.textContent = data.preparationMinutes || "N/A";
  healthScoreEl.textContent = data.healthScore || "N/A";
  spoontacularScoreEl.textContent = data.spoonacularScore || "N/A";

  document.getElementById("creditsText").textContent = data.creditsText || "";
  document.getElementById("cheap").textContent = data.cheap;
  document.getElementById("dairyFree").textContent = data.dairyFree;
  document.getElementById("glutenFree").textContent = data.glutenFree;
  document.getElementById("vegan").textContent = data.vegan;
  document.getElementById("vegetarian").textContent = data.vegetarian;
  document.getElementById("veryHealthy").textContent = data.veryHealthy;
  document.getElementById("veryPopular").textContent = data.veryPopular;

  ingredientsWrapper.innerHTML = ""; // clear any existing items
  if (data.extendedIngredients) {
    data.extendedIngredients.forEach((ingredient) => {
      const div = document.createElement("div");
      div.classList.add("ingredient-item");
      const metaText = ingredient.meta.length
        ? ` (${ingredient.meta.join(", ")})`
        : "";
      div.textContent = `${ingredient.measures.us.amount} ${ingredient.measures.us.unitShort} ${ingredient.name}${metaText}`;
      ingredientsWrapper.appendChild(div);
    });
  }

  sourceUrl.href = data.sourceUrl || "#";

  youtubeSearch.onclick = () => youtubeVideoSearch(data.title);
}






// Call the function with the ID from URL
if (recipeId) {
  populateRecipePage(recipeId);
} else {
  // No recipe ID, just load default recipe
  renderRecipe(defaultRecipe);
}