import "core-js/stable";
import "regenerator-runtime/runtime";
import Search from './modules/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/ListView';
import { element, renderLoader, clearLoader } from './views/base';
import Recipe from "./modules/Recipe";
import List from './modules/List';
import Likes from "./modules/Likes";
/** Global state of the app 
 * - search object
 * - current object
 * -Shopping list object
 * -liked recipes
 */

 const state = {};
 window.state = state;

/**
 * search controller
 */

const ctrlSearch = async () => {
    // 1) get the query from the view
    const tags = searchView.getInput().trim() ? searchView.getInput() : "vegetarian,dessert";
    const num = 100;
    if(tags && num){
        // 2) new search object & add to the state
        state.search = new Search(num, tags);

        // 3) prepare the UI for results
        searchView.clearInput();
        searchView.clearResultList();
        renderLoader(element.searchRes);
        try{
            // 4) search for recipes
            await state.search.getResults();
            
            // 5) render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);

        }catch(error){
            alert('Error load recipes will search :)');
            clearLoader();
        }
    }

};

 element.searchForm.addEventListener('submit', e => {

    e.preventDefault();
    ctrlSearch();
 });

 element.searchResPages.addEventListener('click', e => {
     const btn = e.target.closest('.btn-inline');
     if(btn){
         const goToPage = parseInt(btn.dataset.goto);
         searchView.clearResultList();
         searchView.renderResults(state.search.result, goToPage);
     }
 });

/**
* Recipe Controller
*/

const ctrlRecipe = async () => {

    // Get id from url
    const id = window.location.hash.replace('#', '');
    if(id){
        // 1) prepare UI 
        recipeView.clearRecipe();
        renderLoader(element.recipe);
        // 2) create new recipe object
        state.recipe = new Recipe(id);
        

        try{
            // 3) get recipe data
            await state.recipe.getRecipe();
            
            // 4) calc servings & time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 5)render recipe
            recipeView.renderRecipe(state.recipe);
            clearLoader();
        }catch(error){
            console.log(error);
            alert("Error load recipe :)");
        }
    }
};

/**
* List Controller
*/
const ctrlList = () => {

    // create new list
    if(!state.list) state.list = new List();

    // add item to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.amount, el.unit, el.name);
        listView.renderItem(item);
    });
};

/**
 * Likes Controller
 */

const ctrlLikes = () => {
    // create like obj
    if(state.likes) state.likes = new Likes();
    const currID = this.recipe.id;
    //
};

window.addEventListener('hashchange', ctrlRecipe);
window.addEventListener('load', ctrlRecipe);

['hashchange', 'load'].forEach(e => {window.addEventListener(e, ctrlRecipe)});

// delete & update shoping list
element.shoping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        // delete from state
        state.list.deleteItem(id);
        //delete from UI
        listView.deleteItem(id);
    }else if(e.target.matches('.shopping__count')){
        // update
        const val = parseFloat(e.target.value, 10);
        // update count
        state.list.updateCount(id, val);
    }else if(e.target.matches('.recipe__love , .recipe__love *')){
        // like ctrl
        ctrlLikes();
    }
});

element.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-descrease , .btn-descrease *')){ // see here matchs
        if(state.recipe.servings > 1){
            state.recipe.updateServings('desc');
            recipeView.updateServingIng(state.recipe);
        }
    }else if(e.target.matches('.btn-increase , .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingIng(state.recipe);
    }else if(e.target.matches('.recipe__btn-add, recipe__btn-add *')){
        ctrlList();
    }
});
