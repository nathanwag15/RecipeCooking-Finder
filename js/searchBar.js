import { displayRecipes } from './recipeList.js';
import { defaultRecipeList } from './defaultRecipes.js';

const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const itemsListDisplay = document.getElementById('items');
const search = document.getElementById('search');
const recipesContainer = document.getElementById('recipesContainer');
const number = document.getElementById('number');
const clearList = document.getElementById('clearList');
const moreInfo = document.getElementById('moreInfo');

let itemsList = [];

const key = 'itemsList';
localStorage.setItem(key, JSON.stringify(itemsList));



const apiKey = "144f4b41496b496f80a1fc74b5b9e0a5";



function displayItemList() {
    itemsListDisplay.innerHTML = '';
    itemsList = JSON.parse(localStorage.getItem(key)) || [];

    itemsList.forEach(item => {        
        const li = document.createElement('li');
        li.textContent = item;
        itemsListDisplay.appendChild(li);

    });
    
    

}

window.addEventListener('load', () => {
  console.log('✅ Page fully loaded');
  console.log(itemsList);
  displayItemList();
});

// Function to add items to the list of requested ingredients
addBtn.addEventListener('click', () => {
    const newItemText = input.value.trim();
    
    if (newItemText != "") {
        // Add items to the ul on the search page
        itemsList = JSON.parse(localStorage.getItem(key)) || [];
        itemsList.push(newItemText);
        console.log(JSON.parse(localStorage.getItem(key)));
        console.log(itemsList);
        localStorage.setItem(key, JSON.stringify(itemsList));
        displayItemList();
        itemsList = [];
        input.value = '';
        input.focus;
        // Add items to the list for the search function 
        itemsList.push(newItemText.toLowerCase());

        localStorage.setItem('itemsList', JSON.stringify(itemsList));

    }
})

clearList.addEventListener('click', () => {
    itemsList = [];
    itemsListDisplay.innerHTML = '';

})

search.addEventListener('click', async() => {
    // create a incredients variable for our string version of our itemsList Array
    let ingredients = ''; 
    // clear the data in the recipesContainer
    recipesContainer.innerHTML='';

    let data = [];
    // verify that there are items in the itemsList
    if (itemsList.length == 0) {
        alert("Please enter ingredients to search by")
    }

    // if only one item then only add that one item to ingredients

    if (itemsList.length != 0 ) {
        ingredients = itemsList[0];
        let count = 0
        itemsList.forEach(function(item) {
            count ++
            console.log(count);
            ingredients = ingredients + ",+" + item;
        });

    }

    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number.value}&apiKey=${apiKey}`
        );

        if (!response.ok) throw new Error("API request failed");

        data = await response.json();
        console.log ('Recipes', data);
       
        
    } catch (error) {
        console.error('Error fetching recipes:', error);
        // fallback to default data
        data = defaultRecipeList;
    }

    // Pass the data to modular display function
    displayRecipes(data, recipesContainer);

    
})

// 144f4b41496b496f80a1fc74b5b9e0a5