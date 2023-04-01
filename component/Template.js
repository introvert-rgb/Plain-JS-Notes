export default {


    render(){
        return `${this.css()}${this.html()}`;
    },

    html(){
        return `
        <input class="mainInput" placeholder="create a new todo" type="text">
        `;
    }
}