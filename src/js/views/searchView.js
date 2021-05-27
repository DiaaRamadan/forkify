import { element, elementStrings } from './base';

// get the search input value
export const getInput = () => element.searchField.value;

export const clearInput = ( )=> {
    element.searchField.value = '';
};

export const clearResultList = () => {
    element.searchElementList.innerHTML = '';
    element.searchResPages.innerHTML = '';

}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []; 
    if(title.length > limit){
        
        title.split(" ").reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')}...`;
    }
    return title;
};

const renderRecipe = recipe => {

    const markup = `
    <li>
        <a class="results__link" href="#${recipe.id}">
            <figure class="results__fig">
                <img src="${recipe.image}" alt="Test}}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.dishTypes.toString()}</p>
            </div>
        </a>
    </li>
    `;

    element.searchElementList.insertAdjacentHTML('beforeend' ,markup);
};

// type prev or next
const createButton = (page = 1, type) => `

    <button class='btn-inline results__btn--${type}' data-goto = '${type === 'prev' ? page - 1 : page + 1}'>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle- ${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
   
    </button>

`;


const renderButtons = (page = 1, numOfResults, resPerPage) => {

    const numOfPages = Math.ceil(numOfResults / resPerPage);
    let button;
    if(page ===1 && numOfPages > 1){
        // button to next page
        button = createButton(page, 'next');
          
    }else if(page < numOfPages){
        // both buttons
        button = 
        `
            ${createButton(page, 'next')}
            ${createButton(page, 'prev')}
        `;
    }else if(page === numOfPages && numOfPages > 1){
        // button to prvious page
        button = createButton(page, 'prev');
    }
    
    element.searchResPages.insertAdjacentHTML('afterbegin', button);


};


// perpare the UI to render
export const renderResults = (recipes, page = 1, resultPerPage = 10) => {

    // render current page
    const start = (page - 1) * resultPerPage;
    const end = page * resultPerPage; 
    recipes.slice(start, end).forEach(recipe => renderRecipe(recipe));

    // render pagination buttons
    renderButtons(page, recipes.length, resultPerPage);
};
