class Option{
    constructor(option){
        this.option = option;
        this.element = document.createElement('option');
        this.element.value = this.option;
    }
}