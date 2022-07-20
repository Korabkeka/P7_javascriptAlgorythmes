// algorythme using for, while, do while...

// =========================================================================== //

const main = document.getElementById("recipes");
let filteredRecipes = [...recipes];


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

        keyWordThumbs.appendChild(this.thumbElement);
        this.thumbElement.querySelector('.close').addEventListener('click', ()=>{
            console.log(searchParams.searchKeywords, this.keyWord);
            this.thumbElement.parentElement.removeChild(this.thumbElement);
            for (let i = 0; i < searchParams.searchKeywords.length; i++) {
                const element = searchParams.searchKeywords[i].keyWord;
                if(this.keyWord === element){
                    searchParams.searchKeywords.splice(i,1);
                }
            }
            process();
        });

    }

}

class Appliance extends KeyWord{
    constructor(keyWord){
        super(keyWord)
        this.listElement = document.createElement('li');
        this.listElement.textContent = this.keyWord;
        this.listElement.classList.add("keywords");
        this.thumbElement = document.createElement('div');
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

        keyWordThumbs.appendChild(this.thumbElement);
        this.thumbElement.querySelector('.close').addEventListener('click', ()=>{
            console.log(searchParams.searchKeywords, this.keyWord);
            this.thumbElement.parentElement.removeChild(this.thumbElement);
            for (let i = 0; i < searchParams.searchKeywords.length; i++) {
                const element = searchParams.searchKeywords[i].keyWord;
                if(this.keyWord === element){
                    searchParams.searchKeywords.splice(i,1);
                }
            }
            process();
        });

    }

}

