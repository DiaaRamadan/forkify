export default class Likes{
    constructor(){
        this.likes = [];
    }

    addItem(id, title, author, img){
        const likedItem = {id, title, author, img};
        this.likes.push(likedItem);
        return likedItem;
    }

    deleteItem(id){
        const pos = this.likes.findIndex(el => el.id === id);
        this.likes.splice(pos,1);
    }

    idLike(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    likesCount(){
        return this.likes.length;
    }
}