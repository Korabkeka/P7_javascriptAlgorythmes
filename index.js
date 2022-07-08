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
        this.listElement = document.createElement('p');
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
        this.listElement = document.createElement('p');
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
        this.listElement = document.createElement('p');
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
    const result = data.filter(item=>{
        if(item.name.toLowerCase().includes(input)){
            return true;
        }else if(item.description.toLowerCase().includes(input)){
            return true;
        }else{
            item.ingredients.forEach(el=>{
                if(el.ingredient.includes(input)){
                    return true;
                }
            });
        }
        
    })
    return result;

}

function filterRecipesByKeyword(obj, data){
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
            console.log(ingredientKeywords.textContent)
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
                        secondaryIngredients.push(child.textContent);
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
    console.log(ingredientKeywords, filteredRecipes);
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