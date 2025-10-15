// recipeCards.js

// Function to create and display recipe cards
export function displayRecipes(data, recipesContainer) {
  recipesContainer.innerHTML = ''; // clear previous results

  data.forEach(recipe => {
    // create recipe card div
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    // add recipe title
    const title = document.createElement('h3');
    title.textContent = recipe.title;
    recipeCard.appendChild(title);

    // add recipe image
    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.title;
    recipeCard.appendChild(image);

    // create a button to expand recipe info
    const button = document.createElement('button');
    button.textContent = 'More Info';

    button.addEventListener('click', () => {
       window.location.href = `recipe.html?id=${recipe.id}`;
    });

    recipeCard.appendChild(button);

    // append the recipe card to the container
    recipesContainer.appendChild(recipeCard);
  });
}