class Ustensil extends KeyWord{
    constructor(keyWord){
        super(keyWord)
        this.listElement = document.createElement('li');
        this.listElement.textContent = this.keyWord;
        this.listElement.classList.add("keywords");
        this.thumbElement = document.createElement('div');
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

        keyWordThumbs.appendChild(this.thumbElement);
        this.thumbElement.querySelector('.close').addEventListener('click', ()=>{
            console.log(searchParams.searchKeywords, this.keyWord);
            this.thumbElement.parentElement.removeChild(this.thumbElement);
            for (let i = 0; i < searchParams.searchKeywords.length; i++) {
                const element = searchParams.searchKeywords[i].keyWord;
                if(this.keyWord === element){
                    searchParams.searchKeywords.splice(i,1);
                }
            }
            process();
        });

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
        for (let i = 0; i < array.length; i++){
            if(array[i].keyWord===item.keyWord){
                exists = true;
            }
        }
        if(!exists){
            array.push(item);
        }
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

    for (let i = 0; i < data.length; i++){

        for(let j = 0; j < data[i].ingredients.length; j++){
            let tested = new Ingredient(data[i].ingredients[j].ingredient);
            checkIfExist(tested, _ingredients);
        }

        checkIfExist(new Appliance(data[i].appliance), _appareils);
        
        for(let k = 0; k < data[i].ustensils.length; k++){
            let tested = new Ustensil(data[i].ustensils[k]);
            checkIfExist(tested, _ustensils);
        }

    }

    allKeyWords = _ingredients.concat(_appareils, _ustensils);

}

function displayAvailableKeywords(keywords){

    ingredientKeywords.innerHTML = "";
    applianceKeyWords.innerHTML = "";
    ustensilsKeyWords.innerHTML = "";

    let ingredients = [];
    let appliances = [];
    let ustensils = [];

    keywords.forEach(kw=>{
        if(kw instanceof Ingredient){
            ingredients.push(kw.listElement);
            kw.listElement.addEventListener("click", ()=>{
                searchParams.searchKeywords.push(kw);
                kw.displayThumbElement();
                process();
                searchIngredients.value = "";
            });
        }else if(kw instanceof Appliance){
            appliances.push(kw.listElement);
            kw.listElement.addEventListener("click", ()=>{
                searchParams.searchKeywords.push(kw);
                kw.displayThumbElement();
                process();
                searchAppliance.value = "";
            })
        }else if(kw instanceof Ustensil){
            ustensils.push(kw.listElement);
            kw.listElement.addEventListener("click", ()=>{
                searchParams.searchKeywords.push(kw);
                kw.displayThumbElement();
                process();
                searchUstensils.value = "";
            });
        }else{
            console.log("unknown type");
        }
    });

    let $wrapper1 = document.createElement('div');
    let $wrapper2 = document.createElement('div');
    let $wrapper3 = document.createElement('div');

    if(ingredients.length <= 10){
        ingredients.forEach(element=>{
            $wrapper1.appendChild(element);
        });
        ingredientKeywords.appendChild($wrapper1);
    }else if(ingredients.length > 10 && ingredients.length <=20){
        ingredients.forEach((element, index)=>{
            if(index <=9){
                $wrapper1.appendChild(element);
            }else{
                $wrapper2.appendChild(element);
            }
        });
        ingredientKeywords.appendChild($wrapper1);
        ingredientKeywords.appendChild($wrapper2);
    }else{
        ingredients.forEach((element, index)=>{
            if(index <=9){
                $wrapper1.appendChild(element);
            }else if(index > 9 && index <=19){
                $wrapper2.appendChild(element);
            }else{
                $wrapper3.appendChild(element);
            }
        });
        ingredientKeywords.appendChild($wrapper1);
        ingredientKeywords.appendChild($wrapper2);
        ingredientKeywords.appendChild($wrapper3);
    }

    let $applianceWrapper = document.createElement('div');
    appliances.forEach(element=>{
        $applianceWrapper.appendChild(element);
    });
    applianceKeyWords.appendChild($applianceWrapper);

    let $ustensilWrapper = document.createElement('div');
    ustensils.forEach(element=>{
        $ustensilWrapper.appendChild(element);
    });
    ustensilsKeyWords.appendChild($ustensilWrapper);
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
            for(let i = 0; i < searchParams.searchKeywords.length; i++){
                filteredRecipes = filterRecipesByKeyword(searchParams.searchKeywords[i], filteredRecipes);
            }
            displayRecipes(filteredRecipes);
            getKeyWords(filteredRecipes);
            displayAvailableKeywords(allKeyWords);
        }else{
            displayRecipes(filteredRecipes);
            clearKeywordsList();
        }

    }else if(searchParams.mainInput.length < 3){
        if(searchParams.searchKeywords.length > 0){
            for(let i = 0; i < searchParams.searchKeywords.length; i++){
                filteredRecipes = filterRecipesByKeyword(searchParams.searchKeywords[i], filteredRecipes);
            }

            displayRecipes(filteredRecipes);
            getKeyWords(filteredRecipes);
            displayAvailableKeywords(allKeyWords);
    
        }else{
            displayRecipes(filteredRecipes);
            clearKeywordsList();

        }

    }else{
        filteredRecipes = filterRecipesByMainInput(searchParams.mainInput, filteredRecipes);

        if(searchParams.searchKeywords.length > 0){
            for(let i = 0; i < searchParams.searchKeywords.length; i++){
                filteredRecipes = filterRecipesByKeyword(searchParams.searchKeywords[i], filteredRecipes);
            }
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
    const result = [];

    for(let i = 0; i < data.length; i++){
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
    return result;

}

function filterRecipesByKeyword(obj, data){
    const result = [];

    for(let i = 0; i < data.length; i++){
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
    return result;

}

function clearKeywordsList(){
    let keywordsList = document.querySelectorAll('.keywords');

    if(keywordsList.length > 0){
        for (let i = 0; i < keywordsList.length; i++){
            keywordsList[i].parentNode.removeChild(keywordsList[i]);
        }
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
                for (let i = 0; i < children.length; i++) {
                    if(!children[i].textContent.includes(input)){
                        children[i].classList.add("hide");
                    }
                }
            }else{
                getKeyWords(filteredRecipes);
                displayAvailableKeywords(_ingredients);
                let children = ingredientKeywords.childNodes;
                for (let i = 0; i < children.length; i++) {
                    if(!children[i].textContent.includes(input)){
                        children[i].classList.add("hide");
                    }else{
                        secondaryIngredients.push(children[i].textContent)
                    }
                }
            }
            break;
        case "Appliance":
            if(applianceKeyWords.hasChildNodes()){
                let children = applianceKeyWords.childNodes;
                for (let i = 0; i < children.length; i++) {
                    if(!children[i].textContent.includes(input)){
                        children[i].classList.add("hide");
                    }
                }
            }else{
                getKeyWords(filteredRecipes);
                displayAvailableKeywords(_appareils);
                let children = applianceKeyWords.childNodes;
                for (let i = 0; i < children.length; i++) {
                    if(!children[i].textContent.includes(input)){
                        children[i].classList.add("hide");
                    }else{
                        secondaryAppareils.push(children[i].textContent)
                    }
                }
            }
            break;
        case "Ustensil":
            if(ustensilsKeyWords.hasChildNodes()){
                let children = ustensilsKeyWords.childNodes;
                for (let i = 0; i < children.length; i++) {
                    if(!children[i].textContent.includes(input)){
                        children[i].classList.add("hide");
                    }
                }
            }else{
                getKeyWords(filteredRecipes);
                displayAvailableKeywords(_ustensils);
                let children = ustensilsKeyWords.childNodes;
                for (let i = 0; i < children.length; i++) {
                    if(!children[i].textContent.includes(input)){
                        children[i].classList.add("hide");
                    }else{
                        secondaryUstensils.push(children[i].textContent)
                    }
                }
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

function show(element){
    let name = element.id.split('-')[1];
    document.getElementById(`after-${name}`).style.display = "flex";
    document.getElementById(`before-${name}`).style.display = "none";
}
function hide(element){
    let name = element.parentNode.parentNode.id.split('-')[1];
    document.getElementById(`after-${name}`).style.display = "none";
    document.getElementById(`before-${name}`).style.display = "flex";
}