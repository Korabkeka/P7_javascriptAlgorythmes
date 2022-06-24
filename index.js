// algorythme using javascript array methods

// =========================================================================== //

const main = document.getElementById("recipes");
let filteredRecipes = [...recipes];
const filter = new RecipeFilter(filteredRecipes);

/**
 * 
 * @param {Array} data
 * @returns {void} 
 * creates and displays an article for each item in Array
 */
function displayRecipes(data){
    let $temp = document.createElement('div');

    data.forEach(recipe =>{
        //let item = new Recipe(recipe);
        let template = new RecipeTemplate(recipe);
        $temp.appendChild(template.element);
    });

    main.innerHTML = $temp.innerHTML;

}

displayRecipes(filteredRecipes);

const searchBar = document.getElementById('search-bar__input');
const searchIngredients = document.getElementById('ingredients');
const searchAppliance = document.getElementById("appliance");
const searchUstensils = document.getElementById('ustensils');
const ingredientKeywords = document.getElementById("ingredient-keywords");
const applianceKeyWords = document.getElementById("appliance-keywords");
const ustensilsKeyWords = document.getElementById("ustensils-keywords");
const keyWordThumbs = document.getElementById('keywords');

let _ingredients = [];
let secondaryIngredients = [];
let _appareils = [];
let secondaryAppareils = [];
let _ustensils = [];
let secondaryUstensils = [];
let allKeyWords;
let searchParams = {
    mainInput : searchBar.value,
    searchKeywords : []
};

class KeyWord{
    constructor(keyWord){
        this.keyWord = keyWord.toLowerCase();
    }
}

class Ingredient extends KeyWord{
    constructor(keyWord){
        super(keyWord)
        this.listElement = document.createElement('li');
        this.listElement.innerHTML = this.keyWord;
        this.listElement.classList.add("keywords");
        this.thumbElement = document.createElement('div');
        this.thumbElement.classList.add('ingredient-keyword-thumb');
        this.thumbElement.innerHTML = this.getThumbTemplate();
    }

    getThumbTemplate(){

        let template = `
            <span>${this.keyWord}<span>
            <span class="close">X</span>
        `

        return template;

    }

    displayThumbElement(){
        if(!keyWordThumbs.textContent.includes(this.keyWord)){
        keyWordThumbs.appendChild(this.thumbElement);
        this.thumbElement.querySelector('.close').addEventListener('click', ()=>{

            this.thumbElement.parentElement.removeChild(this.thumbElement);

            searchParams.searchKeywords = searchParams.searchKeywords.filter(el => el.keyWord != this.keyWord);

            process();

        });
    }
    }

}

class Appliance extends KeyWord{
    constructor(keyWord){
        super(keyWord)
        this.listElement = document.createElement('li');
        this.listElement.textContent = this.keyWord;
        this.listElement.classList.add("keywords");
        this.thumbElement = document.createElement('div');
        this.thumbElement.classList.add('appareil-keyword-thumb');
        this.thumbElement.innerHTML = this.getThumbTemplate();
    }

    getThumbTemplate(){

        let template = `
            <span>${this.keyWord}<span>
            <span class="close">X</span>
        `

        return template;

    }

    displayThumbElement(){

        if(!keyWordThumbs.textContent.includes(this.keyWord)){
        keyWordThumbs.appendChild(this.thumbElement);
        this.thumbElement.querySelector('.close').addEventListener('click', ()=>{

            this.thumbElement.parentElement.removeChild(this.thumbElement);

            searchParams.searchKeywords = searchParams.searchKeywords.filter(el => el.keyWord != this.keyWord);

            process();

        });
        }
    }

}

class Ustensil extends KeyWord{
    constructor(keyWord){
        super(keyWord)
        this.listElement = document.createElement('li');
        this.listElement.textContent = this.keyWord;
        this.listElement.classList.add("keywords");
        this.thumbElement = document.createElement('div');
        this.thumbElement.classList.add('ustensil-keyword-thumb');
        this.thumbElement.innerHTML = this.getThumbTemplate();
    }

    getThumbTemplate(){

        let template = `
                <span>${this.keyWord}<span>
                <span class="close">X</span>
        `

        return template;

    }

