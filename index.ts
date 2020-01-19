class TScript {
    private body: HTMLBodyElement | null;
    constructor() {
        this.body = document.querySelector('body');
        console.log(this.body)
    }
    tostring(num: number): string {
        return num.toString()
    }
}
const TS = new TScript
console.log(TS.tostring(12345))