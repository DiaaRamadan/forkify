import axios from 'axios';
import { key } from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}&includeNutrition=true}`);
            this.title = res.data.title;
            this.image = res.data.image;
            this.author = res.data.sourceName;
            this.url = res.data.sourceUrl;
            this.ingredients = res.data.extendedIngredients;
        }catch(error){
            console.log(error)
        }
    }

    calcTime(){
        const numIng =  this.ingredients.length;
        const period = Math.ceil(numIng / 3);
        this.time = period * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    updateServings(type){

        // servings
        const newServings = type === 'desc' ? this.servings - 1 : this.servings + 1; 
        
        // ingred
        this.ingredients.forEach(item => {
            item.amount *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}