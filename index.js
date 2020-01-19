class TScript {
    constructor() {
        this.body = document.querySelector('body');
        console.log(this.body);
    }
    tostring(num) {
        return num.toString();
    }
}
const TS = new TScript;
console.log(TS.tostring(12345));