    displayThumbElement(){
        
        if(!keyWordThumbs.textContent.includes(this.keyWord)){
        keyWordThumbs.appendChild(this.thumbElement);
        this.thumbElement.querySelector('.close').addEventListener('click', ()=>{
            
            this.thumbElement.parentElement.removeChild(this.thumbElement);

            searchParams.searchKeywords = searchParams.searchKeywords.filter(el => el.keyWord != this.keyWord);

            process();

        });
    }
    }

}

/**
 * 
 * @param {String} item 
 * @param {Array} array
 * @returns {void}
 * check if String (keyword) already exists in Array (keywords array)
 * if not add, keyword to keywords array
 *  
 */
function checkIfExist(item, array){
    if(array.length === 0){
        array.push(item);
    }else{
        let exists = false;

        array.forEach(el =>{
            if(el.keyWord === item.keyWord){
                exists = true;
            }
        })

        if(!exists){
            array.push(item);
        }

        /*for (let i = 0; i < array.length; i++){
            if(array[i].keyWord===item.keyWord){
                exists = true;
            }
        }
        if(!exists){
            array.push(item);
        }*/
    }   
}

/**
 * 
 * @param {Array} data
 * @returns {void}
 * find all unique keywords existing 
 */
function getKeyWords(data){
    _appareils = [];
    _ingredients = [];
    _ustensils = [];

    data.forEach(el=>{
        el.ingredients.forEach(item=>{
            checkIfExist(new Ingredient(item.ingredient), _ingredients);
        })

        checkIfExist(new Appliance(el.appliance), _appareils);

        el.ustensils.forEach(item=>{
            checkIfExist(new Ustensil(item), _ustensils);
        })

    });

    /*for (let i = 0; i < data.length; i++){
        

        for(let j = 0; j < data[i].ingredients.length; j++){
            let tested = new Ingredient(data[i].ingredients[j].ingredient);
            checkIfExist(tested, _ingredients);
        }

        checkIfExist(new Appliance(data[i].appliance), _appareils);
        
        for(let k = 0; k < data[i].ustensils.length; k++){
            let tested = new Ustensil(data[i].ustensils[k]);
            checkIfExist(tested, _ustensils);
        }

    }*/

    allKeyWords = _ingredients.concat(_appareils, _ustensils);

}

function displayAvailableKeywords(keywords){

    ingredientKeywords.innerHTML = "";
    applianceKeyWords.innerHTML = "";
    ustensilsKeyWords.innerHTML = "";

    keywords.forEach(kw=>{
        if(kw instanceof Ingredient){
            ingredientKeywords.appendChild(kw.listElement);
            kw.listElement.addEventListener("click", ()=>{
                searchParams.searchKeywords.push(kw);
                kw.displayThumbElement();
                process();
                searchIngredients.value = "";
            })
        }else if(kw instanceof Appliance){
            applianceKeyWords.appendChild(kw.listElement);
            kw.listElement.addEventListener("click", ()=>{
                searchParams.searchKeywords.push(kw);
                kw.displayThumbElement();
                process();
                searchAppliance.value = "";
            })
        }else if(kw instanceof Ustensil){
            ustensilsKeyWords.appendChild(kw.listElement);
            kw.listElement.addEventListener("click", ()=>{
                searchParams.searchKeywords.push(kw);
                kw.displayThumbElement();
                process();
                searchUstensils.value = "";
            });
        }else{
            console.log("unknown type");
        }
    })

    /*for (let i = 0; i < keywords.length; i++) {
        if(keywords[i] instanceof Ingredient){
            ingredientKeywords.appendChild(keywords[i].listElement);
            keywords[i].listElement.addEventListener("click", ()=>{
                searchParams.searchKeywords.push(keywords[i]);
                keywords[i].displayThumbElement();
                process();
                searchIngredients.value = "";
            })
        }else if(keywords[i] instanceof Appliance){
            applianceKeyWords.appendChild(keywords[i].listElement);
            keywords[i].listElement.addEventListener("click", ()=>{
                searchParams.searchKeywords.push(keywords[i]);
                keywords[i].displayThumbElement();
                process();
                searchAppliance.value = "";
            })
        }else if(keywords[i] instanceof Ustensil){
            ustensilsKeyWords.appendChild(keywords[i].listElement);
            keywords[i].listElement.addEventListener("click", ()=>{
                searchParams.searchKeywords.push(keywords[i]);
                keywords[i].displayThumbElement();
                process();
                searchUstensils.value = "";
            });
        }else{
            console.log("unknown type");
        }

    }*/
}

