import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ing){
        const item = {
            id: uniqid(),
            count,
            unit,
            ing,
        };

        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el === el.id);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount){
        this.items.find(el => id === el.id).count = newCount;
    }
}