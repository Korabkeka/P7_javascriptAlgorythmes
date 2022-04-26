// algorythme using for, while, do while...

const searchBar = document.getElementById('search-bar__input');

const _ingredients = [];
const _appareils = [];
const _ustensils = [];

function checkIfExist(item, array){
    if(array.length === 0){
        array.push(item);
    }else{
        for (let i = 0; i < array.length; i++){
            if(array[i]===item){
                console.log(`${item} is already in array`)
                break;
            }else{
                if(i === array.length - 1 && array[i] !== item){
                    array.push(item);
                }
            } 
        }
    }

    
}

for (let i = 0; i < recipes.length; i++){

    for(let j = 0; j < recipes[i].ingredients.length; j++){
        let tested = recipes[i].ingredients[j].ingredient;
        checkIfExist(tested, _ingredients);
    }
    if(_appareils.indexOf(recipes[i].appliance) === -1){
        _appareils.push(recipes[i].appliance);
    }
    for(let k = 0; k < recipes[i].ustensils.length; k++){
        let tested = recipes[i].ustensils[k];
        if(_ustensils.indexOf(tested)===-1){
            _ustensils.push(tested);
        }
    }
}

console.log(_ingredients);