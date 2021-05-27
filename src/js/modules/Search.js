import axios from 'axios';
import { key } from '../config';

export default class Search{

    constructor(number, tags){
        this.query = Search.perpareQuery(number, tags);
    }

    async getResults(){
        try{
            const res = await axios(`https://api.spoonacular.com/recipes/random?apiKey=${key}&${this.query}`);
            this.result = res.data.recipes;
        }catch(error){
            alert(error);
        }
    }

    static perpareQuery(number=10, tags='vegetarian,dessert'){
        const query =`number=${number}&tags=${tags}`;
        return query;
    }
}
