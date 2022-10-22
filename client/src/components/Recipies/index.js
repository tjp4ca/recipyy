import React from 'react';

const Recipies = () => {

    const recipeList = [
        {
        
            "recipeText" : "Chicken pot pie", 
            "username" : "Michael", 
            "description" : "A delicious chicken pie made from scratch with carrots, peas, and celery in a pre-made crust. Add thyme and poultry seasoning for more flavor.",
            "directions": "Preheat the oven to 425 degrees F (220 degrees C.). Combine chicken, carrots, peas, and celery in a saucepan; add water to cover and bring to a boil. Boil for 15 minutes, then remove from the heat and drain. While the chicken is cooking, melt butter in another saucepan over medium heat. Add onion and cook until soft and translucent, 5 to 7 minutes. Stir in flour, salt, pepper, and celery seed. Slowly stir in chicken broth and milk. Reduce heat to medium-low and simmer until thick, 5 to 10 minutes. Remove from heat and set aside. Place chicken and vegetables in the bottom pie crust. Pour hot liquid mixture over top. Cover with top crust, seal the edges, and cut away any excess dough. Make several small slits in the top crust to allow steam to escape. Bake in the preheated oven until pastry is golden brown and filling is bubbly, 30 to 35 minutes. Cool for 10 minutes before serving.",
            "ingredients" : [ 
                {
                    "ingredientBody" : "Chicken, carrots, peas, celery, butter, onion, flour, salt & pepper, chicken broth, milk, unbaked pie crust"
                } 
            ] 
        },
        {
        
            "recipeText" : "Burger", 
            "username" : "Michael", 
            "description" : "A delicious chicken pie made from scratch with carrots, peas, and celery in a pre-made crust. Add thyme and poultry seasoning for more flavor.",
            "directions": "Preheat the oven to 425 degrees F (220 degrees C.). Combine chicken, carrots, peas, and celery in a saucepan; add water to cover and bring to a boil. Boil for 15 minutes, then remove from the heat and drain. While the chicken is cooking, melt butter in another saucepan over medium heat. Add onion and cook until soft and translucent, 5 to 7 minutes. Stir in flour, salt, pepper, and celery seed. Slowly stir in chicken broth and milk. Reduce heat to medium-low and simmer until thick, 5 to 10 minutes. Remove from heat and set aside. Place chicken and vegetables in the bottom pie crust. Pour hot liquid mixture over top. Cover with top crust, seal the edges, and cut away any excess dough. Make several small slits in the top crust to allow steam to escape. Bake in the preheated oven until pastry is golden brown and filling is bubbly, 30 to 35 minutes. Cool for 10 minutes before serving.",
            "ingredients" : [ 
                {
                    "ingredientBody" : "Chicken, carrots, peas, celery, butter, onion, flour, salt & pepper, chicken broth, milk, unbaked pie crust"
                } 
            ] 
        },        
        {
        
            "recipeText" : "Pizza", 
            "username" : "Michael", 
            "description" : "A delicious chicken pie made from scratch with carrots, peas, and celery in a pre-made crust. Add thyme and poultry seasoning for more flavor.",
            "directions": "Preheat the oven to 425 degrees F (220 degrees C.). Combine chicken, carrots, peas, and celery in a saucepan; add water to cover and bring to a boil. Boil for 15 minutes, then remove from the heat and drain. While the chicken is cooking, melt butter in another saucepan over medium heat. Add onion and cook until soft and translucent, 5 to 7 minutes. Stir in flour, salt, pepper, and celery seed. Slowly stir in chicken broth and milk. Reduce heat to medium-low and simmer until thick, 5 to 10 minutes. Remove from heat and set aside. Place chicken and vegetables in the bottom pie crust. Pour hot liquid mixture over top. Cover with top crust, seal the edges, and cut away any excess dough. Make several small slits in the top crust to allow steam to escape. Bake in the preheated oven until pastry is golden brown and filling is bubbly, 30 to 35 minutes. Cool for 10 minutes before serving.",
            "ingredients" : [ 
                {
                    "ingredientBody" : "Chicken, carrots, peas, celery, butter, onion, flour, salt & pepper, chicken broth, milk, unbaked pie crust"
                } 
            ] 
        }
    ]

    return (
        <div className='text-white'>
            {recipeList.map((item) => (
            <li style={{border: '1px solid red'}}>
                <h3>{item.recipeText}</h3>
                <p>{item.username}</p>
                <p>{item.description}</p>
                <p>{item.directions}</p>
                {item.ingredients.ingredientBody}
                <button type='submit'>Edit</button>
            </li>
            ))}
        </div>
    );
};

export default Recipies;