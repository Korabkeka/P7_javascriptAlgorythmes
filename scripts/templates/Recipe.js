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
                <div class="recipe__info__top">
                    <h2 class="recipe__info__top--title">${this.recipe.name}</h2>
                    <div class="recipe__info__top--time"><img src="/assets/clock.svg" alt="clock"/> ${this.recipe.time} min</div>
                    
                </div>
                <div class="recipe__info__bottom">
                    ${this.getListTemplate()}
                    <p class="recipe__info__bottom--description">${this.recipe.description}</p>
                </div>
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