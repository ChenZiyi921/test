
function test(data) {
    return createElement({
        elementName: "div",
        attributes: {
            className: "items",
            style: "display: none;"
        },
        children: [createElement({
            elementName: "ul",
            attributes: {
                className: "ul"
            },
            children: [data.map(item => createElement({
                elementName: "li",
                attributes: {},
                children: [item.name]
            }))]
        })]
    });
}
export { test };