searchBar.addEventListener('input', function(){
    searchParams.mainInput = this.value;

    process();
});
searchBar.addEventListener("focusin", function(){

    searchIngredients.value = "";
    searchAppliance.value = "";
    searchUstensils.value = "";
    if(!ingredientKeywords.hasChildNodes()){
        ingredientKeywords.innerHTML = "";
    }
    if(!applianceKeyWords.hasChildNodes()){
        applianceKeyWords.innerHTML = "";
    }
    if(!ustensilsKeyWords.hasChildNodes()){
        ustensilsKeyWords.innerHTML = "";
    }
    

})
function process(){
    filteredRecipes = [...recipes];

    if(!searchParams.mainInput){
        if(searchParams.searchKeywords.length > 0){
            searchParams.searchKeywords.forEach(item=>{
                filteredRecipes = filterRecipesByKeyword(item, filteredRecipes);
            })
            /*for(let i = 0; i < searchParams.searchKeywords.length; i++){
                filteredRecipes = filterRecipesByKeyword(searchParams.searchKeywords[i], filteredRecipes);
            }*/
            displayRecipes(filteredRecipes);
            getKeyWords(filteredRecipes);
            displayAvailableKeywords(allKeyWords);
        }else{
            displayRecipes(filteredRecipes);
            clearKeywordsList();
        }

    }else if(searchParams.mainInput.length < 3){
        if(searchParams.searchKeywords.length > 0){
            searchParams.searchKeywords.forEach(item=>{
                filteredRecipes = filterRecipesByKeyword(item, filteredRecipes);
            })
            /*for(let i = 0; i < searchParams.searchKeywords.length; i++){
                filteredRecipes = filterRecipesByKeyword(searchParams.searchKeywords[i], filteredRecipes);
            }*/
            displayRecipes(filteredRecipes);
            getKeyWords(filteredRecipes);
            displayAvailableKeywords(allKeyWords);
    
        }else{
            displayRecipes(filteredRecipes);
            clearKeywordsList();

        }

    }else{
        filteredRecipes = filterRecipesByMainInput(searchParams.mainInput, filteredRecipes);
        //filteredRecipes = filter.filterByInput(searchParams.mainInput);

        if(searchParams.searchKeywords.length > 0){
            searchParams.searchKeywords.forEach(item=>{
                filteredRecipes = filterRecipesByKeyword(item, filteredRecipes);
            })
        }
        displayRecipes(filteredRecipes);
        getKeyWords(filteredRecipes);
        displayAvailableKeywords(allKeyWords);

    }

}

/**
 * 
 * @param {String} input 
 * @param {Array} data
 * @returns {Array} filtred data
 * returns all recipes matching String input
 *  
 */
function filterRecipesByMainInput(input, data){
    let start = performance.now();
    const result = [];
    data.forEach(item=>{
        if(item.name.toLowerCase().includes(input)){
            result.push(item);
        }else if(item.description.toLowerCase().includes(input)){
            result.push(item);
        }else{
            item.ingredients.forEach(el=>{
                if(el.ingredient.includes(input)){
                    result.push(item);
                }
            });
        }
        
    })
    console.log(`temps de recherche principale: ${performance.now()-start}`);
    return result;
    /*for(let i = 0; i < data.length; i++){
        if(data[i].name.toLocaleLowerCase().includes(input)){
            result.push(data[i]);
        }else if(data[i].description.toLocaleLowerCase().includes(input)){
            result.push(data[i]);
        }else{
            for (let j = 0; j < data[i].ingredients.length; j++){
                if(data[i].ingredients[j].ingredient.toLocaleLowerCase().includes(input)){
                    result.push(data[i]);
                }
            }
        }
    }
    return result;*/

}

