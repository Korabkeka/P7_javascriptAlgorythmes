// algorythme using for, while, do while...

// =========================================================================== //

const searchBar = document.getElementById('search-bar__input');

const _ingredients = [];
const _appareils = [];
const _ustensils = [];

class KeyWord{
    constructor(keyWord){
        this.keyWord = keyWord.toLowerCase();
    }
}

class Ingredient extends KeyWord{
    constructor(keyWord){
        super(keyWord)
    }
}

class Appliance extends KeyWord{
    constructor(keyWord){
        super(keyWord)
    }
}

class Ustensil extends KeyWord{
    constructor(keyWord){
        super(keyWord)
    }
}


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

for (let i = 0; i < recipes.length; i++){

    for(let j = 0; j < recipes[i].ingredients.length; j++){
        let tested = new Ingredient(recipes[i].ingredients[j].ingredient);
        checkIfExist(tested, _ingredients);
    }
    checkIfExist(new Appliance(recipes[i].appliance), _appareils);
    
    for(let k = 0; k < recipes[i].ustensils.length; k++){
        let tested = new Ustensil(recipes[i].ustensils[k]);
        checkIfExist(tested, _ustensils);
    }
}

const allKeyWords = _ingredients.concat(_appareils, _ustensils);

console.log(allKeyWords);

searchBar.addEventListener('input', function(){

    if(this.value.length > 2){

        let a = filterRecipes(this.value);
        console.log(a);

    }

});

function filterRecipes(input){
    const result = [];

    for(let i = 0; i < recipes.length; i++){
        if(recipes[i].name.toLocaleLowerCase().includes(input)){
            result.push(recipes[i]);
        }else if(recipes[i].description.toLocaleLowerCase().includes(input)){
            result.push(recipes[i]);
        }else{
            for (let j = 0; j < recipes[i].ingredients.length; j++){
                if(recipes[i].ingredients[j].ingredient.toLocaleLowerCase().includes(input)){
                    result.push(recipes[i]);
                }
            }
        }
    }

    return result;

}