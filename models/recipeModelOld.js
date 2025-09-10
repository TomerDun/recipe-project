export let allRecipes = [
    {
        id: "1",
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        ingredients: [
            "200g spaghetti",
            "100g pancetta",
            "2 large eggs",
            "50g grated parmesan",
            "Black pepper",
            "Salt"
        ],
        instructions: [
            "Cook spaghetti in salted boiling water.",
            "Fry pancetta until crispy.",
            "Beat eggs and mix with parmesan.",
            "Drain pasta and combine with pancetta.",
            "Remove from heat, add egg mixture, and stir quickly.",
            "Season with black pepper and serve."
        ],
        cookingTime: 25,
        servings: 2,
        difficulty: "easy",
        rating: 4.7,
        createdAt: "2024-06-01T12:00:00.000Z"
    },
    {
        id: "2",
        title: "Chicken Tikka Masala",
        description: "Tender chicken pieces in a creamy spiced tomato sauce.",
        ingredients: [
            "500g chicken breast",
            "150g yogurt",
            "2 tbsp tikka masala paste",
            "1 onion",
            "400g chopped tomatoes",
            "100ml cream",
            "2 tbsp oil",
            "Salt"
        ],
        instructions: [
            "Marinate chicken in yogurt and tikka masala paste for 1 hour.",
            "Fry onion until golden.",
            "Add marinated chicken and cook until browned.",
            "Pour in chopped tomatoes and simmer for 15 minutes.",
            "Stir in cream and cook for 5 more minutes.",
            "Serve with rice or naan."
        ],
        cookingTime: 40,
        servings: 4,
        difficulty: "medium",
        rating: 4.6,
        createdAt: "2024-06-02T09:30:00.000Z"
    },
    {
        id: "3",
        title: "Vegetable Stir Fry",
        description: "Quick and healthy stir-fried vegetables with soy sauce.",
        ingredients: [
            "1 red bell pepper",
            "1 broccoli head",
            "2 carrots",
            "100g snow peas",
            "2 tbsp soy sauce",
            "1 tbsp sesame oil",
            "1 garlic clove"
        ],
        instructions: [
            "Chop all vegetables into bite-sized pieces.",
            "Heat sesame oil in a wok.",
            "Add garlic and fry for 30 seconds.",
            "Add vegetables and stir fry for 5-7 minutes.",
            "Pour in soy sauce and cook for 2 more minutes.",
            "Serve hot."
        ],
        cookingTime: 15,
        servings: 3,
        difficulty: "easy",
        rating: 4.3,
        createdAt: "2024-06-03T18:45:00.000Z"
    },
    {
        id: "4",
        title: "Beef Stew",
        description: "Hearty beef stew with potatoes, carrots, and onions.",
        ingredients: [
            "500g beef chuck",
            "2 potatoes",
            "2 carrots",
            "1 onion",
            "2 cups beef broth",
            "2 tbsp tomato paste",
            "1 tbsp flour",
            "Salt and pepper"
        ],
        instructions: [
            "Cut beef into cubes and coat with flour.",
            "Brown beef in a pot.",
            "Add chopped onion, carrots, and potatoes.",
            "Stir in tomato paste and beef broth.",
            "Simmer for 1.5 hours until beef is tender.",
            "Season with salt and pepper."
        ],
        cookingTime: 120,
        servings: 4,
        difficulty: "medium",
        rating: 4.8,
        createdAt: "2024-06-04T14:20:00.000Z"
    },
    {
        id: "5",
        title: "Chocolate Chip Cookies",
        description: "Chewy cookies loaded with chocolate chips.",
        ingredients: [
            "200g flour",
            "100g sugar",
            "100g brown sugar",
            "150g butter",
            "1 egg",
            "1 tsp vanilla extract",
            "150g chocolate chips",
            "1/2 tsp baking soda",
            "Pinch of salt"
        ],
        instructions: [
            "Preheat oven to 180°C.",
            "Cream butter and sugars together.",
            "Add egg and vanilla, mix well.",
            "Stir in flour, baking soda, and salt.",
            "Fold in chocolate chips.",
            "Scoop dough onto baking tray and bake for 10-12 minutes."
        ],
        cookingTime: 25,
        servings: 12,
        difficulty: "easy",
        rating: 4.9,
        createdAt: "2024-06-05T16:10:00.000Z"
    }
]

export function fetchRecipes() {
    return allRecipes;
}

export function setRecipes(newRecipes) {

    allRecipes = newRecipes;

}

export function createRecipe(data) {
    const newRecipe = { ...data, id: generateId() }
    allRecipes.push(newRecipe);
}


function generateId() {
    const maxId = Math.max(allRecipes.map(r => r.id));
    return maxId + 1;
}