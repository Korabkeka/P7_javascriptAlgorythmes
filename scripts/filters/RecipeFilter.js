class RecipeFilter{

    constructor(recipes){

        this.recipes = recipes;

    }

    filterByInput(input){
        let start = performance.now();
        let result = this.recipes.filter(item =>{
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
        });
        console.log(`temps de recherche principale: ${performance.now()-start}`);
        return result;
    }

}