function filterRecipesByKeyword(obj, data){
    let start = performance.now();
    const result = [];

    data.forEach(item=>{

        if(obj instanceof Ingredient){
            item.ingredients.forEach(el=>{
                if(el.ingredient.toLowerCase().includes(obj.keyWord)){
                    result.push(item);
                }
            });
        }else if(obj instanceof Appliance){
            if(item.appliance.toLowerCase().includes(obj.keyWord)){
                result.push(item);
            }
        }else if(obj instanceof Ustensil){
            item.ustensils.forEach(el=>{
                if(el.toLowerCase().includes(obj.keyWord)){
                    result.push(item);
                }
            });
        }else{
            throw "unknown input type"
        }

    });
    return result;

    /*for(let i = 0; i < data.length; i++){
        if(obj instanceof Ingredient){
            for (let j = 0; j < data[i].ingredients.length; j++) {
                if(data[i].ingredients[j].ingredient.toLowerCase().includes(obj.keyWord)){
                    result.push(data[i]);
                } 
            }
        }else if(obj instanceof Appliance){
            if(data[i].appliance.toLowerCase().includes(obj.keyWord)){
                result.push(data[i]);
            }
        }else if(obj instanceof Ustensil){
            for (let j = 0; j < data[i].ustensils.length; j++) {
                if(data[i].ustensils[j].toLowerCase().includes(obj.keyWord)){
                    result.push(data[i]);
                }
            }
        }else{
            throw "Unknown input type"
        }
    }
    return result;*/

}

function clearKeywordsList(){
    let keywordsList = document.querySelectorAll('.keywords');

    if(keywordsList.length > 0){
        keywordsList.forEach(kw => kw.parentNode.removeChild(kw));
        return;
    }else{
        return;
    }
}

function searchKeywordsByType(input, type){

    switch (type) {
        case "Ingredient":
            if(ingredientKeywords.hasChildNodes()){
                let children = ingredientKeywords.childNodes;
                children.forEach(child=>{
                    if(!child.textContent.includes(input)){
                        child.classList.add("hide");
                    }
                });
            }else{
                getKeyWords(filteredRecipes);
                displayAvailableKeywords(_ingredients);
                let children = ingredientKeywords.childNodes;
                children.forEach(child=>{
                    if(!child.textContent.includes(input)){
                        child.classList.add("hide");
                    }else{
                        secondaryIngredients.push(child.textContent)
                    }
                });
            }
            break;
        case "Appliance":
            if(applianceKeyWords.hasChildNodes()){
                let children = applianceKeyWords.childNodes;
                children.forEach(child=>{
                    if(!child.textContent.includes(input)){
                        child.classList.add("hide");
                    }
                });
            }else{
                getKeyWords(filteredRecipes);
                displayAvailableKeywords(_appareils);
                let children = applianceKeyWords.childNodes;
                children.forEach(child=>{
                    if(!child.textContent.includes(input)){
                        child.classList.add("hide");
                    }else{
                        secondaryAppareils.push(child.textContent)
                    }
                });
            }
            break;
        case "Ustensil":
            if(ustensilsKeyWords.hasChildNodes()){
                let children = ustensilsKeyWords.childNodes;
                children.forEach(child=>{
                    if(!child.textContent.includes(input)){
                        child.classList.add("hide");
                    }
                });
            }else{
                getKeyWords(filteredRecipes);
                displayAvailableKeywords(_ustensils);
                let children = ustensilsKeyWords.childNodes;
                children.forEach(child=>{
                    if(!child.textContent.includes(input)){
                        child.classList.add("hide");
                    }else{
                        secondaryUstensils.push(child.textContent)
                    }
                });
            }
            break;
        default:
            break;
    }

}

searchIngredients.addEventListener("input", function(){
    secondaryIngredients = [];

    if(this.value.length >=3){
        searchKeywordsByType(this.value, "Ingredient");
    }else{
        process();
    }
});

searchAppliance.addEventListener("input", function(){
    secondaryAppareils = [];
    if(this.value.length >=3){
        searchKeywordsByType(this.value, "Appliance");
    }else{
        process();
    }
});

searchUstensils.addEventListener("input", function(){
    secondaryUstensils = [];
    if(this.value.length >=3){
        searchKeywordsByType(this.value, "Ustensil");
    }else{
        process();
    }
});

