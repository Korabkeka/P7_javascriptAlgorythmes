class RecipeTemplate{
    constructor(recipe){
        this.recipe = recipe;
        this.element = document.createElement('article');
        this.element.innerHTML = this.getTemplate();
    }

    getTemplate(){
        let template = `
            <div class="recipe__image"></div>
            <div class="recipe__info">
                <div class="recipe__info__left">
                    <h2 class="recipe__info__left--title">${this.recipe.name}</h2>
                    ${this.getListTemplate()}
                </div>
            </div>
            <div class="recipe__info__right">
                <div class="recipe__info__right--time">${this.recipe.time}</div>
                <p class="recipe__info__right--description">${this.recipe.description}</p>
            </div>
        `
        return template;
    }

    getListTemplate(){
        const $wrapper = document.createElement('ul');

        this.recipe.ingredients.forEach(element => {
            
            let $ingrendient = document.createElement('li');

            if(element.quantity){

                if(element.unit){
                    $ingrendient.innerHTML = `<strong>${element.ingredient}</strong>: ${element.quantity}${element.unit}`;
                }else{
                    $ingrendient.innerHTML = `<strong>${element.ingredient}</strong>: ${element.quantity}`;
                }

            }else{
                $ingrendient.innerHTML = `<strong>${element.ingredient}</strong>`;
            }

            $wrapper.appendChild($ingrendient);

        });

        return $wrapper.innerHTML;

    }
}