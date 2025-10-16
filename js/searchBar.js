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

if (!localStorage.getItem(key)) {
  localStorage.setItem(key, JSON.stringify(itemsList));
}



const apiKey = "144f4b41496b496f80a1fc74b5b9e0a5";



function displayItemList() {
    itemsListDisplay.innerHTML = '';
    itemsList = JSON.parse(localStorage.getItem(key)) || [];

    itemsList.forEach(item => {        
        const li = document.createElement('li');
        li.textContent = item;
        itemsListDisplay.appendChild(li);

    });
    
    

};

window.addEventListener('load', () => {
  displayItemList();
});

// Function to add items to the list of requested ingredients
addBtn.addEventListener('click', () => {
    const newItemText = input.value.trim();
    
    if (newItemText != "") {
        // Add items to the ul on the search page
        itemsList = JSON.parse(localStorage.getItem(key)) || [];
        itemsList.push(newItemText.toLowerCase());
        
        console.log(itemsList);
        localStorage.setItem(key, JSON.stringify(itemsList));
        console.log("LocalStorage:" + JSON.parse(localStorage.getItem(key)));
        displayItemList();
        itemsList = [];
        input.value = '';
        input.focus;
    }
})

clearList.addEventListener('click', () => {    
    itemsList = [];
    localStorage.setItem(key, JSON.stringify(itemsList));
    itemsListDisplay.innerHTML = '';

})

search.addEventListener('click', async() => {
    // create a incredients variable for our string version of our itemsList Array
    let ingredients = ''; 
    // clear the data in the recipesContainer
    recipesContainer.innerHTML='';
    itemsList = JSON.parse(localStorage.getItem(key)) || [];

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