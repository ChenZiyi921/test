import { ccc, ddd } from './test2.mjs'
class test1 {
    constructor() {
        this.aaa()
        this.bbb()
        this.ccc()
        this.ddd()
    }
    aaa() {
        console.log('aaa')
    }
    bbb() {
        console.log('bbb')
    }
    ccc() {
        ccc.call(this)
    } 
    ddd() {
        ddd.call(this)
    } 
}
export {
    test1
}