// script.js
document.addEventListener('DOMContentLoaded', () => {
  const ingredientInput = document.getElementById('ingredient-input');
  const addIngredientBtn = document.getElementById('add-ingredient');
  const selectedIngredients = document.getElementById('selected-ingredients');
  const searchRecipesBtn = document.getElementById('search-recipes');
  const recipeResults = document.getElementById('recipe-results');

  const ingredients = new Set();

  addIngredientBtn.addEventListener('click', () => {
      const ingredient = ingredientInput.value.trim().toLowerCase();
      if (ingredient && !ingredients.has(ingredient)) {
          ingredients.add(ingredient);
          updateIngredientList();
          ingredientInput.value = '';
      }
  });

  function updateIngredientList() {
    selectedIngredients.innerHTML = '';
    const ol = document.createElement('ol');
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        
        // Create the trash icon
        const removeIcon = document.createElement('i');
        removeIcon.className = 'fa-solid fa-trash';
        removeIcon.style.color = '#7F2121';
        removeIcon.style.marginLeft = '10px';
        removeIcon.style.cursor = 'pointer'; // Change cursor to pointer
        removeIcon.addEventListener('click', () => {
            ingredients.delete(ingredient);
            updateIngredientList();
        });
        
        li.appendChild(removeIcon); // Append the icon to the list item
        ol.appendChild(li);
    });
    selectedIngredients.appendChild(ol);
}

  searchRecipesBtn.addEventListener('click', () => {
      const recipes = searchRecipes(Array.from(ingredients));
      displayRecipes(recipes);
  });

  function searchRecipes(ingredients) {
      // Mock database of recipes
      const recipeDatabase = [
          { 
              id: 1,
              name: 'Pav Bhaji', 
              ingredients: ['mixed vegetables', 'onion', 'tomato', 'ginger-garlic paste', 'green chilies', 'butter', 'pav bhaji masala', 'cilantro', 'lemon', 'pav'],
              instructions: `

              1. Prepare the Vegetables: Boil the mixed vegetables (like potatoes, carrots, peas, and bell peppers) until soft. Drain and mash them together.

              2. Sauté Aromatics: In a large pan, heat butter over medium heat. Add the chopped onions and sauté until golden brown. Then add the ginger-garlic paste and green chilies, and sauté for another minute.

              3. Add Tomatoes: Stir in the chopped tomatoes and cook until they become soft and mushy.

              4. Mix in Masala: Add the pav bhaji masala and mix well. Cook for a couple of minutes until the spices are fragrant.

              5. Combine Vegetables: Add the mashed mixed vegetables to the pan. Mix everything together, adding water as needed to achieve a desired consistency. Let it cook for about 10-15 minutes, stirring occasionally.

              6. Garnish: Once cooked, garnish with chopped cilantro and a squeeze of lemon juice.

              7. Prepare Pav: In another pan, toast the pav (bread rolls) with a little butter until golden brown.

              8. Serve: Serve the bhaji hot with the toasted pav on the side, along with extra lemon wedges and chopped onions if desired.              `
          },
          { 
            id: 2,
            name: 'Masala Pav', 
            ingredients: [
                'pav',
                'butter',
                'onion',
                'tomato',
                'green bell pepper',
                'ginger-garlic paste',
                'green chilies',
                'masala pav masala',
                'cilantro',
                'lemon',
                'salt'
            ],
            instructions: `
        
            1. Prepare the Vegetables: In a pan, heat butter over medium heat. Add chopped onions and sauté until translucent.
        
            2. Add Aromatics: Stir in the ginger-garlic paste and green chilies. Sauté for a minute until fragrant.
        
            3. Add Tomatoes and Peppers: Add the chopped tomatoes and bell pepper. Cook until the tomatoes are soft.
        
            4. Mix in Masala: Add masala pav masala and salt to taste. Mix well and cook for a couple of minutes.
        
            5. Toast the Pav: Slice the pav in half and apply butter on the insides. Toast them in the same pan until golden brown.
        
            6. Serve: Place the masala mixture on top of the toasted pav and garnish with chopped cilantro and a squeeze of lemon juice. Serve hot.
            `
        },
        { 
            id: 3,
            name: 'Misal Pav', 
            ingredients: [
                'mixed sprouts',
                'onion',
                'tomato',
                'ginger-garlic paste',
                'green chilies',
                'misal masala',
                'oil',
                'coriander',
                'lemon',
                'pav',
                'salt to taste'
            ],
            instructions: `
        
            1. Prepare the Sprouts: Boil the mixed sprouts until cooked but still crunchy. Drain and set aside.
        
            2. Sauté Aromatics: In a pan, heat oil over medium heat. Add chopped onions and sauté until golden brown.
        
            3. Add Ginger and Chilies: Stir in the ginger-garlic paste and green chilies. Sauté for a minute until fragrant.
        
            4. Add Tomatoes: Add chopped tomatoes and cook until they soften.
        
            5. Mix in Masala: Add misal masala and salt to taste. Mix well and cook for a couple of minutes.
        
            6. Combine Sprouts: Add the boiled sprouts to the mixture and stir well. Let it simmer for 5-7 minutes.
        
            7. Serve: Garnish with chopped coriander and a squeeze of lemon juice. Serve hot with pav on the side.
            `
        },
                  
        { 
          id: 4,
          name: 'Dal', 
          ingredients: [
              'yellow lentils (toor dal or moong dal)',
              'onion',
              'tomato',
              'ginger-garlic paste',
              'green chilies',
              'turmeric powder',
              'cumin seeds',
              'coriander powder',
              'salt to taste',
              'oil or ghee',
              'cilantro (for garnish)',
              'lemon (for garnish)'
          ],
          instructions: `
      
          1. Cook the Lentils: Rinse the lentils and boil them with water, turmeric, and salt until soft. Mash slightly and set aside.
      
          2. Sauté Aromatics: In a pan, heat oil or ghee. Add cumin seeds and let them splutter. Add chopped onions and sauté until golden.
      
          3. Add Ginger and Chilies: Stir in the ginger-garlic paste and green chilies. Sauté for a minute.
      
          4. Add Tomatoes: Add chopped tomatoes and cook until they soften.
      
          5. Mix in Spices: Add coriander powder and the boiled lentils. Mix well and simmer for 5-10 minutes.
      
          6. Serve: Garnish with chopped cilantro and a squeeze of lemon juice. Serve hot with rice or roti.
          `
      },
      { 
        id: 5,
        name: 'Potato Curry (Aloo Curry)', 
        ingredients: [
            'potato',
            'onion',
            'tomato',
            'ginger-garlic paste',
            'turmeric powder',
            'cumin seeds',
            'coriander powder',
            'garam masala',
            'salt',
            'oil',
            'cilantro'
        ],
        instructions: `

        1. Heat oil in a pan, add cumin seeds, and let them splutter.
        2. Add chopped onions and sauté until golden brown.
        3. Stir in ginger-garlic paste, then add tomatoes and cook until soft.
        4. Add turmeric, coriander powder, and salt, and mix well.
        5. Add cubed potatoes and enough water to cover. Cook until potatoes are tender.
        6. Sprinkle garam masala, garnish with cilantro, and serve hot.
        `
    },
    {
      id: 6,
      name: 'Aloo Paratha', 
      ingredients:[ 
          'whole wheat flour',
          'potato',
          'onion',
          'green chili',
          'ginger',
          'coriander leaves',
          'cumin seeds',
          'salt',
          'oil or ghee',
          'water',
      ],    
      instructions: `
  
      1. In a mixing bowl, combine whole wheat flour and a pinch of salt. Gradually add water to form a soft dough. Cover and let it rest for 20-30 minutes.
      2. In another bowl, mix the mashed potatoes, chopped onion, green chili, ginger, coriander leaves, cumin seeds, and salt until well combined.
      3. Divide the dough into equal balls. Take one ball and roll it out into a small circle.
      4. Place a spoonful of the potato filling in the center, fold the edges over, and pinch to seal.
      5. Gently roll the stuffed dough ball into a flat paratha, dusting with flour to prevent sticking.
      6. Heat a tawa or skillet over medium heat. Cook the paratha on both sides, adding oil or ghee until golden brown and crispy.
      7. Serve hot with yogurt, pickles, or your favorite chutney.
      `
  
    },
    { 
      id: 7,
      name: 'Poha', 
      ingredients: [
          'poha',
          'potato',
          'onion',
          'green chili',
          'ginger',
          'mustard seeds',
          'cumin seeds',
          'turmeric powder',
          'salt',
          'oil',
          'coriander leaves',
          'lemon juice',
          'peanuts'
      ],
      instructions: `
  
      1. Rinse the flattened rice (poha) in water and drain. Set aside.
      2. Heat oil in a pan, add mustard seeds and cumin seeds, and let them splutter.
      3. Add diced potatoes and cook until they are soft.
      4. Add chopped onions, green chili, and ginger, and sauté until the onions are translucent.
      5. Stir in turmeric powder and salt, mixing well.
      6. Add the rinsed poha and gently mix to combine, cooking for a few minutes until heated through.
      7. Remove from heat, garnish with chopped coriander leaves, and drizzle with lemon juice.
      8. Optionally, add roasted peanuts for extra crunch before serving.
      `
  },
  { 
    id: 8,
    name: 'Bhindi Ki Sabzi', 
    ingredients: [
        'ladyfinger',
        'onion',
        'tomato',
        'ginger-garlic paste',
        'turmeric powder',
        'cumin seeds',
        'coriander powder',
        'red chili powder',
        'salt',
        'oil',
        'coriander leaves'
    ],
    instructions: `

    1. Heat oil in a pan and add cumin seeds.
    2. Add sliced onions and sauté until golden brown.
    3. Stir in ginger-garlic paste and cook for a minute.
    4. Add chopped tomatoes, turmeric, coriander powder, red chili powder, and salt. Cook until tomatoes are soft.
    5. Add chopped bhindi and mix well. Cook covered until tender, stirring occasionally.
    6. Garnish with chopped coriander leaves and serve hot.
    `
},
{ 
  id: 9,
  name: 'Paneer Bhurji', 
  ingredients: [
      'paneer',
      'onion',
      'tomato',
      'green chili',
      'ginger',
      'turmeric powder',
      'cumin seeds',
      'salt',
      'oil',
      'coriander leaves'
  ],
  instructions: `

  1. Heat oil in a pan and add cumin seeds.
  2. Add chopped onions and sauté until translucent.
  3. Stir in green chili and ginger, cooking for a minute.
  4. Add chopped tomatoes, turmeric, and salt, cooking until tomatoes are soft.
  5. Add crumbled paneer and mix well. Cook for a few minutes.
  6. Garnish with chopped coriander leaves and serve hot with bread or paratha.
  `
},
{ 
  id: 10,
  name: 'Paneer Butter Masala', 
  ingredients: [
      'paneer',
      'butter',
      'onion',
      'tomato',
      'ginger-garlic paste',
      'cream',
      'kasuri methi',
      'turmeric powder',
      'red chili powder',
      'coriander powder',
      'salt',
      'cumin seeds',
      'cilantro'
  ],
  instructions: `

  1. Heat butter in a pan and add cumin seeds.
  2. Add chopped onions and sauté until golden brown.
  3. Stir in ginger-garlic paste and cook for a minute.
  4. Add tomato puree, turmeric, red chili powder, coriander powder, and salt. Cook until oil separates.
  5. Add paneer cubes and kasuri methi, mixing well.
  6. Stir in cream and cook for a few minutes. 
  7. Garnish with cilantro and serve hot with naan or rice.
  `
},
{ 
  id: 11,
  name: 'Aloo Gobi', 
  ingredients: [
      'potato',
      'cauliflower',
      'onion',
      'ginger-garlic paste',
      'turmeric powder',
      'cumin seeds',
      'coriander powder',
      'red chili powder',
      'salt',
      'oil',
      'cilantro'
  ],
  instructions: `

  1. Heat oil in a pan and add cumin seeds.
  2. Add sliced onions and sauté until golden brown.
  3. Stir in ginger-garlic paste and cook for a minute.
  4. Add cubed potatoes, cauliflower, turmeric, coriander powder, red chili powder, and salt. Mix well.
  5. Add a little water, cover, and cook until vegetables are tender.
  6. Garnish with cilantro and serve hot with roti or rice.
  `
},
{ 
  id: 13,
  name: 'Rajma', 
  ingredients: [
      'kidney beans',
      'onion',
      'tomato',
      'ginger-garlic paste',
      'turmeric powder',
      'cumin seeds',
      'coriander powder',
      'red chili powder',
      'salt',
      'oil',
      'cilantro'
  ],
  instructions: `

  1. Heat oil in a pan and add cumin seeds.
  2. Add chopped onions and sauté until golden brown.
  3. Stir in ginger-garlic paste and cook for a minute.
  4. Add chopped tomatoes, turmeric, coriander powder, red chili powder, and salt. Cook until oil separates.
  5. Add cooked kidney beans along with some cooking liquid. Simmer for a few minutes.
  6. Garnish with cilantro and serve hot with rice or roti.
  `
},
{ 
  id: 14,
  name: 'Seyal Pav', 
  ingredients: [
      'pav',
      'onion',
      'tomato',
      'green chili',
      'ginger-garlic paste',
      'coriander powder',
      'cumin powder',
      'turmeric powder',
      'red chili powder',
      'salt',
      'oil',
      'cilantro',
      'lemon wedges'
  ],
  instructions: `

  1. Heat oil or butter in a pan. Add chopped onions and sauté until golden brown.
  2. Stir in ginger-garlic paste and green chili, cooking for a minute.
  3. Add chopped tomatoes, turmeric, coriander powder, cumin powder, red chili powder, and salt. Cook until tomatoes are soft.
  4. Mash the mixture slightly and add a little water to create a saucy consistency.
  5. Cut the pav in half and dip each half into the sauce, ensuring it's well coated.
  6. Toast the dipped pav in the same pan until golden brown on both sides.
  7. Serve hot, garnished with cilantro and lemon wedges on the side.
  `
},
{ 
  id: 15,
  name: 'Dal Pakwaan', 
  ingredients: [
      'chana dal',
      'onion',
      'green chili',
      'ginger-garlic paste',
      'turmeric powder',
      'cumin seeds',
      'coriander powder',
      'salt',
      'oil',
      'water',
      'pakwaan',
      'cilantro',
      'lemon'
  ],
  instructions: `

  1. Soak chana dal in water for a few hours, then drain.
  2. In a pot, add soaked dal, water, turmeric, and salt. Cook until the dal is soft.
  3. Heat oil in a separate pan, add cumin seeds, and let them splutter.
  4. Add chopped onions, green chili, and ginger-garlic paste. Sauté until onions are golden brown.
  5. Stir in coriander powder and cooked dal, mixing well. Adjust water for desired consistency.
  6. Simmer for a few minutes to allow flavors to meld.
  7. Serve hot with crispy pakwaan, garnished with cilantro and lemon wedges on the side.
  `
}  
  ];

      return recipeDatabase.filter(recipe => 
          ingredients.every(ing => recipe.ingredients.includes(ing))
      );
  }

  function displayRecipes(recipes) {
      recipeResults.innerHTML = '';
      if (recipes.length === 0) {
          recipeResults.textContent = 'No recipes found with the selected ingredients.';
      } else {
          const ol = document.createElement('ol');
          
          recipes.forEach(recipe => {
              const li = document.createElement('li');
              const a = document.createElement('a');
              a.textContent = recipe.name;
              a.href = `recipe.html?id=${recipe.id}`;
              a.addEventListener('click', (e) => {
                  e.preventDefault();
                  displayRecipeDetails(recipe);
              });
              li.appendChild(a);
              ol.appendChild(li);
          });
          recipeResults.appendChild(ol);
      }
  }

  function displayRecipeDetails(recipe) {
      const recipeDetailsHtml = `
          <h2>${recipe.name}</h2>
          <h3>Ingredients:</h3>
          <ul>
              ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
          <h3>Instructions:</h3>
          <div class="instructions">
              ${recipe.instructions.split('\n').map(instruction => `<p>${instruction.trim()}</p>`).join('')}
          </div>
          <button id="back-to-results">Back to Results</button>
      `;

      recipeResults.innerHTML = recipeDetailsHtml;

      document.getElementById('back-to-results').addEventListener('click', () => {
          const recipes = searchRecipes(Array.from(ingredients));
          displayRecipes(recipes);
      });
  }
});