
function ccc() {
    console.log('ccc', this)
}
function ddd() {
    console.log('ddd', this)
}

export {
    ccc,
    ddd
}